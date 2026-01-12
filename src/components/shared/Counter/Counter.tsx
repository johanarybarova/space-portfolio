'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CounterProps {
  value: string
  className?: string
  duration?: number
}

export const Counter = ({ value, className, duration = 2.5 }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Extract number and suffix inside effect to handle hydration gracefully if needed,
    // though doing it in render is fine too.
    const match = value.match(/([\d\.]+)(.*)/)
    // Handle floats if needed, though stats usually int here. "100" -> 100.
    const numberPart = match ? parseFloat(match[1]) : 0
    const suffix = match ? match[2] : value

    // Check if it's actually a number to animate
    if (isNaN(numberPart)) {
      element.textContent = value
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const proxy = { val: 0 }
          gsap.to(proxy, {
            val: numberPart,
            duration: duration,
            ease: 'power3.out', // Slightly less extreme than power4
            onUpdate: () => {
              if (ref.current) {
                // Determine decimals
                const isFloat = match?.[1].includes('.')
                // Use Math.round() or toFixed(0) for integers to avoid hanging at 99 for too long (e.g. 99.9 -> 100)
                const current = isFloat ? proxy.val.toFixed(1) : Math.round(proxy.val)
                ref.current.textContent = `${current}${suffix}`
              }
            },
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [value, duration])

  // Initial render: 0 + suffix? Or just 0?
  // Let's start with 0 + suffix to keep layout width somewhat consistent if suffix is long
  const match = value.match(/([\d\.]+)(.*)/)
  const suffix = match ? match[2] : ''

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }} // Prevent jitter
    >
      {value}
    </span>
  )
}

