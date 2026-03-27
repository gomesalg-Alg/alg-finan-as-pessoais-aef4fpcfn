export interface FieldConfig {
  id: string
  entity: string
  field: string
  customLabel?: string
  isRequired?: boolean
  maxLength?: number
  maskType?: 'none' | 'cpf' | 'cnpj' | 'cep' | 'phone'
}
