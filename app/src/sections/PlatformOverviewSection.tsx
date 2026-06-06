import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import { MessageSquare, Brain, TicketCheck, BarChart3, BookOpen, Users } from 'lucide-react'

const modules = [
  {
    icon: MessageSquare,
    name: 'Omnichannel Support',
    description: 'Unify WhatsApp, email, voice, and social into one intelligent inbox.',
  },
  {
    icon: Brain,
    name: 'AI Agent - Thal',
    description: 'Autonomous issue resolution with human-like conversations and memory.',
  },
  {
    icon: TicketCheck,
    name: 'Ticket Management',
    description: 'Smart routing, prioritization, and tracking from intake to resolution.',
  },
  {
    icon: BarChart3,
    name: 'Analytics & Insights',
    description: 'Real-time dashboards, CSAT tracking, and predictive support metrics.',
  },
  {
    icon: BookOpen,
    name: 'Knowledge Base',
    description: 'AI-powered self-service with RAG-driven answers from your content.',
  },
  {
    icon: Users,
    name: 'Customer Engagement',
    description: 'Proactive outreach, campaigns, and lifecycle messaging at scale.',
  },
]

export default function PlatformOverviewSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn>
          <SectionLabel text="PLATFORM" />
          <h2 className="font-archivo text-[28px] md:text-[36px] font-light text-charcoal tracking-[-1.44px] leading-[40px] max-w-[600px] mt-4">
            One platform. Every channel. Every customer.
          </h2>
        </ScrollFadeIn>

        <ScrollFadeIn stagger={0.1} className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.name}
                className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center mb-5 group-hover:bg-orange/20 transition-colors duration-300">
                  <module.icon size={22} className="text-orange" />
                </div>
                <h3 className="font-archivo text-[22px] font-medium text-charcoal tracking-[-0.44px]">
                  {module.name}
                </h3>
                <p className="font-inter text-sm text-clay mt-2 leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
