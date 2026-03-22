import { CSSProperties, ReactNode } from 'react'
import cx from 'classnames'
import styles from '../../../../styles/fonts.module.scss'

type TypographyProps = {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'li'
    | 'strong'
    | 'i'
    | 'u'
    | 'figcaption'
  variant?:
    | 'L12Soft'
    | 'L14Soft'
    | 'L16Soft'
    | 'L20Soft'
    | 'L24Soft'
    | 'L32Soft'
    | 'L40Soft'
    | 'L48Soft'
    | 'L56Soft'
    | 'L64Soft'
    | 'L72Soft'
    | 'L80Soft'
    | 'L88Soft'
    | 'L96Soft'
    | 'L12Strong'
    | 'L14Strong'
    | 'L16Strong'
    | 'L20Strong'
    | 'L24Strong'
    | 'L32Strong'
    | 'L40Strong'
    | 'L48Strong'
    | 'L56Strong'
    | 'L64Strong'
    | 'L72Strong'
    | 'L80Strong'
    | 'L88Strong'
    | 'L96Strong'
    | 'T12Soft'
    | 'T14Soft'
    | 'T16Soft'
    | 'T20Soft'
    | 'T24Soft'
    | 'T32Soft'
    | 'T40Soft'
    | 'T48Soft'
    | 'T56Soft'
    | 'T64Soft'
    | 'T72Soft'
    | 'T80Soft'
    | 'T88Soft'
    | 'T96Soft'
    | 'T12Strong'
    | 'T14Strong'
    | 'T16Strong'
    | 'T20Strong'
    | 'T24Strong'
    | 'T32Strong'
    | 'T40Strong'
    | 'T48Strong'
    | 'T56Strong'
    | 'T64Strong'
    | 'T72Strong'
    | 'T80Strong'
    | 'T88Strong'
    | 'T96Strong'
  className?: string
  children?: ReactNode
  style?: CSSProperties
  id?: string
  'data-text'?: string
}

export const Typography = ({
  as = 'p',
  variant,
  className = '',
  children,
  style,
  id,
  'data-text': dataText,
}: TypographyProps) => {
  const Component = as

  return (
    <Component
      id={id}
      className={cx(variant && styles[variant], className)}
      style={style}
      data-text={dataText}
    >
      {children}
    </Component>
  )
}
