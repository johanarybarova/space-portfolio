import { Flex } from '../Flex/Flex'
import { ReactNode } from 'react'
import styles from './Section.module.scss'

export const Section = ({ children }: { children: ReactNode }) => (
  <Flex flexCol justifyCenter itemsCenter as='section' className={styles.section}>
    {children}
  </Flex>
)
