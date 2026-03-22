export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager' | 'ti'
  status: 'active' | 'inactive'
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
  // Legacy or ERP specific mappings
  C_USER_CODI?: string
  C_USER_NOME?: string
  C_USER_NCPF?: string
  C_USER_MAIL?: string
  C_USER_PERF?: string
  C_USER_EMPR?: string
  C_USER_FILI?: string
  [key: string]: any
}
