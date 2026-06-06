import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '@/components/Button'
import { useNavigate } from 'react-router'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function CTAWaveSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!contentRef.current || !sectionRef.current) return

    const contentTween = gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      contentTween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-white border-t border-gray-100 py-28 md:py-36">
      <div
        ref={contentRef}
        className="max-w-[680px] mx-auto text-center px-5"
      >
        {/* Orange accent line */}
        <div className="w-12 h-1 rounded-full bg-orange mx-auto mb-8" />

        <h2 className="font-archivo text-[32px] md:text-[52px] font-light text-charcoal tracking-[-2.08px] leading-[1.06]">
          Ready to transform your customer support?
        </h2>
        <p className="font-inter text-base text-clay mt-5 max-w-[480px] mx-auto">
          Get started and be among the first to experience Olyth. No credit card required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => navigate('/waitlist')}>
            Get Started
          </Button>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 font-inter text-sm font-medium text-charcoal hover:text-orange transition-colors duration-300 group"
          >
            Talk to sales
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  )
}
