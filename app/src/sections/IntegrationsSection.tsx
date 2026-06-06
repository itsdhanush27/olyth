import { useEffect, useRef } from 'react'
import SectionLabel from '@/components/SectionLabel'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import gsap from 'gsap'

const integrations = [
  { name: 'WhatsApp', icon: 'whatsapp' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Telegram', icon: 'telegram' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Gmail', icon: 'gmail' },
  { name: 'Outlook', icon: 'outlook' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Microsoft Teams', icon: 'teams' },
  { name: 'Zapier', icon: 'zapier' },
  { name: 'Make', icon: 'make' },
  { name: 'Stripe', icon: 'stripe' },
  { name: 'Shopify', icon: 'shopify' },
  { name: 'WooCommerce', icon: 'woocommerce' },
  { name: 'HubSpot', icon: 'hubspot' },
  { name: 'Salesforce', icon: 'salesforce' },
  { name: 'Jira', icon: 'jira' },
  { name: 'Asana', icon: 'asana' },
  { name: 'Monday.com', icon: 'monday' },
  { name: 'Notion', icon: 'notion' },
]

// SVG Icons for each integration
const IntegrationIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'whatsapp':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.359 1.236-3.203 2.162C3.602 10.582 3 12.006 3 13.585c0 1.962.822 3.816 2.39 5.245l-1.437 5.185 5.514-1.437C11.663 23.41 13.088 24 14.585 24c4.872 0 8.864-3.992 8.864-8.864 0-2.368-.928-4.595-2.614-6.28-1.686-1.686-3.912-2.614-6.28-2.614"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.331.012 7.052.07 2.696.278.278 2.579.07 7.052.012 8.331 0 8.756 0 12s.012 3.669.07 4.948c.208 4.474 2.626 6.856 7.099 7.064 1.278.058 1.703.07 4.948.07 3.259 0 3.668-.012 4.948-.07 4.47-.208 6.879-2.586 7.064-7.099.058-1.279.07-1.704.07-4.948 0-3.259-.012-3.668-.07-4.948-.208-4.474-2.586-6.879-7.099-7.064C15.669.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z"/>
        </svg>
      )
    case 'telegram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.332-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.461c.54-.203 1.01.122.84.951z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.974 6.807H2.882l7.432-8.504H1.927V2.25h6.936l4.867 6.44 5.514-6.44zM17.15 18.75h1.828L6.122 3.97H4.231l12.919 14.78z"/>
        </svg>
      )
    case 'facebook':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'gmail':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    case 'outlook':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M11.6 2H4.4C3.08 2 2 3.08 2 4.4v15.2C2 20.92 3.08 22 4.4 22h15.2c1.32 0 2.4-1.08 2.4-2.4V12.4M4.4 4h7.2v7.2H4.4V4m9.6 0h7.2v7.2h-7.2V4m7.2 9.6h-7.2v7.2h7.2v-7.2m-9.6 0H4.4v7.2h7.2v-7.2z"/>
        </svg>
      )
    case 'slack':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-500">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.528 2.528 0 0 1 2.524 2.52v6.31A2.529 2.529 0 0 1 8.834 24a2.529 2.529 0 0 1-2.521-2.525v-6.31zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.524H2.524A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.524-2.521h6.31zM18.958 8.834a2.528 2.528 0 0 1 2.52-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.52V8.834zM17.687 8.834a2.527 2.527 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.524-2.521V2.524A2.527 2.527 0 0 1 15.166 0a2.527 2.527 0 0 1 2.521 2.524v6.31zM15.166 18.958a2.528 2.528 0 0 1 2.521 2.52A2.528 2.528 0 0 1 15.166 24a2.528 2.528 0 0 1-2.521-2.522v-2.52h2.521zM15.166 17.687a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.524h6.31a2.528 2.528 0 0 1 2.524 2.524 2.528 2.528 0 0 1-2.524 2.521h-6.31z"/>
        </svg>
      )
    case 'teams':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M16.5 2H7.5C6.12 2 5 3.12 5 4.5v15C5 20.88 6.12 22 7.5 22h9C17.88 22 19 20.88 19 19.5v-15C19 3.12 17.88 2 16.5 2zm-2 16h-3v-3h3v3zm0-4h-3v-3h3v3zm0-4h-3V7h3v3z"/>
        </svg>
      )
    case 'zapier':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      )
    case 'make':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    case 'stripe':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M13.479 10.045c0-.502-.383-.887-.887-.887-.502 0-.887.385-.887.887 0 .502.385.887.887.887.504 0 .887-.385.887-.887zm-2.667 0c0-.502-.385-.887-.887-.887-.502 0-.887.385-.887.887 0 .502.385.887.887.887.502 0 .887-.385.887-.887zm5.334 0c0-.502-.385-.887-.887-.887-.502 0-.887.385-.887.887 0 .502.385.887.887.887.502 0 .887-.385.887-.887z"/>
        </svg>
      )
    case 'shopify':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 00-.794.873l.04.252.63 3.993.022.138a.806.806 0 01-.795.873h-2.31a.57.57 0 01-.563-.66l.3-1.9.6-3.81.04-.252a.805.805 0 00-.794-.873h-.5c-3.238 0-5.774-1.314-6.514-5.12-.256-1.313-.192-2.447.3-3.327.492-.88 1.347-1.493 2.457-1.76l1.348-4.285C6.27 2.31 7.13 1.5 8.19 1.5h.035c.968 0 1.8.72 1.98 1.68l1.348 4.285c1.11.267 1.965.88 2.457 1.76z"/>
        </svg>
      )
    case 'woocommerce':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
        </svg>
      )
    case 'hubspot':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
        </svg>
      )
    case 'salesforce':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
        </svg>
      )
    case 'jira':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
        </svg>
      )
    case 'asana':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
        </svg>
      )
    case 'monday':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
        </svg>
      )
    case 'notion':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-black">
          <path d="M4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 2v14h16V5H4zm2 2h12v2H6V7zm0 3h12v2H6v-2zm0 3h8v2H6v-2z"/>
        </svg>
      )
    default:
      return null
  }
}

export default function IntegrationsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Clone items for infinite scroll effect
    const items = container.querySelectorAll('.integration-item')
    items.forEach((item) => {
      const clone = item.cloneNode(true)
      container.appendChild(clone)
    })

    // Animate scroll
    const totalWidth = container.scrollWidth / 2
    const duration = totalWidth / 50 // Adjust speed here

    gsap.to(container, {
      x: -totalWidth,
      duration: duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    })

    return () => {
      gsap.killTweensOf(container)
    }
  }, [])

  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-content mx-auto px-5">
        <ScrollFadeIn className="text-center mb-12">
          <SectionLabel text="INTEGRATIONS" />
          <h2 className="font-archivo text-[28px] md:text-[36px] font-light text-charcoal tracking-[-1.44px] leading-[40px] mt-4">
            Connect with your favorite tools
          </h2>
          <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
            Olyth integrates with 100+ tools and platforms. Connect your entire tech stack seamlessly.
          </p>
        </ScrollFadeIn>

        {/* Scrolling Integration List */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 py-8"
          >
            {integrations.map((integration, index) => (
              <div
                key={`${integration.name}-${index}`}
                className="integration-item flex-shrink-0"
              >
                <div className="bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-orange/40 hover:shadow-md transition-all duration-300 whitespace-nowrap flex items-center gap-3 group">
                  <div className="flex-shrink-0">
                    <IntegrationIcon name={integration.icon} />
                  </div>
                  <p className="font-inter text-sm font-medium text-charcoal">
                    {integration.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent pointer-events-none" />
        </div>

        {/* CTA */}
        <ScrollFadeIn className="text-center mt-12">
          <p className="font-inter text-base text-clay mb-4">
            Don't see your tool? We're adding new integrations constantly.
          </p>
          <button className="inline-flex items-center gap-2 font-inter text-sm font-medium text-orange hover:text-orange-dark transition-colors duration-300">
            Request an Integration
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
