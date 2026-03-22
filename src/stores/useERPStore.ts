import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { User } from '@/types/user'
import { Profile } from '@/types/profile'
import { Empresa } from '@/types/empresa'
import { Filial } from '@/types/filial'
import { Notification } from '@/types/notification'

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
  {
    id: '2',
    C_FILI_CODI: 'FIL02',
    C_FILI_NOME: 'Filial Rio de Janeiro',
    C_FILI_EMPR: '1',
    C_FILI_CNPJ: '12345678000277',
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
    C_USER_CODI: 'OP002',
    C_USER_NOME: 'Operador Sistema',
    C_USER_FANT: 'Operador',
    C_USER_NCPF: '99988877766',
    C_USER_PASS: '123456',
    C_USER_MAIL: 'operador@alg.com.br',
    C_USER_CCEP: '04821230',
    C_USER_ENDE: 'Rua B',
    C_USER_BAIR: 'Centro',
    C_USER_MUNI: 'SP',
    C_USER_ESTA: 'SP',
    C_USER_UFED: 'SP',
    C_USER_PAIS: 'Brasil',
    C_USER_PERF: 'OPER',
    C_USER_EMPR: '1',
    C_USER_FILI: '2',
  },
]

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Atualização de Sistema',
    message: 'A nova versão 0.0.21 foi aplicada com sucesso.',
    read: false,
    date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Aviso de Pendência',
    message: 'Existem 3 fornecedores aguardando homologação.',
    read: false,
    date: new Date(Date.now() - 3600000).toISOString(),
  },
]

export const ERPProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [empresas, setEmpresas] = useState<Empresa[]>(initialEmpresas)
  const [filiais, setFiliais] = useState<Filial[]>(initialFiliais)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const currentUser = useMemo(() => users[0] || null, [users])

  const hasPermission = (perm: string) => {
    if (!currentUser || !currentUser.C_USER_PERF) return false
    const profile = profiles.find((p) => p.id === currentUser.C_USER_PERF)
    return profile?.C_PERF_PERM.includes(perm) ?? false
  }

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
