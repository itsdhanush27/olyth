import { useEffect } from 'react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import { useScrollToTop } from '@/hooks/useScrollToTop'

export default function SalesRepresentatives() {
  useScrollToTop()
  
  useEffect(() => {
    // Load Tally embeds when component mounts
    if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-cream min-h-screen">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center mb-12">
          <SectionLabel text="SALES TEAM" />
          <h1 className="font-archivo text-[56px] md:text-[80px] font-light text-charcoal tracking-[-2.56px] leading-[1.08] mt-4">
            Connect with Our Sales Team
          </h1>
          <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
            Our sales representatives are ready to discuss how Olyth can transform your customer support operations.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="bg-white rounded-card shadow-card overflow-hidden">
            {/* Tally Sales Representatives Embed */}
            <iframe
              data-tally-src="https://tally.so/embed/7RpKIL?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="500"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Sales Representatives"
              className="w-full"
            />
          </div>
        </ScrollFadeIn>
      </div>
    </main>
  )
}

// Declare Tally on window for TypeScript
declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}
