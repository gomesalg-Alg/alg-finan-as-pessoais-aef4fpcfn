import { z } from 'zod'
import { isValidCNPJ } from '@/utils/mask'

export const filialSchema = z.object({
  C_FILI_CODI: z.string().min(1, 'Código é obrigatório'),
  C_FILI_NOME: z.string().min(3, 'Nome da Filial deve ter no mínimo 3 caracteres'),
  C_FILI_EMPR: z.string().min(1, 'A Empresa vinculada é obrigatória'),
  C_FILI_CNPJ: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .refine((val) => val.replace(/\D/g, '').length === 14, 'CNPJ deve conter 14 dígitos')
    .refine((val) => isValidCNPJ(val), 'CNPJ inválido'),
})

export type FilialFormData = z.infer<typeof filialSchema>
