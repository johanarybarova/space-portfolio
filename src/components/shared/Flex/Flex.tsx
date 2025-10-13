import { ReactNode, CSSProperties } from 'react'
import cx from 'classnames'
import styles from './Flex.module.scss'

type FlexProps = {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'form' | 'ul' | 'ol' | 'li' | 'nav'
  children?: ReactNode
  flexCol?: boolean
  flexWrap?: boolean
  justifyCenter?: boolean
  justifyEnd?: boolean
  justifyStart?: boolean
  justifyBetween?: boolean
  itemsCenter?: boolean
  itemsStart?: boolean
  itemsEnd?: boolean
  fullWidth?: boolean
  gap?: string
  dataTestId?: string
  className?: string
}

export const Flex = ({
  as = 'div',
  children,
  flexCol,
  flexWrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
  justifyBetween,
  itemsCenter,
  itemsStart,
  itemsEnd,
  fullWidth,
  gap,
  dataTestId,
  className,
}: FlexProps) => {
  const Component = as

  return (
    <Component
      data-testid={dataTestId}
      style={{ gap } as CSSProperties}
      className={cx(
        {
          [styles.flexCol]: flexCol,
          [styles.flexWrap]: flexWrap,
          [styles.justifyCenter]: justifyCenter,
          [styles.justifyEnd]: justifyEnd,
          [styles.justifyStart]: justifyStart,
          [styles.justifyBetween]: justifyBetween,
          [styles.itemsCenter]: itemsCenter,
          [styles.itemsStart]: itemsStart,
          [styles.itemsEnd]: itemsEnd,
          [styles.fullWidth]: fullWidth,
        },
        styles.flex,
        className
      )}
    >
      {children}
    </Component>
  )
}
