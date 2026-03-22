import type { SectionOffsets } from '../types'

const initial: SectionOffsets = {
  michelangeloOffset: Infinity,
  michelangeloHeight: 0,
  contactOffset: Infinity,
  cvFolderOffset: Infinity,
}

/** Reads `#michelangelo-section`, `#contact`, `#cv-folder` for scroll choreography. */
export const measureSectionOffsets = (): SectionOffsets => {
  const next: SectionOffsets = { ...initial }

  const michelangeloSection = document.getElementById('michelangelo-section')
  if (michelangeloSection) {
    next.michelangeloOffset = michelangeloSection.getBoundingClientRect().top + window.scrollY
    next.michelangeloHeight = michelangeloSection.getBoundingClientRect().height
  }

  const contactEl = document.getElementById('contact')
  if (contactEl) {
    next.contactOffset = contactEl.getBoundingClientRect().top + window.scrollY
  }

  const cvFolderEl = document.getElementById('cv-folder')
  if (cvFolderEl) {
    const rect = cvFolderEl.getBoundingClientRect()
    next.cvFolderOffset = rect.top + window.scrollY + rect.height / 2
  }

  return next
}
