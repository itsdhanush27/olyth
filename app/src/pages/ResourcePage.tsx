import { useParams, useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import Button from '@/components/Button'

const resourceData: Record<string, { title: string; description: string; content: string[] }> = {
  'about-us': {
    title: 'About Us',
    description: 'Learn about Olyth\'s mission to revolutionize customer support for emerging markets.',
    content: [
      'Olyth is building the next generation of customer support platform designed specifically for emerging markets.',
      'We understand the unique challenges faced by businesses in Africa, Asia, and Latin America.',
      'Our platform combines powerful automation with local market expertise to deliver exceptional customer support.',
      'Founded by a team of customer support and AI experts, we\'re committed to making world-class support accessible to everyone.',
      'We believe that great customer support should be affordable, easy to use, and culturally relevant.',
    ],
  },
  'careers': {
    title: 'Careers',
    description: 'Join our growing team and help us revolutionize customer support.',
    content: [
      'We\'re hiring talented individuals who are passionate about customer support and emerging markets.',
      'Our team is distributed across multiple continents, working together to build the future of support.',
      'We offer competitive compensation, flexible work arrangements, and opportunities for growth.',
      'Whether you\'re an engineer, designer, marketer, or support specialist, we\'d love to hear from you.',
      'Check out our careers page for current openings and apply today.',
    ],
  },
  'help-center': {
    title: 'Help Center',
    description: 'Documentation, guides, and tutorials to help you get the most out of Olyth.',
    content: [
      'Our comprehensive help center contains articles, guides, and video tutorials.',
      'Learn how to set up your account, configure channels, and use advanced features.',
      'Find answers to common questions and troubleshoot issues.',
      'Access API documentation for developers.',
      'Browse our knowledge base for best practices and tips.',
    ],
  },
  'changelog': {
    title: 'Changelog',
    description: 'Stay updated with the latest product updates and improvements.',
    content: [
      'We release new features and improvements regularly.',
      'Check our changelog to see what\'s new in the latest version.',
      'Learn about bug fixes, performance improvements, and new capabilities.',
      'Subscribe to updates to be notified of new releases.',
      'Provide feedback on features you\'d like to see next.',
    ],
  },
  'status': {
    title: 'Status',
    description: 'Check the health and uptime of Olyth services.',
    content: [
      'Monitor the real-time status of all Olyth services.',
      'View historical uptime data and incident reports.',
      'Subscribe to status updates for notifications.',
      'We maintain 99.9% uptime SLA for enterprise customers.',
      'Report issues and get support from our team.',
    ],
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    description: 'Legal terms of service for using Olyth.',
    content: [
      'These terms govern your use of the Olyth platform and services.',
      'By using Olyth, you agree to be bound by these terms.',
      'We reserve the right to modify these terms at any time.',
      'Continued use of the service constitutes acceptance of modified terms.',
      'For questions about our terms, please contact our legal team.',
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'How we handle and protect your data.',
    content: [
      'We take your privacy seriously and are committed to protecting your data.',
      'This policy explains how we collect, use, and protect your information.',
      'We comply with GDPR, CCPA, and other data protection regulations.',
      'You have the right to access, modify, or delete your data.',
      'For privacy concerns, contact our privacy team at privacy@olyth.com.',
    ],
  },
}

export default function ResourcePage() {
  const { resourceId } = useParams()
  const navigate = useNavigate()
  const resource = resourceData[resourceId || '']

  if (!resource) {
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
            <h1 className="font-archivo text-4xl font-light text-charcoal">Resource not found</h1>
            <p className="font-inter text-clay mt-4">The resource you're looking for doesn't exist.</p>
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
            {resource.title}
          </h1>
          <p className="font-inter text-lg text-clay max-w-2xl">
            {resource.description}
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn className="mb-16">
          <div className="bg-white rounded-card p-8 md:p-12">
            <div className="space-y-6">
              {resource.content.map((paragraph, index) => (
                <p key={index} className="font-inter text-base text-charcoal leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn className="text-center">
          <p className="font-inter text-base text-clay mb-6">
            Have questions? We're here to help.
          </p>
          <Button onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
