import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormData } from '@/schemas/userSchema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCepAutofill } from '@/hooks/use-cep-autofill'
import { maskCPF, cnpjMask, cepMask, phoneMask } from '@/utils/mask'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User as UserIcon,
  MapPin,
  Mail,
  Shield,
  Activity,
  Hash,
  Map as MapIcon,
  Navigation,
  Landmark,
} from 'lucide-react'
import { logger } from '@/lib/logger'
import useERPStore from '@/stores/useERPStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { validateTechnicalTypes } from '@/utils/metadata'
import { toast } from 'sonner'

interface UserFormProps {
  initialData?: Partial<UserFormData>
  onSubmit: (data: UserFormData) => void
  onCancel?: () => void
}

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

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const { isTiModeEnabled, fieldConfigs } = useERPStore()
  const isTi = isTiModeEnabled

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name || initialData?.C_USER_NOME || '',
      email: initialData?.email || initialData?.C_USER_MAIL || '',
      role:
        initialData?.role ||
        (initialData?.C_USER_PERF?.toLowerCase() as 'admin' | 'user' | 'manager' | 'ti') ||
        'user',
      status: initialData?.status || 'active',
      cep: initialData?.cep || initialData?.C_USER_CCEP || '',
      logradouro: initialData?.logradouro || initialData?.C_USER_ENDE || '',
      numero: initialData?.numero || initialData?.C_USER_NUME || '',
      complemento: initialData?.complemento || initialData?.C_USER_COMP || '',
      bairro: initialData?.bairro || initialData?.C_USER_BAIR || '',
      cidade: initialData?.cidade || initialData?.C_USER_MUNI || '',
      uf: initialData?.uf || initialData?.C_USER_UFED || '',
      ...initialData,
    },
  })

  useCepAutofill(form.watch, form.setValue)

  const handleSubmit = (data: UserFormData) => {
    if (isTi) {
      const techErrors = validateTechnicalTypes(data, 'C_USER')
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
    logger.log('SUBMIT_USER', data)
    onSubmit(data)
  }

  const renderField = (
    name: keyof UserFormData,
    label: string,
    icon: any,
    techName?: string,
    defaultMaskFn?: (v: string) => string,
  ) => {
    const config = fieldConfigs.find((c) => c.entity === 'C_USER' && c.field === name)
    const displayLabel = config?.customLabel || label
    const isRequired = config?.isRequired || false
    const maxLength = config?.maxLength || undefined

    let finalMaskFn = defaultMaskFn
    if (config?.maskType === 'cpf') finalMaskFn = maskCPF
    else if (config?.maskType === 'cnpj') finalMaskFn = cnpjMask
    else if (config?.maskType === 'cep') finalMaskFn = cepMask
    else if (config?.maskType === 'phone') finalMaskFn = phoneMask
    else if (config?.maskType === 'none') finalMaskFn = undefined

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-blue-900 font-semibold">
              {icon && <span className="text-amber-800">{icon}</span>}
              {displayLabel}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FieldWrapper isTi={isTi} techName={techName}>
              <FormControl>
                <Input
                  {...field}
                  value={(field.value as string) || ''}
                  onChange={(e) => {
                    const val = finalMaskFn ? finalMaskFn(e.target.value) : e.target.value
                    field.onChange(val)
                  }}
                  required={isRequired}
                  maxLength={maxLength}
                  className="bg-white border-blue-200 focus-visible:ring-blue-500 text-gray-800 shadow-sm w-full"
                />
              </FormControl>
            </FieldWrapper>
            <FormMessage className="text-white bg-red-500 px-2 py-1 mt-1 rounded text-xs inline-block shadow-sm" />
          </FormItem>
        )}
      />
    )
  }

  const roleConfig = fieldConfigs.find((c) => c.entity === 'C_USER' && c.field === 'role')
  const statusConfig = fieldConfigs.find((c) => c.entity === 'C_USER' && c.field === 'status')

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <div className="mb-6 pb-2 border-b border-blue-200 flex items-center gap-2">
        <UserIcon className="h-6 w-6 text-amber-700" />
        <h2 className="text-xl font-bold text-blue-900">
          Cadastro de Usuário{isTi && ' - C_USER'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <UserIcon className="h-4 w-4" /> Dados do Usuário
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                {renderField(
                  'name',
                  'Nome Completo',
                  <UserIcon className="h-4 w-4" />,
                  'C_USER_NOME',
                )}
              </div>
              <div className="md:col-span-1">
                {renderField('email', 'E-mail', <Mail className="h-4 w-4" />, 'C_USER_MAIL')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-blue-900 font-semibold">
                      <Shield className="h-4 w-4 text-amber-800" />
                      {roleConfig?.customLabel || 'Nível de Acesso'}
                      {roleConfig?.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FieldWrapper isTi={isTi} techName="C_USER_PERF">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required={roleConfig?.isRequired}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-blue-200 focus-visible:ring-blue-500 shadow-sm text-gray-800">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="manager">Gerente</SelectItem>
                          <SelectItem value="user">Usuário Comum</SelectItem>
                          <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldWrapper>
                    <FormMessage className="text-white bg-red-500 px-2 py-1 mt-1 rounded text-xs inline-block shadow-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-blue-900 font-semibold">
                      <Activity className="h-4 w-4 text-amber-800" />
                      {statusConfig?.customLabel || 'Status'}
                      {statusConfig?.isRequired && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FieldWrapper isTi={isTi} techName="C_USER_STAT">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required={statusConfig?.isRequired}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white border-blue-200 focus-visible:ring-blue-500 shadow-sm text-gray-800">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldWrapper>
                    <FormMessage className="text-white bg-red-500 px-2 py-1 mt-1 rounded text-xs inline-block shadow-sm" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4" /> Endereço Residencial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('cep', 'CEP', <MapPin className="h-4 w-4" />, 'C_USER_CCEP', cepMask)}
              </div>
              <div className="md:col-span-3">
                {renderField(
                  'logradouro',
                  'Logradouro',
                  <MapIcon className="h-4 w-4" />,
                  'C_USER_ENDE',
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('numero', 'Número', <Hash className="h-4 w-4" />, 'C_USER_NUME')}
              </div>
              <div className="md:col-span-1">
                {renderField(
                  'complemento',
                  'Complemento',
                  <Navigation className="h-4 w-4" />,
                  'C_USER_COMP',
                )}
              </div>
              <div className="md:col-span-2">
                {renderField('bairro', 'Bairro', <MapIcon className="h-4 w-4" />, 'C_USER_BAIR')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                {renderField('cidade', 'Cidade', <Landmark className="h-4 w-4" />, 'C_USER_MUNI')}
              </div>
              <div className="md:col-span-1">
                {renderField('uf', 'UF', <MapPin className="h-4 w-4" />, 'C_USER_UFED')}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-blue-200">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-blue-300 text-blue-800 bg-white"
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white shadow-md font-semibold"
            >
              Salvar Usuário
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
