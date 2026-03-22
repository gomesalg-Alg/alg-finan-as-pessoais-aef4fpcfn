import { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { maskCPF, maskCEP, maskCNPJ, unmask } from '@/utils/mask'
import { cn } from '@/lib/utils'

interface FormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  mask?: 'cpf' | 'cep' | 'cnpj'
  maxLength?: number
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  placeholder,
  mask,
  maxLength,
}: FormInputProps<T>) {
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
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className={cn(
                  'bg-background/50 border-border focus:border-primary',
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
            </FormControl>
            <FormMessage className="!text-white font-medium drop-shadow-md" />
          </FormItem>
        )
      }}
    />
  )
}
