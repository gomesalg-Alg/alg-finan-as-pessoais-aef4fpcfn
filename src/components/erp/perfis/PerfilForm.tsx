import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { perfilSchema, PerfilFormData } from '@/schemas/perfilSchema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Save, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import useERPStore from '@/stores/useERPStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { validateTechnicalTypes } from '@/utils/metadata'
import { toast } from 'sonner'

interface PerfilFormProps {
  initialData?: Partial<PerfilFormData>
  onSubmit: (data: PerfilFormData) => void
  onCancel: () => void
}

const PERMISSIONS = [
  { id: 'dashboard', label: 'Dashboard', desc: 'Visualização de indicadores gerenciais' },
  { id: 'usuarios', label: 'Usuários', desc: 'Gestão de usuários do sistema' },
  { id: 'perfis', label: 'Perfis de Acesso', desc: 'Gestão de perfis e níveis de permissão' },
  { id: 'clientes', label: 'Clientes', desc: 'Cadastro de clientes' },
  { id: 'fornecedores', label: 'Fornecedores', desc: 'Cadastro de fornecedores' },
  {
    id: 'classificacao-financeira',
    label: 'Classificação Financeira',
    desc: 'Plano de contas e categorias',
  },
]

const FieldWrapper = ({
  children,
  isTi,
  techName,
}: {
  children: React.ReactNode
  isTi: boolean
  techName?: string
}) => {
  if (isTi && techName) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="w-full cursor-help">{children}</div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-slate-800 text-white border-slate-700 shadow-sm">
          <p className="font-mono text-xs">{techName}</p>
        </TooltipContent>
      </Tooltip>
    )
  }
  return <>{children}</>
}

export function PerfilForm({ initialData, onSubmit, onCancel }: PerfilFormProps) {
  const { isTiModeEnabled, fieldConfigs } = useERPStore()
  const isTi = isTiModeEnabled

  const form = useForm<PerfilFormData>({
    resolver: zodResolver(perfilSchema),
    mode: 'onBlur',
    defaultValues: {
      C_PERF_NOME: initialData?.C_PERF_NOME || '',
      C_PERF_DESC: initialData?.C_PERF_DESC || '',
      C_PERF_PERM: initialData?.C_PERF_PERM || [],
    },
  })

  const onSubmitHandler = (data: PerfilFormData) => {
    if (isTi) {
      const techErrors = validateTechnicalTypes(data, 'perfis')
      if (techErrors.length > 0) {
        techErrors.forEach((err) => {
          toast.error('Erro de Validação Técnica', {
            description: err,
            duration: 6000,
          })
        })
        return // Trava de Segurança
      }
    }
    onSubmit(data)
  }

  const configNome = fieldConfigs.find((c) => c.entity === 'perfis' && c.field === 'C_PERF_NOME')
  const configDesc = fieldConfigs.find((c) => c.entity === 'perfis' && c.field === 'C_PERF_DESC')
  const configPerm = fieldConfigs.find((c) => c.entity === 'perfis' && c.field === 'C_PERF_PERM')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-8 pb-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="C_PERF_NOME"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    'text-muted-foreground',
                    fieldState.error && '!text-white font-semibold',
                  )}
                >
                  {configNome?.customLabel || 'Nome do Perfil'}
                  {configNome?.isRequired && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FieldWrapper isTi={isTi} techName="C_PERF_NOME">
                  <FormControl>
                    <Input
                      placeholder="Ex: Gerente Financeiro"
                      required={configNome?.isRequired}
                      maxLength={configNome?.maxLength || undefined}
                      className={cn(
                        'bg-background/50 border-border focus:border-primary',
                        fieldState.error && 'border-white focus:border-white ring-offset-white',
                      )}
                      {...field}
                    />
                  </FormControl>
                </FieldWrapper>
                <FormMessage className="!text-white font-medium drop-shadow-md" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="C_PERF_DESC"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    'text-muted-foreground',
                    fieldState.error && '!text-white font-semibold',
                  )}
                >
                  {configDesc?.customLabel || 'Descrição'}
                  {configDesc?.isRequired && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FieldWrapper isTi={isTi} techName="C_PERF_DESC">
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as responsabilidades deste perfil..."
                      required={configDesc?.isRequired}
                      maxLength={configDesc?.maxLength || undefined}
                      className={cn(
                        'bg-background/50 border-border focus:border-primary min-h-[100px]',
                        fieldState.error && 'border-white focus:border-white ring-offset-white',
                      )}
                      {...field}
                    />
                  </FormControl>
                </FieldWrapper>
                <FormMessage className="!text-white font-medium drop-shadow-md" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="C_PERF_PERM"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base font-semibold text-foreground border-b border-border/50 pb-2 block">
                  {configPerm?.customLabel || 'Permissões de Acesso'}
                  {configPerm?.isRequired && <span className="text-red-500 ml-1">*</span>}
                </FormLabel>
                <FormDescription>
                  Selecione as áreas do sistema que os usuários com este perfil terão acesso.
                </FormDescription>
              </div>
              <FieldWrapper isTi={isTi} techName="C_PERF_PERM">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERMISSIONS.map((perm) => (
                    <FormField
                      key={perm.id}
                      control={form.control}
                      name="C_PERF_PERM"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={perm.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4 bg-background/50 hover:border-primary/50 transition-colors cursor-pointer"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(perm.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), perm.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== perm.id),
                                      )
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none cursor-pointer">
                              <FormLabel className="font-medium cursor-pointer">
                                {perm.label}
                              </FormLabel>
                              <FormDescription className="cursor-pointer">
                                {perm.desc}
                              </FormDescription>
                            </div>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FieldWrapper>
              <FormMessage className="!text-white font-medium drop-shadow-md mt-2" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-6 border-t border-border/50 sticky bottom-0 bg-card py-4 z-10 -mx-6 px-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-border hover:bg-secondary"
          >
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Perfil
          </Button>
        </div>
      </form>
    </Form>
  )
}
