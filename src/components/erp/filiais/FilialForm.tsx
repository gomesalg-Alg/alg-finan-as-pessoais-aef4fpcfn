import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { filialSchema, FilialFormData } from '@/schemas/filialSchema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from '../usuarios/FormInput'
import { Save, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useERPStore from '@/stores/useERPStore'
import { cn } from '@/lib/utils'

interface FilialFormProps {
  initialData?: Partial<FilialFormData>
  onSubmit: (data: FilialFormData) => void
  onCancel: () => void
}

export function FilialForm({ initialData, onSubmit, onCancel }: FilialFormProps) {
  const { empresas, currentUser } = useERPStore()

  // Filter available companies if needed (for simplicity, they can pick from allowed ones)
  const allowedEmpresas = empresas.filter(
    (e) => e.id === currentUser?.C_USER_EMPR || currentUser?.C_USER_PERF === 'ADMIN',
  )

  const form = useForm<FilialFormData>({
    resolver: zodResolver(filialSchema),
    mode: 'onBlur',
    defaultValues: {
      C_FILI_CODI: initialData?.C_FILI_CODI || '',
      C_FILI_NOME: initialData?.C_FILI_NOME || '',
      C_FILI_EMPR: initialData?.C_FILI_EMPR || '',
      C_FILI_CNPJ: initialData?.C_FILI_CNPJ || '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border/50 pb-2 text-foreground">
            Dados da Filial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="C_FILI_CODI"
              label="Código"
              placeholder="Ex: FIL01"
            />
            <FormInput
              control={form.control}
              name="C_FILI_NOME"
              label="Nome da Filial"
              placeholder="Filial Centro"
            />
            <FormField
              control={form.control}
              name="C_FILI_EMPR"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      'text-muted-foreground transition-colors',
                      fieldState.error && '!text-white font-semibold',
                    )}
                  >
                    Empresa Vinculada
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'bg-background/50 border-border focus:border-primary',
                          fieldState.error &&
                            'border-white focus:border-white ring-offset-white text-white',
                        )}
                      >
                        <SelectValue placeholder="Selecione a Empresa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allowedEmpresas.map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.C_EMPR_NOME}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="!text-white font-medium drop-shadow-md" />
                </FormItem>
              )}
            />
            <FormInput
              control={form.control}
              name="C_FILI_CNPJ"
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              mask="cnpj"
              maxLength={18}
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
            <Save className="w-4 h-4 mr-2" /> Salvar Filial
          </Button>
        </div>
      </form>
    </Form>
  )
}
