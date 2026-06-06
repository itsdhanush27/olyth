import ScrollFadeIn from '@/components/ScrollFadeIn'

const testimonials = [
  {
    quote: "Olyth transformed our customer support overnight. Thal handles 80% of our inquiries without any human intervention. Our team can finally focus on strategic work.",
    name: 'Amina Osei',
    title: 'Head of Customer Experience',
    company: 'FinPay Ghana',
    avatar: '/assets/testimonial-1.jpg',
  },
  {
    quote: "We went from 24-hour response times to under 3 minutes. The omnichannel inbox means nothing falls through the cracks. Best investment we've made.",
    name: 'Tunde Bakare',
    title: 'CEO',
    company: 'Lagos Logistics Co.',
    avatar: '/assets/testimonial-2.jpg',
  },
  {
    quote: "The analytics dashboard alone is worth it. We can see exactly where our support bottlenecks are and fix them proactively. Thal is genuinely intelligent.",
    name: 'Priya Naidoo',
    title: 'Operations Director',
    company: 'CapeTech South Africa',
    avatar: '/assets/testimonial-3.jpg',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center mb-16">
          <h2 className="font-archivo text-[28px] md:text-[36px] font-light text-charcoal tracking-[-1.44px] leading-[40px] max-w-[700px] mx-auto">
            Trusted by teams across emerging markets
          </h2>
        </ScrollFadeIn>

        <ScrollFadeIn stagger={0.12}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-card p-10 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
              >
                <p className="font-inter text-base text-charcoal leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-archivo text-base font-medium text-charcoal">
                      {t.name}
                    </p>
                    <p className="font-inter text-sm text-clay">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
