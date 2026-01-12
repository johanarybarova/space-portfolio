import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
  variant?: 'spark' | 'solid'
  size?: 'md' | 'lg'
  children: React.ReactNode
  className?: string
  as?: any
  [key: string]: any
}

export const Button = ({
  variant = 'spark',
  size = 'md',
  className,
  children,
  as: Component = 'button',
  ...props
}: ButtonProps) => {
  const isSpark = variant === 'spark'

  return (
    <Component className={cx(styles.button, styles[variant], styles[size], className)} {...props}>
      {isSpark && <span className={styles.sparkContainer} aria-hidden='true' />}
      <span className={styles.buttonText}>{children}</span>
    </Component>
  )
}
