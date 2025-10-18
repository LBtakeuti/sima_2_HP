'use client'

import { useEffect, useRef, useState } from 'react'

interface FadeInAnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export default function FadeInAnimation({
  children,
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1
}: FadeInAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}