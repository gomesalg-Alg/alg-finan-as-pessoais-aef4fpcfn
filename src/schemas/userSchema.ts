import { z } from 'zod'
import { isValidCPF } from '@/utils/mask'

export const userSchema = z.object({
  C_USER_CODI: z.string().min(1, 'Código é obrigatório'),
  C_USER_NOME: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  C_USER_FANT: z.string().min(1, 'Nome fantasia é obrigatório'),
  C_USER_NCPF: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine((val) => val.replace(/\D/g, '').length === 11, 'CPF deve conter 11 dígitos')
    .refine((val) => isValidCPF(val), 'CPF inválido, verifique os números digitados'),
  C_USER_PASS: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  C_USER_MAIL: z.string().email('E-mail inválido'),
  C_USER_CCEP: z.string().min(8, 'CEP deve conter 8 dígitos'),
  C_USER_ENDE: z.string().min(1, 'Logradouro é obrigatório'),
  C_USER_BAIR: z.string().min(1, 'Bairro é obrigatório'),
  C_USER_MUNI: z.string().min(1, 'Município é obrigatório'),
  C_USER_ESTA: z.string().min(1, 'Estado é obrigatório'),
  C_USER_UFED: z.string().length(2, 'UF deve ter 2 caracteres (ex: SP)'),
  C_USER_PAIS: z.string().min(1, 'País é obrigatório'),
  C_USER_PERF: z.string().min(1, 'Perfil de Acesso é obrigatório'),
})

export type UserFormData = z.infer<typeof userSchema>
