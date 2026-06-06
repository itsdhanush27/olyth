import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { ChevronDown, Menu, X, Zap, Inbox, Ticket, Users, Folder, Book, HelpCircle, Workflow, ArrowUp, Layers, BarChart3, Link2, Info, Briefcase, Clock, Activity, File, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const productItems = [
  { name: 'Thal (AI add-on)', desc: 'AI automation across modules, smart replies, smart routing, summaries, multilingual responses, sentiment detection, in-platform assistant, agentic AI via APIs, memory, RAG.', href: '/products/olyth-ai', icon: 'zap' },
  { name: 'Omnichannel Inbox', desc: 'Email, chat, WhatsApp, social and SMS in one place', href: '/products/omnichannel', icon: 'inbox' },
  { name: 'Tickets', desc: 'Track, assign, prioritize and resolve customer issues in one place', href: '/products/ticketing', icon: 'ticket' },
  { name: 'Basic CRM', desc: 'Contacts, interaction history, unified customer context', href: '/products/crm', icon: 'users' },
]

const toolsItems = [
  { name: 'Workdrive', desc: 'Team file storage, shared customer files, internal notes, attachments', href: '/tools/workdrive', icon: 'folder' },
  { name: 'Website Live Chat', desc: 'Embedded chat widget for real-time customer support and lead capture', href: '/tools/live-chat', icon: 'chat' },
  { name: 'Help Center (Self-Service Portal)', desc: 'Customer support portal with FAQs, articles, guides, ticket submission', href: '/tools/help-centre', icon: 'help' },
  { name: 'Knowledge Hub (Internal)', desc: 'Internal knowledge system with documentation, training materials, AI-accessible content, process guides', href: '/tools/knowledge-hub', icon: 'book' },
]

// Features organized by section
const supportFeatures = [
  { name: 'Communication Support', desc: 'Unified messaging, real-time chat, conversation history, internal notes, team collaboration', href: '/features/communication-support', icon: 'chat' },
  { name: 'Ticket Resolution', desc: 'Ticket creation, auto-assignment, routing rules, SLA tracking, status tracking, collision detection', href: '/features/ticket-resolution', icon: 'ticket' },
  { name: 'CRM & Customer Context', desc: 'Customer profiles, interaction history, tags, segmentation, custom fields, reminders', href: '/features/crm-context', icon: 'users' },
]

const intelligenceControlFeatures = [
  { name: 'Automation Intelligence', desc: 'AI-powered workflows, workflow automation, multilingual responses, conversation summaries', href: '/features/automation-intelligence', icon: 'zap' },
  { name: 'Analytics Insights', desc: 'Response tracking, team dashboards, CSAT reporting, channel analytics', href: '/features/analytics-insights', icon: 'chart' },
  { name: 'Security Control', desc: 'Role-based access, SSO, audit logs, data retention controls', href: '/features/security-control', icon: 'shield' },
  { name: 'Integrations', desc: 'API access, webhooks, integrations with third-party platforms, data synchronization across systems', href: '/features/integrations', icon: 'link' },
]

const resourceItems = [
  { name: 'About Us', desc: 'Learn about Olyth\'s mission', href: '/resources/about-us', icon: 'info' },
  { name: 'Careers', desc: 'Join our growing team', href: '/resources/careers', icon: 'briefcase' },
  { name: 'Olyth Academy', desc: 'Learn and master customer support best practices', href: '/resources/academy', icon: 'book' },
  { name: 'Help Center', desc: 'Documentation and guides', href: '/resources/help-center', icon: 'help' },
  { name: 'Changelog', desc: 'Latest product updates', href: '/resources/changelog', icon: 'history' },
  { name: 'Status', desc: 'System health and uptime', href: '/resources/status', icon: 'activity' },
  { name: 'Terms & Conditions', desc: 'Legal terms of service', href: '/resources/terms-conditions', icon: 'file' },
  { name: 'Privacy Policy', desc: 'How we handle your data', href: '/resources/privacy-policy', icon: 'shield' },
]

const navLinks = [
  { label: 'Home', key: 'homepage', href: '/' },
  { label: 'Product', key: 'product' },
  { label: 'Features', key: 'features' },
  { label: 'Pricing', key: 'pricing', href: '/pricing' },
  { label: 'Resources', key: 'resources' },
  { label: 'Contact Us', key: 'contact', href: '/contact' },
]

// Icon renderer function
const renderIcon = (iconName: string) => {
  const iconProps = { size: 18, className: 'text-teal' }
  switch (iconName) {
    case 'zap':
      return <Zap {...iconProps} />
    case 'inbox':
      return <Inbox {...iconProps} />
    case 'ticket':
      return <Ticket {...iconProps} />
    case 'users':
      return <Users {...iconProps} />
    case 'folder':
      return <Folder {...iconProps} />
    case 'book':
      return <Book {...iconProps} />
    case 'help':
      return <HelpCircle {...iconProps} />
    case 'chat':
      return <HelpCircle {...iconProps} />
    case 'automation':
      return <Zap {...iconProps} />
    case 'workflow':
      return <Workflow {...iconProps} />
    case 'arrow-up':
      return <ArrowUp {...iconProps} />
    case 'layers':
      return <Layers {...iconProps} />
    case 'chart':
      return <BarChart3 {...iconProps} />
    case 'link':
      return <Link2 {...iconProps} />
    case 'info':
      return <Info {...iconProps} />
    case 'briefcase':
      return <Briefcase {...iconProps} />
    case 'clock':
      return <Clock {...iconProps} />
    case 'activity':
      return <Activity {...iconProps} />
    case 'file':
      return <File {...iconProps} />
    case 'shield':
      return <Shield {...iconProps} />
    case 'history':
      return <Clock {...iconProps} />
    default:
      return null
  }
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (menu: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setMenuOpen(menu)
  }

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMenuOpen(null)
    }, 100)
  }

  const handleNavClick = (href?: string) => {
    setMenuOpen(null)
    setMobileOpen(false)
    setMobileSubmenuOpen(null)
    if (href) {
      navigate(href)
      // Always scroll to top after navigation
      setTimeout(() => window.scrollTo(0, 0), 0)
    }
  }

  const toggleMobileSubmenu = (key: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === key ? null : key)
  }

  const isActive = (href?: string) => {
    if (!href) return false
    if (href === '/') return location.pathname === '/'
    return location.pathname === href
  }

  return (
    <>
      {/* Mobile Menu Overlay - Positioned above navbar */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-[910] bg-white lg:hidden overflow-y-auto pt-24">
          <div className="flex flex-col pb-8 px-4 sm:px-6">
            {/* Mobile Navigation Links */}
            {navLinks.slice(0, 6).map((link) => (
              <div key={link.key} className="border-b border-gray-100">
                {link.key === 'product' || link.key === 'features' || link.key === 'resources' ? (
                  <>
                    <button
                      onClick={() => toggleMobileSubmenu(link.key)}
                      className="w-full flex items-center justify-between py-4 font-inter text-base font-medium text-charcoal hover:text-orange transition-colors duration-300"
                    >
                      {link.label}
                      <ChevronDown
                        size={20}
                        className={cn(
                          'transition-transform duration-300',
                          mobileSubmenuOpen === link.key && 'rotate-180'
                        )}
                      />
                    </button>
                    {/* Submenu Items */}
                    {mobileSubmenuOpen === link.key && (
                      <div className="pb-4 pl-4 bg-gray-50">
                        {link.key === 'product' && (
                          <>
                            <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-3">Platform</p>
                            {productItems.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="block w-full text-left py-2.5 font-inter text-sm text-charcoal hover:text-orange transition-colors duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                            <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4">Tools</p>
                            {toolsItems.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="block w-full text-left py-2.5 font-inter text-sm text-charcoal hover:text-orange transition-colors duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                          </>
                        )}
                        {link.key === 'features' && (
                          <>
                            <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-3">Support</p>
                            {supportFeatures.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="block w-full text-left py-2.5 font-inter text-sm text-charcoal hover:text-orange transition-colors duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                            <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-4">Intelligence & Control</p>
                            {intelligenceControlFeatures.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="block w-full text-left py-2.5 font-inter text-sm text-charcoal hover:text-orange transition-colors duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                          </>
                        )}
                        {link.key === 'resources' && (
                          <>
                            <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-3">Resources</p>
                            {resourceItems.map((item) => (
                              <button
                                key={item.name}
                                onClick={() => handleNavClick(item.href)}
                                className="block w-full text-left py-2.5 font-inter text-sm text-charcoal hover:text-orange transition-colors duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => link.href ? handleNavClick(link.href) : handleNavClick('/')}
                    className="w-full text-left py-4 font-inter text-base font-medium text-charcoal hover:text-orange transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                )}
              </div>
            ))}

            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={() => handleNavClick('/signin')}
                className="w-full text-center py-3 font-inter text-base font-medium text-charcoal hover:text-orange transition-colors duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNavClick('/waitlist')}
                className="w-full text-center py-3 font-inter text-base font-medium text-white rounded-lg bg-gradient-to-br from-orange to-orange-dark hover:from-orange-dark hover:to-orange-darker transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[900] transition-shadow duration-300',
          'bg-white border-b border-gray-100',
          scrolled ? 'shadow-nav-scroll' : 'shadow-none'
        )}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto w-full">
          {/* Logo - Left Side */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center hover:opacity-80 transition-opacity duration-300 shrink-0"
          >
            <img
              src="./assets/olyth-logo.png"
              alt="Olyth"
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav Links - Center */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {navLinks.slice(0, 5).map((link) => (
              <div
                key={link.key}
                className="relative"
                onMouseEnter={() => link.key === 'product' || link.key === 'features' || link.key === 'resources' ? handleMouseEnter(link.key) : undefined}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => link.href ? handleNavClick(link.href) : undefined}
                  className={cn(
                    'flex items-center gap-1 font-inter text-sm font-medium transition-colors duration-300',
                    link.key === 'homepage' ? 'text-charcoal hover:text-orange' : (isActive(link.href) ? 'text-orange' : 'text-charcoal hover:text-orange')
                  )}
                >
                  {link.label}
                  {(link.key === 'product' || link.key === 'features' || link.key === 'resources') && (
                    <ChevronDown
                      size={16}
                      className={cn(
                        'transition-transform duration-300',
                        menuOpen === link.key && 'rotate-180'
                      )}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Mega Menus */}
          {menuOpen === 'product' && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-0 bg-white rounded-lg shadow-mega border border-gray-100 z-[800] min-w-[700px] max-h-[500px] overflow-y-auto"
              onMouseEnter={() => handleMouseEnter('product')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-8 py-6">
                <div className="grid grid-cols-2 gap-12">
                  {/* Platform Column */}
                  <div>
                    <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Platform</p>
                    <div className="flex flex-col gap-3">
                      {productItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {renderIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                            <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tools Column */}
                  <div>
                    <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Tools</p>
                    <div className="flex flex-col gap-3">
                      {toolsItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {renderIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                            <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {menuOpen === 'features' && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-0 bg-white rounded-lg shadow-mega border border-gray-100 z-[800] min-w-[800px] max-h-[600px] overflow-y-auto"
              onMouseEnter={() => handleMouseEnter('features')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-8 py-6">
                <div className="grid grid-cols-2 gap-16">
                  {/* Support Column */}
                  <div>
                    <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Support</p>
                    <div className="flex flex-col gap-4">
                      {supportFeatures.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {renderIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                            <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Intelligence & Control Column */}
                  <div>
                    <p className="font-inter text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Intelligence & Control</p>
                    <div className="flex flex-col gap-4">
                      {intelligenceControlFeatures.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            {renderIcon(item.icon)}
                          </div>
                          <div>
                            <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                            <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {menuOpen === 'resources' && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-0 bg-white rounded-lg shadow-mega border border-gray-100 z-[800] min-w-[700px] max-h-[500px] overflow-y-auto"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="px-8 py-6">
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col gap-3">
                    {resourceItems.slice(0, 4).map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {renderIcon(item.icon)}
                        </div>
                        <div>
                          <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                          <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    {resourceItems.slice(4).map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="text-left hover:text-orange transition-colors duration-200 group py-1 flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {renderIcon(item.icon)}
                        </div>
                        <div>
                          <p className="font-inter text-sm font-medium text-charcoal group-hover:text-orange">{item.name}</p>
                          <p className="text-xs text-clay mt-0.5">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side - Contact Us, Sign In, Try for Free */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
            <button
              onClick={() => handleNavClick('/contact')}
              className="font-inter text-sm font-medium text-charcoal hover:text-orange transition-colors duration-300"
            >
              Contact Us
            </button>
            <button
              onClick={() => handleNavClick('/signin')}
              className="font-inter text-sm font-medium text-charcoal hover:text-orange transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick('/waitlist')}
              className="font-inter text-sm font-medium text-white px-4 xl:px-6 py-2 rounded-lg bg-gradient-to-br from-orange to-orange-dark hover:from-orange-dark hover:to-orange-darker transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-charcoal ml-auto z-[920]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  )
}
