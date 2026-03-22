import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { empresaSchema, EmpresaFormData } from '@/schemas/empresaSchema'
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
import { cepMask, cnpjMask, phoneMask } from '@/utils/mask'
import {
  Building2,
  MapPin,
  Hash,
  Phone,
  Mail,
  FileText,
  Landmark,
  Map as MapIcon,
  Navigation,
} from 'lucide-react'
import { logger } from '@/lib/logger'

interface EmpresaFormProps {
  initialData?: Partial<EmpresaFormData>
  onSubmit: (data: EmpresaFormData) => void
  onCancel?: () => void
}

export function EmpresaForm({ initialData, onSubmit, onCancel }: EmpresaFormProps) {
  const form = useForm<EmpresaFormData>({
    resolver: zodResolver(empresaSchema),
    defaultValues: {
      razaoSocial: initialData?.razaoSocial || '',
      nomeFantasia: initialData?.nomeFantasia || '',
      cnpj: initialData?.cnpj || '',
      ie: initialData?.ie || '',
      im: initialData?.im || '',
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

  const handleSubmit = (data: EmpresaFormData) => {
    logger.log('SUBMIT_EMPRESA', data)
    onSubmit(data)
  }

  const renderField = (
    name: keyof EmpresaFormData,
    label: string,
    icon: any,
    maskFn?: (v: string) => string,
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-blue-900 font-semibold">
            {icon && <span className="text-amber-800">{icon}</span>}
            {label}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              value={(field.value as string) || ''}
              onChange={(e) => {
                const val = maskFn ? maskFn(e.target.value) : e.target.value
                field.onChange(val)
              }}
              className="bg-white border-blue-200 focus-visible:ring-blue-500 text-gray-800 shadow-sm"
            />
          </FormControl>
          <FormMessage className="text-white bg-red-500 px-2 py-1 mt-1 rounded text-xs inline-block shadow-sm" />
        </FormItem>
      )}
    />
  )

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <div className="mb-6 pb-2 border-b border-blue-200 flex items-center gap-2">
        <Building2 className="h-6 w-6 text-amber-700" />
        <h2 className="text-xl font-bold text-blue-900">Cadastro de Empresa</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4" /> Localização
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('cep', 'CEP', <MapPin className="h-4 w-4" />, cepMask)}
              </div>
              <div className="md:col-span-3">
                {renderField('logradouro', 'Logradouro', <MapIcon className="h-4 w-4" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                {renderField('numero', 'Número', <Hash className="h-4 w-4" />)}
              </div>
              <div className="md:col-span-1">
                {renderField('complemento', 'Complemento', <Navigation className="h-4 w-4" />)}
              </div>
              <div className="md:col-span-2">
                {renderField('bairro', 'Bairro', <MapIcon className="h-4 w-4" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                {renderField('cidade', 'Cidade', <Landmark className="h-4 w-4" />)}
              </div>
              <div className="md:col-span-1">
                {renderField('uf', 'UF', <MapPin className="h-4 w-4" />)}
              </div>
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4" /> Dados Principais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('razaoSocial', 'Razão Social', <Building2 className="h-4 w-4" />)}
              {renderField('nomeFantasia', 'Nome Fantasia', <Building2 className="h-4 w-4" />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderField('cnpj', 'CNPJ', <FileText className="h-4 w-4" />, cnpjMask)}
              {renderField('ie', 'Inscrição Estadual', <Hash className="h-4 w-4" />)}
              {renderField('im', 'Inscrição Municipal', <Hash className="h-4 w-4" />)}
            </div>
          </div>

          <div className="bg-white/60 p-4 rounded-lg border border-blue-100/50 space-y-4">
            <h3 className="text-sm font-bold text-amber-800 uppercase flex items-center gap-2 mb-4">
              <Phone className="h-4 w-4" /> Contato
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField('telefone', 'Telefone', <Phone className="h-4 w-4" />, phoneMask)}
              {renderField('email', 'E-mail', <Mail className="h-4 w-4" />)}
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
              Salvar Empresa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
