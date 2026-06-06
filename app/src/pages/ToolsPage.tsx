import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import Button from '@/components/Button'

const toolsData: Record<string, { title: string; description: string; features: string[] }> = {
  'workdrive': {
    title: 'Workdrive',
    description: 'Team file storage and collaboration workspace. Share documents, notes, and resources securely with your team and customers.',
    features: [
      'File storage and sharing',
      'Real-time collaboration',
      'Version control',
      'Access permissions management',
      'Search functionality',
      'Integration with tickets',
      'Audit logs',
      'Customer file sharing',
    ],
  },
  'live-chat': {
    title: 'Website Live Chat',
    description: 'Real-time customer support directly on your website. Engage visitors instantly and convert them into customers.',
    features: [
      'Customizable chat widget',
      'Visitor tracking',
      'Proactive chat invitations',
      'Chat history and transcripts',
      'Canned responses',
      'Mobile responsive design',
      'Analytics and reporting',
      'Integration with support team',
    ],
  },
  'help-centre': {
    title: 'Help Centre',
    description: 'Comprehensive self-service support portal for your customers. Reduce support load with FAQs, guides, and ticket submission.',
    features: [
      'FAQ management',
      'Article documentation',
      'Video tutorials',
      'Community forums',
      'Advanced search functionality',
      'Customer feedback collection',
      'Usage analytics',
      'Multi-language support',
    ],
  },
  'knowledge-hub': {
    title: 'Knowledge Hub',
    description: 'Internal knowledge system powered by AI. Help your team find answers instantly with AI-powered search and accessible content.',
    features: [
      'AI-powered search',
      'Article management',
      'Category organization',
      'Customer ratings',
      'Analytics on article usage',
      'Multi-language support',
      'SEO optimization',
      'Process guide documentation',
    ],
  },
}

export default function ToolsPage() {
  const { toolId } = useParams()
  const navigate = useNavigate()
  const tool = toolsData[toolId || '']

  if (!tool) {
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
            <h1 className="font-archivo text-4xl font-light text-charcoal">Tool not found</h1>
            <p className="font-inter text-clay mt-4">The tool you're looking for doesn't exist.</p>
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
            {tool.title}
          </h1>
          <p className="font-inter text-lg text-clay max-w-2xl">
            {tool.description}
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn className="mb-16">
          <div className="bg-white rounded-card p-8 md:p-12">
            <h2 className="font-archivo text-2xl font-medium text-charcoal mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.features.map((feature) => (
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
            Ready to get started with {tool.title}?
          </p>
          <Button onClick={() => navigate('/waitlist')}>
            Get Started
          </Button>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
