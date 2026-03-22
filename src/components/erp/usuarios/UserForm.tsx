import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, UserFormData } from '@/schemas/userSchema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormInput } from './FormInput'
import { Save, X } from 'lucide-react'

interface UserFormProps {
  initialData?: Partial<UserFormData>
  onSubmit: (data: UserFormData) => void
  onCancel: () => void
}

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onBlur',
    defaultValues: {
      C_USER_CODI: initialData?.C_USER_CODI || '',
      C_USER_NOME: initialData?.C_USER_NOME || '',
      C_USER_FANT: initialData?.C_USER_FANT || '',
      C_USER_NCPF: initialData?.C_USER_NCPF || '',
      C_USER_PASS: initialData?.C_USER_PASS || '',
      C_USER_MAIL: initialData?.C_USER_MAIL || '',
      C_USER_CCEP: initialData?.C_USER_CCEP || '',
      C_USER_ENDE: initialData?.C_USER_ENDE || '',
      C_USER_BAIR: initialData?.C_USER_BAIR || '',
      C_USER_MUNI: initialData?.C_USER_MUNI || '',
      C_USER_ESTA: initialData?.C_USER_ESTA || '',
      C_USER_UFED: initialData?.C_USER_UFED || '',
      C_USER_PAIS: initialData?.C_USER_PAIS || '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/50 pb-2 text-foreground">
              Acesso ao Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="C_USER_CODI"
                label="Código do Usuário"
                placeholder="Ex: ADM01"
              />
              <FormInput
                control={form.control}
                name="C_USER_MAIL"
                label="E-mail Corporativo"
                type="email"
                placeholder="admin@empresa.com"
              />
              <FormInput
                control={form.control}
                name="C_USER_PASS"
                label="Senha de Acesso"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/50 pb-2 text-foreground">
              Identificação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="C_USER_NOME"
                label="Nome Completo"
                placeholder="João da Silva"
              />
              <FormInput
                control={form.control}
                name="C_USER_FANT"
                label="Nome Fantasia / Apelido"
                placeholder="João"
              />
              <FormInput
                control={form.control}
                name="C_USER_NCPF"
                label="Nº do CPF"
                placeholder="000.000.000-00"
                mask="cpf"
                maxLength={14}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/50 pb-2 text-foreground">
              Endereço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3">
                <FormInput
                  control={form.control}
                  name="C_USER_ENDE"
                  label="Logradouro"
                  placeholder="Rua Domingos Pires, 32"
                />
              </div>
              <FormInput
                control={form.control}
                name="C_USER_CCEP"
                label="CEP"
                placeholder="00000-000"
                mask="cep"
                maxLength={9}
              />
              <FormInput
                control={form.control}
                name="C_USER_BAIR"
                label="Bairro"
                placeholder="Interlagos"
              />
              <FormInput
                control={form.control}
                name="C_USER_MUNI"
                label="Município"
                placeholder="São Paulo"
              />
              <FormInput
                control={form.control}
                name="C_USER_ESTA"
                label="Estado"
                placeholder="São Paulo"
              />
              <FormInput
                control={form.control}
                name="C_USER_UFED"
                label="Unidade Federal (UF)"
                placeholder="SP"
                maxLength={2}
              />
              <FormInput
                control={form.control}
                name="C_USER_PAIS"
                label="País"
                placeholder="Brasil"
              />
            </div>
          </div>
        </div>

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
            <Save className="w-4 h-4 mr-2" /> Salvar Usuário
          </Button>
        </div>
      </form>
    </Form>
  )
}
