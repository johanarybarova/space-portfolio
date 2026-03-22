import { FormFieldShell } from '@/src/components/shared/FormField/FormFieldShell'
import { useFormContext } from 'react-hook-form'
import cx from 'classnames'
import fontStyles from '@/styles/fonts.module.scss'
import styles from '../FormField/FormField.module.scss'

type TextareaProps = {
  name: string
  label: string
  placeholder?: string
  className?: string
  wrapperClassName?: string
  rows?: number
  isRequired?: boolean
}

export const Textarea = ({
  name,
  label,
  placeholder = ' ',
  className,
  wrapperClassName,
  rows = 4,
  isRequired = false,
}: TextareaProps) => {
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
      <textarea
        id={name}
        aria-describedby={`${name}-error`}
        aria-invalid={hasError}
        aria-required={isRequired}
        className={cx(styles.fieldControl, styles.textarea, fontStyles.T16Soft, className)}
        placeholder={placeholder}
        rows={rows}
        {...register(name, { required: isRequired ? `${label} is required` : false })}
      />
    </FormFieldShell>
  )
}
