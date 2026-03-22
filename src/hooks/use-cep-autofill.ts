import { useEffect } from 'react'
import { UseFormSetValue, UseFormWatch } from 'react-hook-form'

export function useCepAutofill(watch: UseFormWatch<any>, setValue: UseFormSetValue<any>) {
  const cepValue = watch('cep')

  useEffect(() => {
    if (!cepValue) return
    const cleanCep = cepValue.replace(/\D/g, '')
    if (cleanCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setValue('logradouro', data.logradouro, { shouldValidate: true, shouldDirty: true })
            setValue('bairro', data.bairro, { shouldValidate: true, shouldDirty: true })
            setValue('cidade', data.localidade, { shouldValidate: true, shouldDirty: true })
            setValue('uf', data.uf, { shouldValidate: true, shouldDirty: true })
          }
        })
        .catch(console.error)
    }
  }, [cepValue, setValue])
}
