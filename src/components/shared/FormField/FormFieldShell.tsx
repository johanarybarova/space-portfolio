import { AriaLiveErrorMessage } from '@/src/components/shared/AriaLiveErrorMessage/AriaLiveErrorMessage'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { ReactNode } from 'react'
import { Typography } from '@/src/components/shared/Typography/Typography'
import cx from 'classnames'
import styles from './FormField.module.scss'

type FormFieldShellProps = {
  name: string
  label: string
  errorMessage: string
  wrapperClassName?: string
  children: ReactNode
}

export const FormFieldShell = ({
  name,
  label,
  errorMessage,
  wrapperClassName,
  children,
}: FormFieldShellProps) => (
  <Flex className={cx(styles.fieldWrapper, wrapperClassName)}>
    {children}
    <label htmlFor={name} className={styles.label}>
      <Typography as='span' variant='T16Soft' className={styles.labelText}>
        {label}
      </Typography>
    </label>
    <div className={styles.focusLine} />
    <AriaLiveErrorMessage
      className={styles.errorMessage}
      errorMessage={errorMessage}
      id={`${name}-error`}
    />
  </Flex>
)
