import { useState, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/SectionLabel'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import gsap from 'gsap'

const tabs = [
  {
    id: 0,
    label: '1. Connect Your Channels',
    title: 'Connect every channel in minutes',
    body: "Plug in WhatsApp Business, email, social media, voice, and live chat. Olyth unifies every conversation into a single intelligent workspace - no more switching between tools.",
    link: 'Explore Integrations',
    image: './assets/tab-connect.jpg',
  },
  {
    id: 1,
    label: '2. Thal Takes Over',
    title: 'AI that actually resolves issues',
    body: "Thal triages incoming requests, understands customer intent, accesses your knowledge base, and resolves issues autonomously. It only escalates what truly needs a human touch.",
    link: 'Meet Thal',
    image: './assets/tab-automate.jpg',
  },
  {
    id: 2,
    label: '3. Scale with Confidence',
    title: 'Grow without growing pains',
    body: "Handle 10x the volume without adding headcount. Real-time analytics show you exactly where to optimize. Your team focuses on what matters - Thal handles the rest.",
    link: 'See Analytics',
    image: './assets/tab-scale.jpg',
  },
]

export default function ProcessSection() {
  const [activeTab, setActiveTab] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleTabChange = (id: number) => {
    if (id === activeTab) return

    const tl = gsap.timeline()

    // Smooth fade out with subtle movement
    tl.to([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: 'power2.out',
      onComplete: () => {
        setActiveTab(id)
      },
    })
  }

  // Fade in new content after state update
  const handleContentMount = () => {
    gsap.fromTo(
      [contentRef.current, imageRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
  }

  const tab = tabs[activeTab]

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-content mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column */}
          <ScrollFadeIn>
            <div>
              <SectionLabel text="HOW IT WORKS" />
              <h2 className="font-archivo text-[28px] sm:text-[36px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] max-w-[480px] mt-4">
                Three steps to effortless support
              </h2>

              {/* Tab Buttons */}
              <div className="mt-10 flex flex-col">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id)}
                    className={`text-left py-5 px-6 border-b border-gray-200 font-archivo text-lg transition-all duration-500 ease-out ${
                      activeTab === t.id
                        ? 'border-l-[3px] border-l-orange font-medium text-orange bg-orange/5'
                        : 'border-l-[3px] border-l-transparent font-normal text-clay hover:text-charcoal hover:bg-gray-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollFadeIn>

          {/* Right Column - Content Card */}
          <div className="flex items-center">
            <div className="bg-white rounded-card p-8 md:p-10 shadow-card w-full" key={activeTab} onAnimationStart={handleContentMount}>
              {/* Image */}
              <div ref={imageRef} className="rounded-xl overflow-hidden mb-6">
                <img
                  src={tab.image}
                  alt={tab.title}
                  className="w-full h-auto object-cover"
                  onLoad={handleContentMount}
                />
              </div>

              {/* Content */}
              <div ref={contentRef}>
                <h3 className="font-archivo text-[22px] md:text-[28px] lg:text-[32px] font-medium text-charcoal tracking-[-0.64px] leading-tight">
                  {tab.title}
                </h3>
                <p className="font-inter text-base text-clay mt-4 leading-relaxed">
                  {tab.body}
                </p>
                <button className="inline-flex items-center gap-2 font-inter text-sm font-medium text-orange hover:underline mt-5 group">
                  {tab.link}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
