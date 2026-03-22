import { useWatch, useFormContext } from 'react-hook-form'

export const useWatchedValue = (name: string) => {
  const { control } = useFormContext()

  return useWatch({ name, control })
}
