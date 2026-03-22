import { z } from 'zod'

export const filialSchema = z.object({
  id: z.string().optional(),
  empresaId: z.string().min(1, 'Selecione uma empresa'),
  nome: z.string().min(1, 'Nome da filial é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  ie: z.string().optional(),
  cep: z.string().min(8, 'CEP inválido').optional().or(z.literal('')),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  uf: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
})

export type FilialFormData = z.infer<typeof filialSchema>
