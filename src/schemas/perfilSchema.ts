import { z } from 'zod'

export const perfilSchema = z.object({
  C_PERF_NOME: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  C_PERF_DESC: z.string().min(1, 'Descrição é obrigatória'),
  C_PERF_PERM: z.array(z.string()).min(1, 'Selecione pelo menos uma permissão'),
})

export type PerfilFormData = z.infer<typeof perfilSchema>
