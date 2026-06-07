import { useEffect } from 'react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import { Star } from 'lucide-react'
import { useScrollToTop } from '@/hooks/useScrollToTop'

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

export default function Waitlist() {
  useScrollToTop()

  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-[720px] mx-auto px-5">
        <ScrollFadeIn className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-6">
            <Star size={32} className="text-orange" />
          </div>
          <SectionLabel text="EXCLUSIVE ACCESS" />
          <h1 className="font-archivo text-[32px] sm:text-[48px] md:text-[64px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.56px] leading-[1.08] mt-4">
            Join 8,256 others on the waitlist
          </h1>
          <p className="font-inter text-base text-clay mt-4">
            Join our Invite-Only Access. We're rolling out gradually starting August 2026. Join the queue for exclusive, invite-only access.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="bg-white rounded-card p-8 shadow-card overflow-hidden">
            <div className="relative w-full">
              <iframe
                data-tally-src="https://tally.so/embed/obkeYO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="1250"
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                title="Join our Waitlist"
                className="w-full"
                style={{ minHeight: '1250px', border: 'none' }}
              />
              {/* Cover "Made with Tally" branding badge permanently — pointer-events blocks clicks */}
              <div className="absolute bottom-0 right-0 w-[220px] h-[60px] bg-white z-10" style={{ cursor: 'default' }} />
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </main>
  )
}

