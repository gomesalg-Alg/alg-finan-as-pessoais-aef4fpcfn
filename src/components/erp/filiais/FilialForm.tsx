import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getEmpresas } from '@/services/empresas'
import { Empresa } from '@/types/empresa'
import { filialSchema, FilialFormData } from '@/schemas/filialSchema'
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
import { maskCPF, cepMask, cnpjMask, phoneMask } from '@/utils/mask'
import {
  Store,
  MapPin,
  Hash,
  Phone,
  Mail,
  FileText,
  Landmark,
  Map as MapIcon,
  Navigation,
  Building2,
} from 'lucide-react'
import { logger } from '@/lib/logger'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useERPStore from '@/stores/useERPStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { validateTechnicalTypes } from '@/utils/metadata'
import { toast } from 'sonner'

interface FilialFormProps {
  initialData?: Partial<FilialFormData>
  empresas?: {
    id: string
    nomeFantasia?: string
    C_EMPR_NOME?: string
    C_EMPR_FANT?: string
    razaoSocial?: string
  }[]
  onSubmit: (data: FilialFormData, form: any) => Promise<void> | void
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

export function FilialForm({ initialData, empresas = [], onSubmit, onCancel }: FilialFormProps) {
  const { isTiModeEnabled, fieldConfigs } = useERPStore()
  const isTi = isTiModeEnabled

  const [empresasList, setEmpresasList] = useState<Empresa[]>([])
  const [isLoadingEmpresas, setIsLoadingEmpresas] = useState(true)
  const [errorEmpresas, setErrorEmpresas] = useState(false)

  useEffect(() => {
    let mounted = true
    const fetchEmpresas = async () => {
      try {
        setIsLoadingEmpresas(true)
        setErrorEmpresas(false)
        const data = await getEmpresas()
        if (mounted) {
          setEmpresasList(data)
        }
      } catch (err) {
        if (mounted) {
          setErrorEmpresas(true)
          toast.error('Erro de Conexão', {
            description: 'Não foi possível carregar a lista de empresas.',
          })
        }
      } finally {
        if (mounted) {
          setIsLoadingEmpresas(false)
        }
      }
    }
    fetchEmpresas()
    return () => {
      mounted = false
    }
  }, [])

  const form = useForm<FilialFormData>({
    resolver: zodResolver(filialSchema),
    defaultValues: {
      codigo: initialData?.codigo || (initialData as any)?.C_FILI_CODI || '',
      empresaId: initialData?.empresaId || (initialData as any)?.C_FILI_EMPR || '',
      nome: initialData?.nome || '',
      cnpj: initialData?.cnpj || '',
      ie: initialData?.ie || '',
      cep: initialData?.cep || '',
      logradouro: initialData?.logradouro || '',
      numero: initialData?.numero || '',
      complemento: initialData?.complemento || '',
      bairro: initialData?.bairro || '',
      cidade: initialData?.cidade || '',
      uf: initialData?.uf || '',
      telefone: initialData?.telefone || '',
      email: initialData?.email || '',
      ...initialData,
    },
  })

  useCepAutofill(form.watch, form.setValue)

  const handleSubmit = async (data: FilialFormData) => {
    if (isTi) {
      const techErrors = validateTechnicalTypes(data, 'C_FILI')
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
    logger.log('SUBMIT_FILIAL', data)
    try {
      await onSubmit(data, form)
    } catch (err) {
      // Error handled by parent
    }
  }

  const renderField = (
    name: keyof FilialFormData,
    label: string,
    icon: any,
    techName?: string,
    defaultMaskFn?: (v: string) => string,
  ) => {
    const config = fieldConfigs.find((c) => c.entity === 'C_FILI' && c.field === name)
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

  const empresaConfig = fieldConfigs.find((c) => c.entity === 'C_FILI' && c.field === 'empresaId')

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <div className="mb-6 pb-2 border-b border-blue-200 flex items-center gap-2">
        <Store className="h-6 w-6 text-amber-700" />
        <h2 className="text-xl font-bold text-blue-900">Cadastro de Filial{isTi && ' - C_FILI'}</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4" /> Dados Principais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-1">
                {renderField('codigo', 'Código', <Hash className="h-4 w-4" />, 'C_FILI_CODI')}
              </div>
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="empresaId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-blue-900 font-semibold">
                        <Building2 className="h-4 w-4 text-amber-800" />
                        {empresaConfig?.customLabel || 'Empresa Filial'}
                        {empresaConfig?.isRequired && <span className="text-red-500 ml-1">*</span>}
                      </FormLabel>
                      <FieldWrapper isTi={isTi} techName="C_FILI_EMPR">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                          required={empresaConfig?.isRequired}
                          disabled={isLoadingEmpresas || errorEmpresas}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white border-blue-200 focus-visible:ring-blue-500 shadow-sm text-gray-800">
                              <SelectValue
                                placeholder={
                                  isLoadingEmpresas
                                    ? 'Carregando empresas...'
                                    : errorEmpresas
                                      ? 'Erro ao carregar empresas'
                                      : empresasList.length === 0
                                        ? 'Nenhuma empresa encontrada'
                                        : 'Selecione a empresa'
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {empresasList.length === 0 && !isLoadingEmpresas && !errorEmpresas ? (
                              <SelectItem value="empty" disabled>
                                Nenhuma empresa encontrada
                              </SelectItem>
                            ) : (
                              empresasList.map((emp) => (
                                <SelectItem key={emp.id} value={emp.id}>
                                  {emp.C_EMPR_NOME ||
                                    emp.razaoSocial ||
                                    emp.nomeFantasia ||
                                    'Empresa Sem Nome'}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FieldWrapper>
                      <FormMessage className="text-white bg-red-500 px-2 py-1 mt-1 rounded text-xs inline-block shadow-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                {renderField(
                  'nome',
                  'Nome da Filial',
                  <Store className="h-4 w-4" />,
                  'C_FILI_NOME',
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                'cnpj',
                'CNPJ',
                <FileText className="h-4 w-4" />,
                'C_FILI_CNPJ',
                cnpjMask,
              )}
              {renderField('ie', 'Inscrição Estadual', <Hash className="h-4 w-4" />, 'C_FILI_INSC')}
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <Phone className="h-4 w-4" /> Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                'telefone',
                'Telefone',
                <Phone className="h-4 w-4" />,
                'C_FILI_FONE',
                phoneMask,
              )}
              {renderField('email', 'E-mail', <Mail className="h-4 w-4" />, 'C_FILI_MAIL')}
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4" /> Localização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('cep', 'CEP', <MapPin className="h-4 w-4" />, 'C_FILI_CCEP', cepMask)}
              </div>
              <div className="md:col-span-3">
                {renderField(
                  'logradouro',
                  'Logradouro',
                  <MapIcon className="h-4 w-4" />,
                  'C_FILI_ENDE',
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('numero', 'Número', <Hash className="h-4 w-4" />, 'C_FILI_NUME')}
              </div>
              <div className="md:col-span-1">
                {renderField(
                  'complemento',
                  'Complemento',
                  <Navigation className="h-4 w-4" />,
                  'C_FILI_COMP',
                )}
              </div>
              <div className="md:col-span-2">
                {renderField('bairro', 'Bairro', <MapIcon className="h-4 w-4" />, 'C_FILI_BAIR')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                {renderField('cidade', 'Cidade', <Landmark className="h-4 w-4" />, 'C_FILI_MUNI')}
              </div>
              <div className="md:col-span-1">
                {renderField('uf', 'UF', <MapPin className="h-4 w-4" />, 'C_FILI_UFED')}
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
              Salvar Filial
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
