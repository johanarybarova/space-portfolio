import { Flex } from '@/src/components/shared/Flex/Flex'
import { Number } from '@/src/components/shared/Number/Number'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { Typography } from '@/src/components/shared/Typography/Typography'
import styles from './Intro.module.scss'

export const Intro = () => (
  <Section>
    <Flex flexCol fullWidth justifyBetween className={styles.container}>
      <Number number='01' />
      <Flex flexCol justifyBetween className={styles.textContentWrapper}>
        <SectionHeadings headline='Intro' subheadline='Universe of experience' />
        <Flex flexCol fullWidth justifyBetween className={styles.bottomContent}>
          <Typography as='p' variant='L16Soft'>
            I’m a seasoned full-stack engineer with a strong frontend focus, specializing in React,
            TypeScript, and building fast, accessible, and scalable web apps. I also bring solid
            backend experience with Node.js, Java, and Go. With 10 years in the industry, I’ve led
            teams, mentored developers, and shipped products used by millions — from rapid
            prototypes to complex enterprise systems.
          </Typography>
        </Flex>
      </Flex>
    </Flex>
  </Section>
)
