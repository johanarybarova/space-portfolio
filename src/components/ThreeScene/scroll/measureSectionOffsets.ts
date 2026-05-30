import type { SectionOffsets } from '../types'

const initial: SectionOffsets = {
  heroOffset: 0,
  heroHeight: 0,
  contactOffset: Infinity,
}

/** Reads `#hero-section` and `#contact` for scroll choreography. */
export const measureSectionOffsets = (): SectionOffsets => {
  const next: SectionOffsets = { ...initial }

  const heroSection = document.getElementById('hero-section')
  if (heroSection) {
    next.heroOffset = heroSection.getBoundingClientRect().top + window.scrollY
    next.heroHeight = heroSection.getBoundingClientRect().height
  }

  const contactEl = document.getElementById('contact')
  if (contactEl) {
    next.contactOffset = contactEl.getBoundingClientRect().top + window.scrollY
  }

  return next
}
