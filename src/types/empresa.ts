export interface Empresa {
  id: string
  C_ACIA_PKID?: string
  C_ACIA_CREA?: string
  C_ACIA_UPDT?: string
  C_EMPR_CODI?: string
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  ie?: string
  im?: string
  cep?: string
  logradouro?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
  telefone?: string
  email?: string
  dataAbertura?: string | Date
  createdAt?: string
  updatedAt?: string
}
