'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import cx from 'classnames'

import { Button } from '../Button/Button'
import { Flex } from '../Flex/Flex'
import { Typography } from '../Typography/Typography'
import styles from './Header.module.scss'

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header
      className={cx(styles.header, { [styles.scrolled]: scrolled, [styles.menuOpen]: isMenuOpen })}
    >
      <Flex as='nav' fullWidth itemsCenter justifyBetween className={styles.navigation}>
        <Link href='/' className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
          <Typography as='p' variant='T16Strong' className={cx(styles.logo, styles.cyanText)}>
            Lucas Cizek
          </Typography>
        </Link>

        {/* Burger Button */}
        <button
          className={cx(styles.burger, { [styles.burgerActive]: isMenuOpen })}
          onClick={toggleMenu}
          aria-label='Toggle Menu'
        >
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
          <span className={styles.burgerLine} />
        </button>

        <Flex
          itemsCenter
          gap='var(--gap-lg)'
          className={cx(styles.menu, { [styles.mobileMenuVisible]: isMenuOpen })}
        >
          <Link href='#intro' className={styles.link} onClick={() => setIsMenuOpen(false)}>
            <Typography as='span' variant='T16Soft' className={styles.cyanText}>
              Intro
            </Typography>
          </Link>
          <Link href='#galaxy' className={styles.link} onClick={() => setIsMenuOpen(false)}>
            <Typography as='span' variant='T16Soft' className={styles.cyanText}>
              Galaxy of Roles
            </Typography>
          </Link>
          <Link href='#core' className={styles.link} onClick={() => setIsMenuOpen(false)}>
            <Typography as='span' variant='T16Soft' className={styles.cyanText}>
              Technical Core
            </Typography>
          </Link>
          <Link href='#beyond' className={styles.link} onClick={() => setIsMenuOpen(false)}>
            <Typography as='span' variant='T16Soft' className={styles.cyanText}>
              Beyond
            </Typography>
          </Link>

          <Button
            as={Link}
            href='#contact'
            variant='spark'
            size='md'
            onClick={() => setIsMenuOpen(false)}
          >
            Get in touch
          </Button>
        </Flex>
      </Flex>
    </header>
  )
}
