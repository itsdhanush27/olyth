import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, X } from 'lucide-react'
import Button from '@/components/Button'
import { useNavigate } from 'react-router'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [videoOpen, setVideoOpen] = useState(false)
  const navigate = useNavigate()

  // Hero entrance animation on mount
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      subRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      dashboardRef.current,
      { opacity: 0, y: 40, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.2'
    )

    return () => { tl.kill() }
  }, [])

  // Parallax on scroll - optimized with reduced scrub
  useEffect(() => {
    if (!imageRef.current || !heroRef.current) return

    const tween = gsap.to(imageRef.current, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5, // Reduced from true for better performance
      },
    })

    return () => { tween.kill() }
  }, [])

  // Video modal close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translateY(0)' }}
      >
        <img
          src="./assets/hero-bg.jpg"
          alt="Hero background"
          className="w-full h-[130%] object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(37, 34, 34, 0.8) 0%, rgba(37, 34, 34, 0.6) 50%, rgba(37, 34, 34, 0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-24 md:pt-32 pb-16 max-w-[900px] mx-auto">
        <h1
          ref={headlineRef}
          className="font-archivo text-[32px] sm:text-[48px] md:text-[74px] font-light text-white leading-[1.08] tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.96px] opacity-0"
          style={{ textShadow: '0px 2px 8px rgba(37, 34, 34, 0.3)' }}
        >
          Unified Customer Support Platform for Emerging Markets
        </h1>

        <p
          ref={subRef}
          className="font-inter text-base sm:text-lg text-white/85 max-w-[640px] mx-auto mt-4 sm:mt-6 opacity-0"
        >
          Powered by Thal, an operational AI brain that automates customer support, issue resolution, and escalation across every channel - WhatsApp, email, voice, and social.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
          <Button onClick={() => navigate('/waitlist')}>
            Get Started
          </Button>
          <Button
            variant="secondary"
            className="!text-white !border-white hover:!bg-white hover:!text-charcoal"
            onClick={() => navigate('/contact')}
          >
            Talk To Sales
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div
          ref={dashboardRef}
          className="mt-16 max-w-[960px] mx-auto opacity-0 animate-float"
        >
          <div className="rounded-xl overflow-hidden shadow-dashboard">
            <img
              src="./assets/dashboard-mockup-brand.png"
              alt="Olyth Dashboard Preview"
              className="w-full h-auto"
            />
          </div>

          {/* View Demo Button */}
          <button
            onClick={() => setVideoOpen(true)}
            className="mt-6 inline-flex items-center gap-2 font-inter text-sm font-medium text-white/90 hover:text-white transition-colors duration-300 group"
          >
            <span className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white transition-colors duration-300">
              <Play size={16} className="ml-0.5" />
            </span>
            View Demo
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="absolute inset-0 bg-charcoal/50" />
          <div
            className="relative bg-charcoal rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <div className="aspect-video bg-charcoal flex items-center justify-center">
              <div className="text-center text-white/60">
                <Play size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-inter text-lg">Demo Video Coming Soon</p>
                <p className="font-inter text-sm mt-2 opacity-60">Experience the power of Olyth</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
