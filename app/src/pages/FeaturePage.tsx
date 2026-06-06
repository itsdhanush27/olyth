import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import Button from '@/components/Button'

const featureData: Record<string, { title: string; description: string; benefits: string[] }> = {
  'communication-support': {
    title: 'Communication Support',
    description: 'Unified messaging platform with real-time chat, conversation history, internal notes, and team collaboration tools.',
    benefits: [
      'Unified messaging across channels',
      'Real-time chat and notifications',
      'Complete conversation history',
      'Internal notes and collaboration',
      'Team collaboration tools',
      '@mentions and tagging',
      'Activity feeds and updates',
    ],
  },
  'ticket-resolution': {
    title: 'Ticket Resolution',
    description: 'Comprehensive ticket management with creation, auto-assignment, routing rules, SLA tracking, and collision detection.',
    benefits: [
      'Automatic ticket creation',
      'Smart auto-assignment',
      'Advanced routing rules',
      'SLA tracking and alerts',
      'Status tracking and updates',
      'Collision detection',
      'Ticket templates and workflows',
    ],
  },
  'crm-context': {
    title: 'CRM & Customer Context',
    description: 'Build comprehensive customer profiles with interaction history, tags, segmentation, and custom fields for better service.',
    benefits: [
      'Complete customer profiles',
      'Full interaction history',
      'Tags and segmentation',
      'Custom fields and attributes',
      'Reminders and follow-ups',
      'Deal tracking and management',
      'Timeline view of all activities',
    ],
  },
  'automation-intelligence': {
    title: 'Automation Intelligence',
    description: 'AI-powered workflows and automation with multilingual responses, conversation summaries, and intelligent workflow automation.',
    benefits: [
      'AI-powered workflow automation',
      'Workflow automation engine',
      'Multilingual responses',
      'Conversation summaries',
      'Smart routing and prioritization',
      'Automated escalation rules',
      'Conditional logic and branching',
    ],
  },
  'analytics-insights': {
    title: 'Analytics Insights',
    description: 'Comprehensive analytics and reporting with response tracking, team dashboards, CSAT reporting, and channel analytics.',
    benefits: [
      'Response tracking and metrics',
      'Team dashboards and KPIs',
      'CSAT reporting and surveys',
      'Channel analytics',
      'Real-time performance metrics',
      'Custom reports and exports',
      'Trend analysis and insights',
    ],
  },
  'security-control': {
    title: 'Security Control',
    description: 'Enterprise-grade security with role-based access, SSO, audit logs, and data retention controls.',
    benefits: [
      'Role-based access control',
      'Single Sign-On (SSO)',
      'Comprehensive audit logs',
      'Data retention policies',
      'Encryption and data protection',
      'Permission management',
      'Security compliance',
    ],
  },
  'integrations': {
    title: 'Integrations',
    description: 'API access and webhooks for seamless integration with third-party platforms and systems.',
    benefits: [
      'REST API access',
      'Webhook support',
      'Pre-built integrations',
      'Third-party platform integrations',
      'Data synchronization',
      'Real-time data sync',
      'Custom integration development',
    ],
  },
}

export default function FeaturePage() {
  const { featureId } = useParams()
  const navigate = useNavigate()
  const feature = featureData[featureId || '']

  if (!feature) {
    return (
      <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-content mx-auto px-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-orange hover:text-orange-dark transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="text-center">
            <h1 className="font-archivo text-4xl font-light text-charcoal">Feature not found</h1>
            <p className="font-inter text-clay mt-4">The feature you're looking for doesn't exist.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-orange hover:text-orange-dark transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <ScrollFadeIn className="mb-12">
          <h1 className="font-archivo text-[28px] sm:text-[48px] md:text-[64px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.56px] leading-[1.08] mb-4">
            {feature.title}
          </h1>
          <p className="font-inter text-lg text-clay max-w-2xl">
            {feature.description}
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn className="mb-16">
          <div className="bg-white rounded-card p-8 md:p-12">
            <h2 className="font-archivo text-2xl font-medium text-charcoal mb-8">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feature.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                  </div>
                  <p className="font-inter text-base text-charcoal">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn className="text-center">
          <p className="font-inter text-base text-clay mb-6">
            Ready to experience {feature.title}?
          </p>
          <Button onClick={() => navigate('/waitlist')}>
            Get Started
          </Button>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
