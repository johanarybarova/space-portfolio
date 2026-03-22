'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

type CounterProps = {
  value: string
  className?: string
  duration?: number
}

type ParsedCounterValue = {
  isNumeric: boolean
  target: number
  suffix: string
  decimals: number
  raw: string
}

const COUNTER_VALUE_REGEX = /^([+-]?\d+(?:\.\d+)?)(.*)$/

const parseCounterValue = (value: string): ParsedCounterValue => {
  const match = value.match(COUNTER_VALUE_REGEX)
  if (!match) {
    return {
      isNumeric: false,
      target: 0,
      suffix: '',
      decimals: 0,
      raw: value,
    }
  }

  const numericToken = match[1]
  const suffix = match[2] ?? ''
  const decimals = numericToken.includes('.') ? numericToken.split('.')[1].length : 0

  return {
    isNumeric: true,
    target: Number(numericToken),
    suffix,
    decimals,
    raw: value,
  }
}

export const Counter = ({ value, className, duration = 2.5 }: CounterProps) => {
  const counterRef = useRef<HTMLSpanElement>(null)
  const parsedValue = useMemo(() => parseCounterValue(value), [value])

  useEffect(() => {
    const element = counterRef.current
    if (!element) {
      return
    }

    if (!parsedValue.isNumeric) {
      element.textContent = parsedValue.raw
      return
    }

    let tween: gsap.core.Tween | null = null
    const state = { current: 0 }
    const formatValue = () => {
      if (parsedValue.decimals > 0) {
        return state.current.toFixed(parsedValue.decimals)
      }
      return String(Math.round(state.current))
    }
    const updateText = () => {
      element.textContent = `${formatValue()}${parsedValue.suffix}`
    }

    updateText()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        observer.disconnect()
        tween = gsap.to(state, {
          current: parsedValue.target,
          duration,
          ease: 'power3.out',
          onUpdate: updateText,
          onComplete: updateText,
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (tween) {
        tween.kill()
      }
    }
  }, [duration, parsedValue])

  const initialDisplay = parsedValue.isNumeric ? `0${parsedValue.suffix}` : value

  return (
    <span ref={counterRef} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {initialDisplay}
    </span>
  )
}
