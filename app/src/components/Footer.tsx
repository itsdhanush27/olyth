import { Linkedin, Twitter, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Platform Overview', href: '/products/olyth-ai' },
      { label: 'Omnichannel', href: '/products/omnichannel' },
      { label: 'Thal', href: '/products/olyth-ai' },
      { label: 'Ticket Management', href: '/products/ticketing' },
      { label: 'Analytics', href: '/features/analytics-insights' },
      { label: 'Knowledge Base', href: '/tools/knowledge-hub' },
      { label: 'Customer Engagement', href: '/products/crm' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Automation', href: '/features/automation-intelligence' },
      { label: 'Workflow Automation', href: '/features/automation-intelligence' },
      { label: 'Ticket Escalation', href: '/features/ticket-resolution' },
      { label: 'Knowledge Management', href: '/tools/knowledge-hub' },
      { label: 'Customer Analytics', href: '/features/analytics-insights' },
      { label: 'API Integrations', href: '/features/integrations' },
      { label: 'Team Collaboration', href: '/features/communication-support' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/resources/about-us' },
      { label: 'Careers', href: '/resources/careers' },
      { label: 'Olyth Academy', href: '/resources/academy' },
      { label: 'Help Center', href: '/resources/help-center' },
      { label: 'Changelog', href: '/resources/changelog' },
      { label: 'Status', href: '/resources/status' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', href: '/resources/terms-conditions' },
      { label: 'Privacy Policy', href: '/resources/privacy-policy' },
      { label: 'Cookie Policy', href: '/resources/cookie-policy' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="w-full bg-gray-900">
      <div className="max-w-content mx-auto px-5 pt-20 pb-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => {
                navigate('/')
                setTimeout(() => window.scrollTo(0, 0), 0)
              }}
              className="flex items-center hover:opacity-80 transition-opacity duration-300 mb-2"
            >
              <img
                src="./assets/Olyth_Logo_Orange-removebg-preview.png"
                alt="Olyth"
                className="h-20 w-auto object-contain filter brightness-0 invert"
              />
            </button>
            <p className="font-inter text-sm text-gray-400 mt-1 max-w-[260px] leading-relaxed">
              Unified customer support for emerging markets. Powered by Thal, a built-in AI operational brain.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="font-inter text-xs font-semibold uppercase tracking-[1.4px] text-gray-500 mb-4">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => {
                          navigate(link.href)
                          // Scroll to top after navigation
                          setTimeout(() => window.scrollTo(0, 0), 0)
                        }}
                        className="font-inter text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <p className="font-archivo text-lg font-normal text-white mb-1">Stay Updated</p>
          <p className="font-inter text-sm text-gray-400 mb-5 max-w-md">
            Get the latest product updates, AI insights, and customer support trends.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-pill px-5 py-3 font-inter text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange/60 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-pill bg-orange hover:bg-orange-dark text-white font-inter text-sm font-medium transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-px bg-gray-800 mt-10 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-sm text-gray-500">
            &copy; 2026 Olyth. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              aria-label="LinkedIn"
              className="text-gray-500 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={18} />
            </button>
            <button
              aria-label="Twitter / X"
              className="text-gray-500 hover:text-white transition-colors duration-200"
            >
              <Twitter size={18} />
            </button>
            <button
              aria-label="Email"
              className="text-gray-500 hover:text-white transition-colors duration-200"
            >
              <Mail size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
