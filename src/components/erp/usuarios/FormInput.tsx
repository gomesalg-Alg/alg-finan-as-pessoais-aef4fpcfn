import { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { maskCPF, maskCEP, maskCNPJ, unmask } from '@/utils/mask'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useERPStore from '@/stores/useERPStore'
import { Mail } from 'lucide-react'

interface FormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  mask?: 'cpf' | 'cep' | 'cnpj'
  maxLength?: number
  techName?: string
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  mask,
  maxLength,
  techName,
}: FormInputProps<T>) {
  const { isTiModeEnabled } = useERPStore()
  const isTi = isTiModeEnabled

  const applyMask = (value: string) => {
    if (mask === 'cpf') return maskCPF(value)
    if (mask === 'cep') return maskCEP(value)
    if (mask === 'cnpj') return maskCNPJ(value)
    return value
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const displayValue = mask ? applyMask(field.value ?? '') : (field.value ?? '')

        const InputComponent = (
          <div className="relative w-full">
            <Input
              type={type}
              placeholder={placeholder}
              className={cn(
                'bg-background/50 border-border focus:border-primary w-full',
                techName?.endsWith('_MAIL') && 'pr-10',
                fieldState.error &&
                  'border-white focus:border-white ring-offset-white text-foreground',
              )}
              {...field}
              value={displayValue}
              onChange={(e) => {
                let val = e.target.value
                if (mask) {
                  val = applyMask(val)
                  field.onChange(unmask(val))
                } else {
                  field.onChange(val)
                }
              }}
              maxLength={maxLength}
            />
            {techName?.endsWith('_MAIL') && field.value && (
              <a
                href={`mailto:${field.value}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80"
                title="Enviar e-mail"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        )

        return (
          <FormItem>
            <FormLabel
              className={cn(
                'text-muted-foreground transition-colors',
                fieldState.error && '!text-white font-semibold',
              )}
            >
              {label}
            </FormLabel>
            {isTi && techName ? (
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="w-full cursor-help">
                    <FormControl>{InputComponent}</FormControl>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-slate-800 text-white border-slate-700 shadow-sm"
                >
                  <p className="font-mono text-xs">{techName}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <FormControl>{InputComponent}</FormControl>
            )}
            <FormMessage className="!text-white font-medium drop-shadow-md" />
          </FormItem>
        )
      }}
    />
  )
}
