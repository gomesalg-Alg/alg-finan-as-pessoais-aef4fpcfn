import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import { User } from '@/types/user'
import { Profile } from '@/types/profile'
import { Empresa } from '@/types/empresa'
import { Filial } from '@/types/filial'
import { Notification } from '@/types/notification'
import { S_CLOG } from '@/types/log'
import { PeriodoFechamento } from '@/types/periodo'
import { FieldConfig } from '@/types/fieldConfig'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { mapRecordToEmpresa } from '@/services/empresas'
import { mapRecordToFilial } from '@/services/filiais'
import { mapRecordToUser } from '@/services/users'

interface ERPContextData {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  profiles: Profile[]
  setProfiles: React.Dispatch<React.SetStateAction<Profile[]>>
  empresas: Empresa[]
  setEmpresas: React.Dispatch<React.SetStateAction<Empresa[]>>
  filiais: Filial[]
  setFiliais: React.Dispatch<React.SetStateAction<Filial[]>>
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  logs: S_CLOG[]
  addLog: (action: S_CLOG['action'], details: string, recordId?: string) => void
  archiveLogs: (beforeDate: string) => number
  restoreLogs: (batchId: string) => number
  periodos: PeriodoFechamento[]
  setPeriodos: React.Dispatch<React.SetStateAction<PeriodoFechamento[]>>
  isDateInClosedPeriod: (dateStr: string) => boolean
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  isTiModeEnabled: boolean
  hasPermission: (perm: string) => boolean
  fieldConfigs: FieldConfig[]
  setFieldConfigs: React.Dispatch<React.SetStateAction<FieldConfig[]>>
  updateFieldConfig: (config: FieldConfig) => void
}

const ERPContext = createContext<ERPContextData | undefined>(undefined)

const initialProfiles: Profile[] = [
  {
    id: 'ADMIN',
    C_PERF_NOME: 'Administrador',
    C_PERF_DESC: 'Acesso total ao sistema',
    C_PERF_PERM: [
      'dashboard',
      'usuarios',
      'clientes',
      'fornecedores',
      'classificacao-financeira',
      'perfis',
      'empresas',
      'filiais',
      'admin-periodos',
      'admin-logs',
      'admin-auditoria',
      'admin-config',
      'relatorios',
    ],
  },
  {
    id: 'OPER',
    C_PERF_NOME: 'Operador',
    C_PERF_DESC: 'Acesso limitado às rotinas de operação',
    C_PERF_PERM: ['dashboard', 'clientes', 'fornecedores'],
  },
  {
    id: 'TI',
    C_PERF_NOME: 'Tecnologia da Informação',
    C_PERF_DESC: 'Acesso técnico e mapeamento de banco de dados',
    C_PERF_PERM: [
      'dashboard',
      'usuarios',
      'clientes',
      'fornecedores',
      'classificacao-financeira',
      'perfis',
      'empresas',
      'filiais',
      'admin-periodos',
      'admin-logs',
      'admin-auditoria',
      'admin-config',
      'relatorios',
    ],
  },
]

const initialEmpresas: Empresa[] = []

const initialFiliais: Filial[] = [
  {
    id: '1',
    empresaId: '1',
    nome: 'Sede São Paulo',
    cnpj: '12345678000199',
    C_FILI_CODI: 'FIL01',
    C_FILI_NOME: 'Sede São Paulo',
    C_FILI_EMPR: '1',
    C_FILI_CNPJ: '12345678000199',
  },
]

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Administrador Chefe',
    email: 'admin@alg.com.br',
    role: 'admin',
    status: 'active',
    C_USER_CODI: 'ADM01',
    C_USER_NOME: 'Administrador Chefe',
    C_USER_FANT: 'Admin',
    C_USER_NCPF: '11122233344',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'admin@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua A',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
    C_USER_PERF: 'ADMIN',
    C_USER_EMPR: '1',
    C_USER_FILI: '1',
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@alg.com.br',
    role: 'user',
    status: 'active',
    C_USER_CODI: 'OPR01',
    C_USER_NOME: 'João Silva',
    C_USER_FANT: 'João',
    C_USER_NCPF: '99988877766',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'joao@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua B',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
    C_USER_PERF: 'OPER',
    C_USER_EMPR: '1',
    C_USER_FILI: '1',
  },
  {
    id: '3',
    name: 'Analista de TI',
    email: 'ti@alg.com.br',
    role: 'ti',
    status: 'active',
    C_USER_CODI: 'TI01',
    C_USER_NOME: 'Analista de TI',
    C_USER_FANT: 'TI',
    C_USER_NCPF: '55544433322',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'ti@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua C',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
    C_USER_PERF: 'TI',
    C_USER_EMPR: '1',
    C_USER_FILI: '1',
  },
]

const initialNotifications: Notification[] = []

const initialLogs: S_CLOG[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `log-${i}`,
  action: i % 3 === 0 ? 'LOGIN' : i % 2 === 0 ? 'UPDATE' : 'CREATE',
  timestamp: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  userId: i % 2 === 0 ? '1' : '2',
  details: `Ação gerada automaticamente para histórico #${i}`,
  archived: false,
}))

const initialPeriodos: PeriodoFechamento[] = [
  {
    id: 'p1',
    ano: new Date().getFullYear(),
    mes: new Date().getMonth(),
    status: 'Fechado',
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedBy: 'ADM01',
  },
  {
    id: 'p2',
    ano: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    status: 'Aberto',
    updatedAt: new Date().toISOString(),
    updatedBy: 'ADM01',
  },
]

const initialFieldConfigs: FieldConfig[] = []

export const ERPProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [empresas, setEmpresas] = useState<Empresa[]>(initialEmpresas)
  const [filiais, setFiliais] = useState<Filial[]>(initialFiliais)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [logs, setLogs] = useState<S_CLOG[]>(initialLogs)
  const [periodos, setPeriodos] = useState<PeriodoFechamento[]>(initialPeriodos)
  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>(initialFieldConfigs)

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('erp_current_user')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error(e)
    }
    return initialUsers[0]
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('erp_current_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('erp_current_user')
    }
  }, [currentUser])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresasRecords, filiaisRecords, usersRecords] = await Promise.all([
          pb.collection('empresas').getFullList({ sort: '-created' }),
          pb.collection('filiais').getFullList({ sort: '-created' }),
          pb.collection('users').getFullList({ sort: '-created' }),
        ])
        if (empresasRecords.length) setEmpresas(empresasRecords.map(mapRecordToEmpresa))
        if (filiaisRecords.length) setFiliais(filiaisRecords.map(mapRecordToFilial))
        if (usersRecords.length) setUsers(usersRecords.map(mapRecordToUser))
      } catch (err) {
        console.error('Failed to fetch data:', err)
      }
    }
    fetchData()
  }, [])

  useRealtime('empresas', (e) => {
    if (e.action === 'create') {
      setEmpresas((prev) => {
        if (prev.find((m) => m.id === e.record.id)) return prev
        return [mapRecordToEmpresa(e.record), ...prev]
      })
    } else if (e.action === 'update') {
      setEmpresas((prev) =>
        prev.map((m) => (m.id === e.record.id ? mapRecordToEmpresa(e.record) : m)),
      )
    } else if (e.action === 'delete') {
      setEmpresas((prev) => prev.filter((m) => m.id !== e.record.id))
    }
  })

  useRealtime('filiais', (e) => {
    if (e.action === 'create') {
      setFiliais((prev) => {
        if (prev.find((m) => m.id === e.record.id)) return prev
        return [mapRecordToFilial(e.record), ...prev]
      })
    } else if (e.action === 'update') {
      setFiliais((prev) =>
        prev.map((m) => (m.id === e.record.id ? mapRecordToFilial(e.record) : m)),
      )
    } else if (e.action === 'delete') {
      setFiliais((prev) => prev.filter((m) => m.id !== e.record.id))
    }
  })

  useRealtime('users', (e) => {
    if (e.action === 'create') {
      setUsers((prev) => {
        if (prev.find((m) => m.id === e.record.id)) return prev
        return [mapRecordToUser(e.record), ...prev]
      })
    } else if (e.action === 'update') {
      setUsers((prev) => prev.map((m) => (m.id === e.record.id ? mapRecordToUser(e.record) : m)))
    } else if (e.action === 'delete') {
      setUsers((prev) => prev.filter((m) => m.id !== e.record.id))
    }
  })

  const isTiModeEnabled = useMemo(() => {
    return currentUser?.role === 'ti' || currentUser?.C_USER_PERF === 'TI'
  }, [currentUser])

  const hasPermission = useCallback(
    (perm: string) => {
      if (!currentUser || !currentUser.C_USER_PERF) return false
      const profile = profiles.find((p) => p.id === currentUser.C_USER_PERF)
      return profile?.C_PERF_PERM.includes(perm) ?? false
    },
    [currentUser, profiles],
  )

  const addLog = useCallback(
    (action: S_CLOG['action'], details: string, recordId?: string) => {
      const newLog: S_CLOG = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        action,
        timestamp: new Date().toISOString(),
        userId: currentUser?.id || 'system',
        details,
        recordId,
        archived: false,
      }
      setLogs((prev) => [newLog, ...prev])
    },
    [currentUser],
  )

  const archiveLogs = useCallback(
    (beforeDate: string) => {
      let count = 0
      const batchId = `BATCH-${Date.now()}`
      const archiveDate = new Date().toISOString()

      setLogs((prev) =>
        prev.map((log) => {
          if (!log.archived && new Date(log.timestamp) < new Date(beforeDate)) {
            count++
            return { ...log, archived: true, archiveBatchId: batchId, archiveDate }
          }
          return log
        }),
      )

      if (count > 0) {
        addLog('ARCHIVE', `Arquivado lote ${batchId} com ${count} registros.`)
      }
      return count
    },
    [addLog],
  )

  const restoreLogs = useCallback(
    (batchId: string) => {
      let count = 0
      setLogs((prev) =>
        prev.map((log) => {
          if (log.archived && log.archiveBatchId === batchId) {
            count++
            return { ...log, archived: false, archiveBatchId: undefined, archiveDate: undefined }
          }
          return log
        }),
      )

      if (count > 0) {
        addLog('RESTORE', `Restaurado lote ${batchId} com ${count} registros.`)
      }
      return count
    },
    [addLog],
  )

  const isDateInClosedPeriod = useCallback(
    (dateStr: string) => {
      const date = new Date(dateStr)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      const periodo = periodos.find((p) => p.ano === year && p.mes === month)
      return periodo?.status === 'Fechado'
    },
    [periodos],
  )

  const updateFieldConfig = useCallback((config: FieldConfig) => {
    setFieldConfigs((prev) => {
      const exists = prev.find((c) => c.id === config.id)
      if (exists) {
        return prev.map((c) => (c.id === config.id ? config : c))
      }
      return [...prev, config]
    })
  }, [])

  return React.createElement(
    ERPContext.Provider,
    {
      value: {
        users,
        setUsers,
        profiles,
        setProfiles,
        empresas,
        setEmpresas,
        filiais,
        setFiliais,
        notifications,
        setNotifications,
        logs,
        addLog,
        archiveLogs,
        restoreLogs,
        periodos,
        setPeriodos,
        isDateInClosedPeriod,
        currentUser,
        setCurrentUser,
        isTiModeEnabled,
        hasPermission,
        fieldConfigs,
        setFieldConfigs,
        updateFieldConfig,
      },
    },
    children,
  )
}

const useERPStore = () => {
  const context = useContext(ERPContext)
  if (!context) {
    throw new Error('useERPStore must be used within ERPProvider')
  }
  return context
}

export default useERPStore
