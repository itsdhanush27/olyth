import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import Button from '@/components/Button'

const productData: Record<string, { title: string; description: string; features: string[] }> = {
  'olyth-ai': {
    title: 'Thal (AI add-on)',
    description: 'AI automation across all modules with smart replies, smart routing, multilingual responses, and sentiment detection. Includes in-platform assistant, agentic AI via APIs, memory, and RAG capabilities.',
    features: [
      'AI automation across modules',
      'Smart replies and suggestions',
      'Smart routing and assignment',
      'Conversation summaries',
      'Multilingual responses',
      'Sentiment detection',
      'In-platform AI assistant',
      'Agentic AI via APIs',
      'Memory and context retention',
      'RAG (Retrieval-Augmented Generation)',
    ],
  },
  'omnichannel': {
    title: 'Omnichannel Inbox',
    description: 'Unify every customer channel into a single intelligent workspace. Manage WhatsApp, Email, Chat, Social Media, and more from one place.',
    features: [
      'WhatsApp Business API integration',
      'Email and chat support',
      'Social media channels',
      'Unified conversation view',
      'Smart routing and assignment',
      'Real-time notifications',
      'Team collaboration tools',
    ],
  },
  'ticketing': {
    title: 'Tickets',
    description: 'Smart ticket management system with intelligent routing, prioritization, and tracking for efficient issue resolution.',
    features: [
      'Automatic ticket creation',
      'Smart routing based on skills',
      'Priority-based queuing',
      'SLA tracking',
      'Ticket templates',
      'Bulk operations',
      'Custom fields and workflows',
    ],
  },
  'live-chat': {
    title: 'Website Live Chat',
    description: 'Real-time customer support directly on your website. Engage visitors and convert them into customers.',
    features: [
      'Customizable chat widget',
      'Visitor tracking',
      'Proactive chat invitations',
      'Chat history and transcripts',
      'Canned responses',
      'Mobile responsive',
      'Analytics and reporting',
    ],
  },
  'crm': {
    title: 'Basic CRM',
    description: 'Lightweight customer relationship management built into your support platform. Track interactions and build stronger relationships.',
    features: [
      'Customer profiles',
      'Interaction history',
      'Contact management',
      'Deal tracking',
      'Activity timeline',
      'Custom fields',
      'Integration with support tickets',
    ],
  },
  'work-drive': {
    title: 'Shared Work Drive',
    description: 'Collaborative workspace for your team to share documents, notes, and resources securely.',
    features: [
      'File storage and sharing',
      'Real-time collaboration',
      'Version control',
      'Access permissions',
      'Search functionality',
      'Integration with tickets',
      'Audit logs',
    ],
  },
  'knowledge-hub': {
    title: 'Knowledge Hub',
    description: 'Self-service knowledge base powered by AI. Help customers find answers instantly and reduce support tickets.',
    features: [
      'AI-powered search',
      'Article management',
      'Category organization',
      'Customer ratings',
      'Analytics on article usage',
      'Multi-language support',
      'SEO optimization',
    ],
  },
  'help-centre': {
    title: 'Help Centre',
    description: 'Comprehensive help and support resources for your customers. Reduce support load with self-service options.',
    features: [
      'FAQ management',
      'Documentation',
      'Video tutorials',
      'Community forums',
      'Search functionality',
      'Feedback collection',
      'Analytics',
    ],
  },
  'thal': {
    title: 'Thal',
    description: 'Autonomous AI agent that resolves customer issues without human intervention. Available 24/7 for instant support.',
    features: [
      'Natural language understanding',
      'Autonomous issue resolution',
      'Contextual memory',
      'API actions in conversations',
      'Escalation to humans when needed',
      'Learning from interactions',
      'Multi-language support',
    ],
  },
}

export default function ProductPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const product = productData[productId || '']

  if (!product) {
    return (
      <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-content mx-auto px-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-orange hover:text-orange-dark transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="text-center">
            <h1 className="font-archivo text-4xl font-light text-charcoal">Product not found</h1>
            <p className="font-inter text-clay mt-4">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-orange hover:text-orange-dark transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <ScrollFadeIn className="mb-12">
          <h1 className="font-archivo text-[48px] md:text-[64px] font-light text-charcoal tracking-[-2.56px] leading-[1.08] mb-4">
            {product.title}
          </h1>
          <p className="font-inter text-lg text-clay max-w-2xl">
            {product.description}
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn className="mb-16">
          <div className="bg-white rounded-card p-8 md:p-12">
            <h2 className="font-archivo text-2xl font-medium text-charcoal mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-teal" />
                  </div>
                  <p className="font-inter text-base text-charcoal">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn className="text-center">
          <p className="font-inter text-base text-clay mb-6">
            Ready to get started with {product.title}?
          </p>
          <Button onClick={() => navigate('/waitlist')}>
            Get Started
          </Button>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
