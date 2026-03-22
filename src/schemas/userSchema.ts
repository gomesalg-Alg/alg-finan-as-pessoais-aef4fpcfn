import { z } from 'zod'

export const userSchema = z.object({
  C_USER_CODI: z.string().min(1, 'Código é obrigatório'),
  C_USER_NOME: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  C_USER_FANT: z.string().min(1, 'Nome fantasia é obrigatório'),
  C_USER_NCPF: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 números (somente dígitos)'),
  C_USER_PASS: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  C_USER_MAIL: z.string().email('E-mail inválido'),
  C_USER_CCEP: z.string().min(8, 'CEP inválido'),
  C_USER_ENDE: z.string().min(1, 'Logradouro é obrigatório'),
  C_USER_BAIR: z.string().min(1, 'Bairro é obrigatório'),
  C_USER_MUNI: z.string().min(1, 'Município é obrigatório'),
  C_USER_ESTA: z.string().min(1, 'Estado é obrigatório'),
  C_USER_UFED: z.string().length(2, 'UF deve ter 2 caracteres (ex: SP)'),
  C_USER_PAIS: z.string().min(1, 'País é obrigatório'),
})

export type UserFormData = z.infer<typeof userSchema>
