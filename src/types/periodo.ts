export interface PeriodoFechamento {
  id: string
  ano: number
  mes: number
  status: 'Aberto' | 'Fechado'
  updatedAt: string
  updatedBy: string
}
