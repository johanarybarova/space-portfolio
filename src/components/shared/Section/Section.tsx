import { Flex } from '@/src/components/shared/Flex/Flex'
import { ReactNode } from 'react'
import styles from './Section.module.scss'

export const Section = ({ children, id }: { children: ReactNode; id?: string }) => (
  <Flex flexCol justifyCenter itemsCenter as='section' className={styles.section} id={id}>
    {children}
  </Flex>
)
