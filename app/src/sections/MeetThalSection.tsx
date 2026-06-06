import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { Brain, Zap, Database, Plug, Clock, MessageSquare } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    icon: Brain,
    name: 'Intelligent Triage',
    description: 'Detects intent, sentiment, and language in real-time to route every conversation to the right destination.',
  },
  {
    icon: Zap,
    name: 'Agentic AI',
    description: 'End-to-end issue resolution with autonomous decision-making. No scripts, no rigid flows.',
  },
  {
    icon: Database,
    name: 'RAG Powered',
    description: 'Accesses documents, help centers, knowledge bases, previous conversations, and external sources for grounded answers.',
  },
  {
    icon: Plug,
    name: 'API Actions',
    description: 'Executes actions via APIs - update records, trigger workflows, create tickets, all within the conversation.',
  },
  {
    icon: Clock,
    name: 'Contextual Memory',
    description: 'Remembers every customer interaction, preference, and history. Conversations feel continuous, never repetitive.',
  },
  {
    icon: MessageSquare,
    name: 'Human-like Conversations',
    description: 'No predefined scripts. Thal adapts its tone, language, and approach to each customer naturally.',
  },
]

export default function MeetThalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const cards = cardsRef.current.children
    const tweens: gsap.core.Tween[] = []

    Array.from(cards).forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
      tweens.push(tween)

      gsap.to(card, {
        y: -6,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      })
    })

    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 md:py-24 border-y border-gray-100">
      <div className="max-w-content mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="AI ENGINE" color="teal" />
          <h2 className="font-archivo text-[28px] sm:text-[36px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] max-w-[800px] mx-auto mt-4">
            Meet Thal
            <br />
            The Operational Brain Behind Olyth
          </h2>
          <p className="font-inter text-base text-clay max-w-[640px] mx-auto mt-4 sm:mt-6">
            Thal doesn't just respond — it understands, decides, and resolves. Every conversation is context-aware, every action is autonomous, every escalation is intelligent.
          </p>
        </div>

        {/* Capability Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              className="bg-white border border-gray-100 rounded-card p-8 shadow-card hover:shadow-card-hover hover:border-orange/20 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-5">
                <cap.icon size={22} className="text-teal" />
              </div>
              <h3 className="font-archivo text-[20px] font-medium text-charcoal tracking-[-0.4px]">
                {cap.name}
              </h3>
              <p className="font-inter text-sm text-clay mt-3 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button onClick={() => {}}>
            See Thal in Action
          </Button>
        </div>
      </div>
    </section>
  )
}
