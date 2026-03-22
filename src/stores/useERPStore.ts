import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react'
import { User } from '@/types/user'
import { Profile } from '@/types/profile'
import { Empresa } from '@/types/empresa'
import { Filial } from '@/types/filial'
import { Notification } from '@/types/notification'
import { S_CLOG } from '@/types/log'
import { PeriodoFechamento } from '@/types/periodo'

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
  hasPermission: (perm: string) => boolean
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
      'relatorios',
    ],
  },
  {
    id: 'OPER',
    C_PERF_NOME: 'Operador',
    C_PERF_DESC: 'Acesso limitado às rotinas de operação',
    C_PERF_PERM: ['dashboard', 'clientes', 'fornecedores'],
  },
]

const initialEmpresas: Empresa[] = [
  {
    id: '1',
    C_EMPR_CODI: 'EMP01',
    C_EMPR_NOME: 'ALG Finanças S.A.',
    C_EMPR_FANT: 'ALG Finanças',
    C_EMPR_CNPJ: '12345678000199',
  },
]

const initialFiliais: Filial[] = [
  {
    id: '1',
    C_FILI_CODI: 'FIL01',
    C_FILI_NOME: 'Sede São Paulo',
    C_FILI_EMPR: '1',
    C_FILI_CNPJ: '12345678000199',
  },
]

const initialUsers: User[] = [
  {
    id: '1',
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
]

const initialNotifications: Notification[] = []

const initialLogs: S_CLOG[] = Array.from({ length: 45 }).map((_, i) => ({
  id: `log-${i}`,
  action: i % 3 === 0 ? 'LOGIN' : i % 2 === 0 ? 'UPDATE' : 'CREATE',
  timestamp: new Date(Date.now() - i * 86400000 * 2).toISOString(), // Spread over past 90 days
  userId: i % 2 === 0 ? '1' : '2',
  details: `Ação gerada automaticamente para histórico #${i}`,
  archived: false,
}))

const initialPeriodos: PeriodoFechamento[] = [
  {
    id: 'p1',
    ano: new Date().getFullYear(),
    mes: new Date().getMonth(), // Last month
    status: 'Fechado',
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedBy: 'ADM01',
  },
  {
    id: 'p2',
    ano: new Date().getFullYear(),
    mes: new Date().getMonth() + 1, // Current month
    status: 'Aberto',
    updatedAt: new Date().toISOString(),
    updatedBy: 'ADM01',
  },
]

export const ERPProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [empresas, setEmpresas] = useState<Empresa[]>(initialEmpresas)
  const [filiais, setFiliais] = useState<Filial[]>(initialFiliais)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [logs, setLogs] = useState<S_CLOG[]>(initialLogs)
  const [periodos, setPeriodos] = useState<PeriodoFechamento[]>(initialPeriodos)

  const currentUser = useMemo(() => users[0] || null, [users])

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
      const month = date.getMonth() + 1 // 1-12

      const periodo = periodos.find((p) => p.ano === year && p.mes === month)
      return periodo?.status === 'Fechado'
    },
    [periodos],
  )

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
        hasPermission,
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
