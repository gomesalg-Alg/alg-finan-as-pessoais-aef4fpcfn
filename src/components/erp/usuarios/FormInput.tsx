import { Control, FieldValues, Path } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { maskCPF, maskCEP, unmask } from '@/utils/mask'

interface FormInputProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
  placeholder?: string
  mask?: 'cpf' | 'cep'
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
    return value
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = mask ? applyMask(field.value ?? '') : (field.value ?? '')

        return (
          <FormItem>
            <FormLabel className="text-muted-foreground">{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="bg-background/50 border-border focus:border-primary"
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
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
