import { useState } from 'react'
import { Check } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'
import { useScrollToTop } from '@/hooks/useScrollToTop'

interface Plan {
  name: string
  monthlyPrice?: number
  annualPrice?: number
  period?: string
  subtitle?: string
  subtitleColor?: string
  features: string[]
  cta: string
  ctaVariant: 'primary' | 'secondary'
  highlighted: boolean
  isThal?: boolean
}

const plans: Plan[] = [
  {
    name: 'Basic',
    monthlyPrice: 19,
    annualPrice: 17,
    period: '/month',
    features: [
      'Omnichannel Inbox – All channels (WhatsApp, email, social, SMS)',
      'Shared email inbox',
      'Website live chat',
      'Ticketing',
      'Canned/saved replies',
      'Basic contact list (name, email, tags)',
      'Real-time performance dashboard',
      'Basic analytics + monthly CSAT summary',
      'Priority email support',
      'AI perks included (Thal, Free replies)',
      '1-year data retention',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
    highlighted: false,
  },
  {
    name: 'Professional',
    monthlyPrice: 39,
    annualPrice: 35,
    period: '/month',
    features: [
      'All in Basic, plus',
      'Light CRM (invoices, contracts, proforma, reminders)',
      'Shared work drive & team creation',
      'In platform payment integration (M-pesa, Stripe, Flutterwave)',
      'Workflow automation builder (rules & triggers)',
      'SLA policies & breach alerts',
      'Full custom analytics & CSAT reports',
      'Auto-assignment (round-robin and load balancing)',
      'Internal notes & Collision detection (see who\'s replying)',
      'Support portal with 24/7 priority email support',
      'AI perks included (Thal, Free replies)',
      '3-year data retention',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 88,
    annualPrice: 80,
    period: '/month',
    features: [
      'All in Professional, plus',
      'HIPAA & GDPR compliance options',
      'White-label (custom domain & branding)',
      'Role-based access control (RBAC)',
      'Multi-brand / multi-inbox management',
      'Skills-based routing',
      'Advanced AI perks & triage with sentiment scoring',
      'AI conversation quality scoring (QA)',
      'Custom API access & webhooks',
      'Sandbox / staging environment',
      'Dedicated account manager',
      '5-year data retention & Audit trail',
    ],
    cta: 'Talk to Sales',
    ctaVariant: 'secondary' as const,
    highlighted: false,
  },
  {
    name: 'Thal (AI Add-on)',
    features: [
      'Only pay for resolutions when conversations/tickets are resolved',
      'Auto-responds across all omnichannel inbox',
      'Auto-draft reply suggestions for agents',
      'Auto-adds leads to integrated CRM or our light CRM',
      'Tags & rates conversations',
      'Routes conversations by keyword to department or person',
      'In-platform AI assistant',
      'Multilingual auto-response (detect & reply in customer\'s language)',
      'AI conversation summaries for handoffs',
      'Proactive outbound nudges (re-engagement)',
    ],
    cta: 'Learn More',
    ctaVariant: 'primary' as const,
    highlighted: false,
    isThal: true,
  },
]

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, and local payment methods for emerging markets including M-Pesa and Flutterwave.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes! All plans include a 14-day free trial with no credit card required.',
  },
  {
    q: 'What is the Thal Platform Access add-on?',
    a: 'For $25/month, unlock the full Thal AI engine with API actions, advanced RAG capabilities, and custom model training.',
  },
]

export default function Pricing() {
  useScrollToTop()
  
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showCalendly, setShowCalendly] = useState(false)
  const navigate = useNavigate()

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center mb-12">
          <SectionLabel text="PRICING" />
          <h1 className="font-archivo text-[28px] sm:text-[36px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] mt-4">
            Simple, transparent pricing
          </h1>
          <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
            Choose the plan that fits your team. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-pill p-1 mt-8 border border-gray-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                'px-5 py-2 rounded-pill font-inter text-sm font-medium transition-all duration-300',
                !isAnnual ? 'bg-orange text-white' : 'text-clay hover:text-charcoal'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                'px-5 py-2 rounded-pill font-inter text-sm font-medium transition-all duration-300',
                isAnnual ? 'bg-orange text-white' : 'text-clay hover:text-charcoal'
              )}
            >
              Annual (Save 10%)
            </button>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn stagger={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative bg-white rounded-card p-8 md:p-10 border transition-all duration-300 hover:border-orange/30 hover:shadow-card-hover flex flex-col',
                  plan.highlighted
                    ? 'border-2 border-orange shadow-card'
                    : 'border border-gray-200'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-br from-orange to-orange-dark text-white font-inter text-[10px] font-medium uppercase tracking-[1px] whitespace-nowrap">
                    MOST POPULAR
                  </span>
                )}

                <p className="font-archivo text-[22px] font-medium text-charcoal">
                  {plan.name}
                </p>

                {plan.isThal ? (
                  <div className="mt-3 flex flex-col gap-4">
                    <div>
                      <p className="font-inter text-[10px] font-semibold uppercase tracking-[1.5px] text-clay">
                        Platform Access
                      </p>
                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="font-archivo text-[36px] font-light text-charcoal tracking-[-1.44px]">
                          ${isAnnual ? '22' : '25'}
                        </span>
                        <span className="font-inter text-sm text-clay">
                          /user/mo
                        </span>
                      </div>
                      <p className="font-inter text-xs text-clay mt-1">
                        {isAnnual ? 'when paid annually' : 'when paid monthly'}
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <p className="font-inter text-[10px] font-semibold uppercase tracking-[1.5px] text-clay">
                        Resolution Pricing
                      </p>
                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="font-archivo text-[24px] font-light text-charcoal tracking-[-0.96px]">$1</span>
                        <span className="font-inter text-xs text-clay">per resolution</span>
                      </div>
                      <p className="font-inter text-[11px] text-teal mt-1 font-medium">
                        Volume discounts available
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="font-archivo text-[36px] font-light text-charcoal tracking-[-1.44px]">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="font-inter text-sm text-clay">
                        {plan.period}
                      </span>
                    </div>

                    {plan.subtitle && (
                      <p className={cn('font-inter text-sm mt-2', plan.subtitleColor)}>
                        {plan.subtitle}
                      </p>
                    )}

                    {isAnnual && plan.monthlyPrice && plan.monthlyPrice > 0 && (
                      <p className="font-inter text-sm text-clay mt-2">
                        ${plan.annualPrice}/month (billed annually)
                      </p>
                    )}
                  </>
                )}

                <ul className="flex flex-col gap-3 mt-6 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={16} className="text-teal shrink-0 mt-0.5" />
                      <span className="font-inter text-sm text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  fullWidth
                  onClick={() => {
                    if (plan.isThal) {
                      navigate('/products/olyth-ai')
                    } else if (plan.name === 'Enterprise') {
                      // Open Calendly widget
                      setShowCalendly(true)
                    } else {
                      navigate('/waitlist')
                    }
                  }}
                  className={cn(
                    plan.ctaVariant === 'secondary' && '!border-charcoal !text-charcoal hover:!bg-charcoal hover:!text-white'
                  )}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </ScrollFadeIn>

        {/* FAQ */}
        <ScrollFadeIn className="mt-20">
          <h2 className="font-archivo text-[28px] font-light text-charcoal tracking-[-1.12px] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between"
                >
                  <span className="font-inter text-sm font-medium text-charcoal">{faq.q}</span>
                  <span className={`text-charcoal transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="font-inter text-sm text-clay leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>

      {/* Calendly Inline Widget Modal */}
      {showCalendly && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowCalendly(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl h-[90vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 5L5 15M5 5L15 15"/>
              </svg>
            </button>
            <iframe
              src="https://calendly.com/olyth"
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded-lg"
              title="Schedule a meeting"
            />
          </div>
        </div>
      )}
    </main>
  )
}
