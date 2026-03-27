import { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { maskCPF, maskCEP, maskCNPJ, unmask } from '@/utils/mask'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useERPStore from '@/stores/useERPStore'

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
          <Input
            type={type}
            placeholder={placeholder}
            className={cn(
              'bg-background/50 border-border focus:border-primary w-full',
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
