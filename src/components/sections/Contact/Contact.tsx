'use client'

import { Button } from '@/src/components/shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { useForm, FormProvider } from 'react-hook-form'
import { Input } from '@/src/components/shared/Input/Input'
import { Textarea } from '@/src/components/shared/Textarea/Textarea'
import styles from './Contact.module.scss'

type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export const Contact = () => {
  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = (data: ContactFormValues) => {
    console.log(data)
  }

  return (
  <Section id='contact'>
    <Flex flexCol fullWidth className={styles.container}>
      <Flex flexCol fullWidth className={styles.textContentWrapper}>
        <div className={styles.headerGroup}>
          <SectionHeadings
            headline='Let’s create, together'
            subheadline='Start a Conversation'
            className={styles.sectionHeadings}
          />
        </div>

        <Flex flexCol fullWidth className={styles.bottomContent}>
          <FormProvider {...methods}>
            <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
              <Flex className={styles.fieldGroup}>
                <Input name='name' label='Name' isRequired />
                <Input name='email' label='Email' type='email' isRequired />
              </Flex>

              <Input name='subject' label='Subject' isRequired />

              <Textarea name='message' label='Message' isRequired />

              <Button type='submit' variant='spark' className={styles.submitButton}>
                Send Message
              </Button>
            </form>
          </FormProvider>
        </Flex>
      </Flex>
    </Flex>
  </Section>
  )
}
