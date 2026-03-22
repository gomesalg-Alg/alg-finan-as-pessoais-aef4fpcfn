import { z } from 'zod'
import { isValidCNPJ } from '@/utils/mask'

export const empresaSchema = z.object({
  C_EMPR_CODI: z.string().min(1, 'Código é obrigatório'),
  C_EMPR_NOME: z.string().min(3, 'Razão Social deve ter no mínimo 3 caracteres'),
  C_EMPR_FANT: z.string().min(1, 'Nome Fantasia é obrigatório'),
  C_EMPR_CNPJ: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .refine((val) => val.replace(/\D/g, '').length === 14, 'CNPJ deve conter 14 dígitos')
    .refine((val) => isValidCNPJ(val), 'CNPJ inválido'),
})

export type EmpresaFormData = z.infer<typeof empresaSchema>
