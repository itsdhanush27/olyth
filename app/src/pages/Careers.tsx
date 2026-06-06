import { useEffect } from 'react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import { useScrollToTop } from '@/hooks/useScrollToTop'

// Extend window type for Tally
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

export default function Careers() {
  useScrollToTop()
  
  useEffect(() => {
    // Load Tally embeds after component mounts
    if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">

        {/* Header */}
        <ScrollFadeIn className="text-center mb-16">
          <SectionLabel text="CAREERS" />
          <h1 className="font-archivo text-[28px] sm:text-[36px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] mt-4">
            Join the Olyth team
          </h1>
          <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
            We're building the future of customer support for emerging markets. Come grow with us.
          </p>
        </ScrollFadeIn>

        {/* Job Listing */}
        <ScrollFadeIn>
          <div className="max-w-3xl mx-auto">
            {/* Role Card 1 - Sales Representative */}
            <div className="bg-white rounded-card border border-gray-200 p-8 md:p-10 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-orange/10 text-orange font-inter text-xs font-medium mb-3">
                    Open Position
                  </span>
                  <h2 className="font-archivo text-2xl font-medium text-charcoal">
                    Sales Representative
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="font-inter text-sm text-clay">📍 Remote</span>
                    <span className="font-inter text-sm text-clay">⏱ Full-time</span>
                    <span className="font-inter text-sm text-clay">💼 Sales</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-5">
                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">About the Role</h3>
                  <p className="font-inter text-sm text-clay leading-relaxed">
                    We're looking for a driven Sales Representative to help grow Olyth's customer base across emerging markets. You'll be the first point of contact for potential customers, helping them understand how Olyth can transform their customer support operations.
                  </p>
                </div>

                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">What You'll Do</h3>
                  <ul className="space-y-2">
                    {[
                      'Identify and qualify new sales opportunities through outbound prospecting',
                      'Conduct product demos and presentations to potential customers',
                      'Manage the full sales cycle from lead to close',
                      'Build and maintain strong relationships with prospects and customers',
                      'Collaborate with the product team to relay customer feedback',
                      'Meet and exceed monthly and quarterly sales targets',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 font-inter text-sm text-clay">
                        <span className="text-orange mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">What We're Looking For</h3>
                  <ul className="space-y-2">
                    {[
                      '2+ years of B2B SaaS sales experience',
                      'Strong communication and presentation skills',
                      'Experience selling to SMBs in emerging markets (Africa, Southeast Asia, LATAM)',
                      'Self-motivated with a track record of hitting targets',
                      'Familiarity with CRM tools (HubSpot, Salesforce, etc.)',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 font-inter text-sm text-clay">
                        <span className="text-teal mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Role Card 2 - Sales - Vacant */}
            <div className="bg-white rounded-card border border-gray-200 p-8 md:p-10 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-orange/10 text-orange font-inter text-xs font-medium mb-3">
                    Open Position
                  </span>
                  <h2 className="font-archivo text-2xl font-medium text-charcoal">
                    Sales
                  </h2>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="font-inter text-sm text-clay">📍 Remote</span>
                    <span className="font-inter text-sm text-clay">⏱ Full-time</span>
                    <span className="font-inter text-sm text-clay">💼 Sales</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-5">
                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">About the Role</h3>
                  <p className="font-inter text-sm text-clay leading-relaxed">
                    Join our growing sales team and help drive Olyth's expansion in emerging markets. This is an exciting opportunity to work with a fast-growing startup that's transforming customer support with AI-powered solutions.
                  </p>
                </div>

                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">What You'll Do</h3>
                  <ul className="space-y-2">
                    {[
                      'Build and manage a pipeline of qualified leads',
                      'Execute strategic sales plans to achieve revenue targets',
                      'Develop deep relationships with key accounts and stakeholders',
                      'Conduct technical product demonstrations to prospects',
                      'Work closely with marketing and product teams to refine go-to-market strategy',
                      'Provide market insights and customer feedback to leadership',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 font-inter text-sm text-clay">
                        <span className="text-orange mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-archivo text-base font-medium text-charcoal mb-2">What We're Looking For</h3>
                  <ul className="space-y-2">
                    {[
                      '3+ years of enterprise or mid-market SaaS sales experience',
                      'Proven track record of exceeding sales quotas',
                      'Strong relationship-building and negotiation skills',
                      'Understanding of customer support and CRM solutions',
                      'Experience in emerging markets is a plus',
                      'Competitive drive and passion for growth',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 font-inter text-sm text-clay">
                        <span className="text-teal mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-card border border-gray-200 p-8 md:p-10">
              <h2 className="font-archivo text-2xl font-medium text-charcoal mb-2">
                Apply Now
              </h2>
              <p className="font-inter text-sm text-clay mb-8">
                Fill out the form below and we'll get back to you within 3 business days.
              </p>

              {/* Tally Embed */}
              <iframe
                data-tally-src="https://tally.so/embed/7RpKlL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="500"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="Sales Application"
                className="w-full"
              />
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
