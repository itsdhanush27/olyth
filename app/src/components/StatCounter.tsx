import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface StatCounterProps {
  value: string
  label: string
  color?: 'orange' | 'teal'
  delay?: number
}

export default function StatCounter({ value, label, color = 'orange', delay = 0 }: StatCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!numberRef.current) return

    // Parse the value to extract number and suffix
    const numericMatch = value.match(/^([0-9,.]+)(.*)$/)
    if (!numericMatch) return

    const targetNum = parseFloat(numericMatch[1].replace(/,/g, ''))
    const suffix = numericMatch[2]
    const hasDecimal = numericMatch[1].includes('.')

    const obj = { val: 0 }

    const tween = gsap.to(obj, {
      val: targetNum,
      duration: 2,
      delay,
      ease: 'expo.out',
      snap: { val: hasDecimal ? 0.1 : 1 },
      scrollTrigger: {
        trigger: numberRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (numberRef.current) {
          const formatted = hasDecimal
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toLocaleString()
          numberRef.current.textContent = formatted + suffix
        }
      },
    })

    // Fade in label after number starts
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: delay + 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: numberRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    return () => {
      tween.kill()
    }
  }, [value, delay])

  return (
    <div className="text-center">
      <span
        ref={numberRef}
        className={cn(
          'font-archivo text-[40px] sm:text-[48px] md:text-[60px] font-light leading-none tracking-[-1.5px] md:tracking-[-2.4px]',
          color === 'orange' ? 'text-orange' : 'text-teal'
        )}
      >
        0
      </span>
      <p ref={labelRef} className="font-inter text-base text-clay mt-3 opacity-0">
        {label}
      </p>
    </div>
  )
}
