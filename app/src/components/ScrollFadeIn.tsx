import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ScrollFadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  stagger?: number
}

export default function ScrollFadeIn({
  children,
  className,
  delay = 0,
  y = 40,
  duration = 0.6,
  stagger = 0,
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = stagger > 0 ? ref.current.children : [ref.current]

    // Kill previous tween if it exists
    if (tweenRef.current) {
      tweenRef.current.kill()
    }

    const tween = gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true, // Only animate once to reduce memory usage
        },
      }
    )

    tweenRef.current = tween

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
      }
    }
  }, [delay, y, duration, stagger])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
