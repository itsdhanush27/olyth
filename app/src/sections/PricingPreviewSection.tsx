import { useState } from 'react'
import { Check } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'

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
                  'relative bg-white rounded-card p-8 md:p-10 border transition-all duration-300 hover:border-orange/30 hover:shadow-card-hover flex flex-col',
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

                {plan.isThal ? (
                  <div className="mt-3 flex flex-col gap-4">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-archivo text-[36px] font-light text-charcoal tracking-[-1.44px]">
                          ${isAnnual ? '22' : '25'}
                        </span>
                        <span className="font-inter text-sm text-clay">
                          /user/month
                        </span>
                      </div>
                      {isAnnual && (
                        <p className="font-inter text-sm text-clay mt-2">
                          $22/user/month (billed annually)
                        </p>
                      )}
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
                      navigate('/contact')
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
      </div>
    </section>
  )
}
