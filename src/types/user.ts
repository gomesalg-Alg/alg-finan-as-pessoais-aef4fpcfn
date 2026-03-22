export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive'
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
}
