import { FormFieldShell } from '@/src/components/shared/FormField/FormFieldShell'
import { useFormContext } from 'react-hook-form'
import cx from 'classnames'
import fontStyles from '@/styles/fonts.module.scss'
import styles from '../FormField/FormField.module.scss'

type InputProps = {
  type?: string
  name: string
  label: string
  placeholder?: string
  className?: string
  wrapperClassName?: string
  isRequired?: boolean
}

export const Input = ({
  type = 'text',
  name,
  label,
  placeholder = ' ',
  className,
  wrapperClassName,
  isRequired = false,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessage = String(errors?.[name]?.message || '')
  const hasError = !!errors?.[name]

  return (
    <FormFieldShell
      name={name}
      label={label}
      errorMessage={errorMessage}
      wrapperClassName={wrapperClassName}
    >
      <input
        id={name}
        aria-describedby={`${name}-error`}
        aria-invalid={hasError}
        aria-required={isRequired}
        className={cx(styles.fieldControl, fontStyles.T16Soft, className)}
        placeholder={placeholder}
        type={type}
        {...register(name, { required: isRequired ? `${label} is required` : false })}
      />
    </FormFieldShell>
  )
}
