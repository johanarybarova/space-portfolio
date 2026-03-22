import { Typography } from '@/src/components/shared/Typography/Typography'
import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

type ButtonProps<T extends ElementType = 'button'> = {
  variant?: 'spark' | 'solid'
  children: ReactNode
  className?: string
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export const Button = <T extends ElementType = 'button'>({
  variant = 'spark',
  className,
  children,
  as,
  ...props
}: ButtonProps<T>) => {
  const Component = (as || 'button') as ElementType
  const isSpark = variant === 'spark'

  return (
    <Component className={cx(styles.button, styles[variant], className)} {...props}>
      {isSpark && <span className={styles.sparkContainer} aria-hidden='true' />}
      <Typography
        as='span'
        variant={isSpark ? 'T16Soft' : 'T16Strong'}
        className={styles.buttonText}
      >
        {children}
      </Typography>
    </Component>
  )
}
