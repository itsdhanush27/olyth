import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'

const features = [
  { name: 'WhatsApp Business API', olyth: 'full' },
  { name: 'Unified Omnichannel Inbox', olyth: 'full' },
  { name: 'Autonomous Resolution', olyth: 'full' },
  { name: 'Emerging Market Pricing', olyth: 'full' },
  { name: 'Local Language Support (Swahili, Yoruba, etc.)', olyth: 'full' },
  { name: 'Local Currency Billing', olyth: 'full' },
  { name: 'RAG-Powered Knowledge Base', olyth: 'full' },
  { name: 'API Actions in Conversations', olyth: 'full' },
  { name: 'Contextual Memory', olyth: 'full' },
  { name: 'Workflow Automation', olyth: 'full' },
  { name: 'Custom Reports & Analytics', olyth: 'full' },
  { name: 'Self-Hosted / On-Premise', olyth: 'full' },
  { name: '14-Day Free Trial (No Card)', olyth: 'full' },
]

export default function ComparisonTableSection() {

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn>
          <SectionLabel text="SUPPORT" />
          <h2 className="font-archivo text-[28px] md:text-[36px] font-light text-charcoal tracking-[-1.44px] leading-[40px] mt-4 mb-12">
            Why teams choose Olyth
          </h2>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-inter text-sm font-medium text-charcoal bg-gray-50 sticky left-0 z-10 min-w-[220px]">
                    Feature
                  </th>
                  <th className="p-4 font-archivo text-base font-medium text-white bg-orange rounded-t-lg min-w-[100px]">
                    Olyth
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="p-4 font-inter text-sm text-charcoal sticky left-0 z-10" style={{ background: i % 2 === 0 ? '#fff' : '#F0F2F5' }}>
                      {feature.name}
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-teal font-medium">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollFadeIn>


      </div>
    </section>
  )
}
