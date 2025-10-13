import '@/styles/globals.scss'
import { Header } from '@/src/components/shared/Header/Header'
import { ReactNode } from 'react'
import { Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lukáš Čížek | Senior Full-Stack Engineer | Team Leader',
  description:
    'I’m a seasoned full-stack engineer with a strong frontend focus, specializing in React, TypeScript, and building fast, accessible, and scalable web apps',
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en' className={spaceGrotesk.variable}>
    <head>
      <meta charSet='UTF-8' />
      <link rel='icon' type='image/svg+xml' href='favicon.svg' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Lukáš Čížek | Senior Full-Stack Engineer | Team Leader</title>
    </head>
    <body>
      <Header />
      {children}
    </body>
  </html>
)

export default RootLayout
