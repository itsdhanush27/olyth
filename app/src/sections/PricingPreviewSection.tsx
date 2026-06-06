import { useState } from 'react'
import { Check } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'

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
    subtitle: '',
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
    subtitle: '',
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
    subtitle: '',
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

export default function PricingPreviewSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const navigate = useNavigate()

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center">
          <SectionLabel text="PRICING" />
          <h2 className="font-archivo text-[28px] md:text-[36px] font-light text-charcoal tracking-[-1.44px] leading-[40px] mt-4">
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-pill p-1 mt-6">
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

        <ScrollFadeIn stagger={0.1} className="mt-12">
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
                {/* Badge */}
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
                  onClick={() => navigate(plan.name === 'Olyth Enterprise' ? '/contact' : '/waitlist')}
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

        {/* Thal Platform Access Note */}
        <div className="text-center mt-8">
          <p className="font-inter text-sm text-clay">
            Thal Platform Access: +$25/month - Unlock the full AI engine with API actions, advanced RAG, and custom model training.{" "}
            <button className="font-medium text-orange hover:underline">
              Learn more about Thal
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
