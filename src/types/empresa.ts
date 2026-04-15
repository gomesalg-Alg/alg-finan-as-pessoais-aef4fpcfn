export interface Empresa {
  id: string
  C_EMPR_PKID?: string
  C_EMPR_CREA?: string
  C_EMPR_UPDT?: string
  C_EMPR_CODI?: string
  C_EMPR_DTAB?: string | Date
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
