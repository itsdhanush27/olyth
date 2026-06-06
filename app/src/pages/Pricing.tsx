import { useState } from 'react'
import { Check } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'
import { useScrollToTop } from '@/hooks/useScrollToTop'

const plans = [
  {
    name: 'Free Trial',
    monthlyPrice: 0,
    annualPrice: 0,
    period: '/14 days',
    subtitle: 'No credit card required',
    subtitleColor: 'text-teal',
    features: [
      'Full platform access',
      'All channels included',
      'Thal AI assistant',
      'Up to 500 conversations',
      'Basic analytics',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
    highlighted: false,
  },
  {
    name: 'Olyth Basic',
    monthlyPrice: 19,
    annualPrice: 17,
    period: '/month',
    features: [
      'Omnichannel inbox',
      'Ticket management',
      'Knowledge base',
      'Basic automation',
      'Email + chat support',
      'Up to 3 team members',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
    highlighted: false,
  },
  {
    name: 'Olyth Professional',
    monthlyPrice: 39,
    annualPrice: 35,
    period: '/month',
    features: [
      'Everything in Basic',
      'Thal AI with full memory',
      'Advanced automation',
      'Workflow builder',
      'Priority support',
      'Up to 10 team members',
      'Custom reports',
    ],
    cta: 'Get Started',
    ctaVariant: 'primary' as const,
    highlighted: true,
  },
  {
    name: 'Olyth Enterprise',
    monthlyPrice: 88,
    annualPrice: 80,
    period: '/month',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
      'Advanced analytics',
      'On-premise option',
    ],
    cta: 'Talk to Sales',
    ctaVariant: 'secondary' as const,
    highlighted: false,
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
    <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center mb-12">
          <SectionLabel text="PRICING" />
          <h1 className="font-archivo text-[36px] md:text-[60px] font-light text-charcoal tracking-[-2.4px] leading-[1.07] mt-4">
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
                  'relative bg-white rounded-card p-8 md:p-10 border transition-all duration-300 hover:border-orange/30 hover:shadow-card-hover',
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

                {isAnnual && plan.monthlyPrice > 0 && (
                  <p className="font-inter text-sm text-clay mt-2">
                    ${plan.annualPrice}/month (billed annually)
                  </p>
                )}

                <ul className="flex flex-col gap-3 mt-6 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check size={16} className="text-teal shrink-0" />
                      <span className="font-inter text-sm text-charcoal">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  fullWidth
                  onClick={() => {
                    if (plan.name === 'Olyth Enterprise') {
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

        {/* Thal Add-on */}
        <ScrollFadeIn className="mt-8">
          <div className="bg-white rounded-card p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-archivo text-lg font-medium text-charcoal">
                Thal Platform Access
              </p>
              <p className="font-inter text-sm text-clay mt-1">
                Unlock the full AI engine with API actions, advanced RAG, and custom model training.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-archivo text-2xl font-light text-charcoal">+$25<span className="text-sm text-clay">/mo</span></span>
              <Button onClick={() => navigate('/waitlist')}>
                Get Started
              </Button>
            </div>
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
