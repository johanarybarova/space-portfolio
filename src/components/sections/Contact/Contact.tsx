'use client'

import { Button } from '../../shared/Button/Button'
import { Flex } from '@/src/components/shared/Flex/Flex'
import { Section } from '@/src/components/shared/Section/Section'
import { SectionHeadings } from '@/src/components/shared/SectionHeadings/SectionHeadings'
import { useEffect, useRef } from 'react'
import styles from './Contact.module.scss'

export const Contact = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // #region agent log
    const log = (msg: string, data: any, hypothesisId: string) => {
      fetch('http://127.0.0.1:7242/ingest/31e3a560-8076-4857-afd4-675f51922a4c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'Contact.tsx:useEffect',
          message: msg,
          data,
          timestamp: Date.now(),
          sessionId: 'debug-session',
          hypothesisId,
        }),
      }).catch(() => {})
    }
    // #endregion

    const measure = () => {
      if (textareaRef.current && nameRef.current) {
        const textRect = textareaRef.current.getBoundingClientRect()
        const textStyle = window.getComputedStyle(textareaRef.current)
        const nameRect = nameRef.current.getBoundingClientRect()
        const nameStyle = window.getComputedStyle(nameRef.current)

        const textWrapper = textareaRef.current.parentElement
        const nameWrapper = nameRef.current.parentElement

        if (textWrapper && nameWrapper) {
          const twRect = textWrapper.getBoundingClientRect()
          const nwRect = nameWrapper.getBoundingClientRect()

          log(
            'Measurement: Textarea vs Name',
            {
              textarea: {
                height: textRect.height,
                display: textStyle.display,
                verticalAlign: textStyle.verticalAlign,
                wrapperHeight: twRect.height,
                diff: twRect.height - textRect.height,
              },
              name: {
                height: nameRect.height,
                display: nameStyle.display,
                verticalAlign: nameStyle.verticalAlign,
                wrapperHeight: nwRect.height,
                diff: nwRect.height - nameRect.height,
              },
            },
            'A'
          )
        }
      }
    }

    measure()
    window.addEventListener('resize', measure)

    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <Section id='contact'>
      <Flex flexCol fullWidth className={styles.container}>
        <Flex flexCol fullWidth className={styles.textContentWrapper}>
          <div className={styles.headerGroup}>
            <SectionHeadings headline='Contact' subheadline='Start a Conversation' />
          </div>

          <Flex flexCol fullWidth className={styles.bottomContent}>
            <form className={styles.form}>
              <div className={styles.fieldGroup}>
                <div className={styles.inputWrapper}>
                  <input
                    ref={nameRef}
                    type='text'
                    id='name'
                    placeholder=' '
                    className={styles.input}
                    required
                  />
                  <label htmlFor='name' className={styles.label}>
                    Name
                  </label>
                  <div className={styles.focusLine} />
                </div>
                <div className={styles.inputWrapper}>
                  <input
                    type='email'
                    id='email'
                    placeholder=' '
                    className={styles.input}
                    required
                  />
                  <label htmlFor='email' className={styles.label}>
                    Email
                  </label>
                  <div className={styles.focusLine} />
                </div>
              </div>

              <div className={styles.inputWrapper}>
                <input type='text' id='subject' placeholder=' ' className={styles.input} required />
                <label htmlFor='subject' className={styles.label}>
                  Subject
                </label>
                <div className={styles.focusLine} />
              </div>

              <div className={styles.inputWrapper}>
                <textarea
                  ref={textareaRef}
                  id='message'
                  placeholder=' '
                  className={styles.textarea}
                  rows={4}
                  required
                />
                <label htmlFor='message' className={styles.label}>
                  Message
                </label>
                <div className={styles.focusLine} />
              </div>

              <Button type='submit' variant='spark' size='md' className={styles.submitButton}>
                Send Message
              </Button>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </Section>
  )
}
