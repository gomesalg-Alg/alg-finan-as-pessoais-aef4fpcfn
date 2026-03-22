import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { empresaSchema, EmpresaFormData } from '@/schemas/empresaSchema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '../usuarios/FormInput'
import { Save, X } from 'lucide-react'

interface EmpresaFormProps {
  initialData?: Partial<EmpresaFormData>
  onSubmit: (data: EmpresaFormData) => void
  onCancel: () => void
}

export function EmpresaForm({ initialData, onSubmit, onCancel }: EmpresaFormProps) {
  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    mode: 'onBlur',
    defaultValues: {
      C_EMPR_CODI: initialData?.C_EMPR_CODI || '',
      C_EMPR_NOME: initialData?.C_EMPR_NOME || '',
      C_EMPR_FANT: initialData?.C_EMPR_FANT || '',
      C_EMPR_CNPJ: initialData?.C_EMPR_CNPJ || '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border/50 pb-2 text-foreground">
            Dados da Empresa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="C_EMPR_CODI"
              label="Código"
              placeholder="Ex: EMP01"
            />
            <FormInput
              control={form.control}
              name="C_EMPR_CNPJ"
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              mask="cnpj"
              maxLength={18}
            />
            <FormInput
              control={form.control}
              name="C_EMPR_NOME"
              label="Razão Social"
              placeholder="Sua Empresa S.A."
            />
            <FormInput
              control={form.control}
              name="C_EMPR_FANT"
              label="Nome Fantasia"
              placeholder="Sua Empresa"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border/50 sticky bottom-0 bg-card py-4 z-10 -mx-6 px-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-border hover:bg-secondary text-[#8B4513]"
          >
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Empresa
          </Button>
        </div>
      </form>
    </Form>
  )
}
