import { useState } from 'react'
import { ChevronRight, Rocket, Headphones, Lightbulb } from 'lucide-react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { MessageSquare, Wrench, MessageCircle } from 'lucide-react'

const cardData = [
  {
    icon: MessageSquare,
    title: 'Talk to Sales',
    description: 'Tell us about your team and we will be in touch within one business day.',
    fields: [
      { name: 'first_name', label: 'First name', type: 'text' },
      { name: 'last_name', label: 'Last name', type: 'text' },
      { name: 'email', label: 'Work email', type: 'email' },
      { name: 'company', label: 'Company name', type: 'text' },
      { name: 'team_size', label: 'Team size', type: 'select' },
      { name: 'message', label: 'What are you looking to solve?', type: 'textarea' },
    ],
  },
  {
    icon: Wrench,
    title: 'Contact Support',
    description: 'We typically respond within a few hours on business days.',
    fields: [
      { name: 'email', label: 'Your email', type: 'email' },
      { name: 'issue_type', label: 'Issue type', type: 'select' },
      { name: 'subject', label: 'Subject', type: 'text' },
      { name: 'details', label: 'Details', type: 'textarea' },
    ],
  },
  {
    icon: MessageCircle,
    title: 'Share Feedback',
    description: 'We read every message. Your input shapes the product.',
    fields: [
      { name: 'email', label: 'Your email', type: 'email', optional: true },
      { name: 'feedback_type', label: 'Feedback type', type: 'select' },
      { name: 'feedback', label: 'Your feedback', type: 'textarea' },
    ],
  },
]

function ContactCard({ card }: { card: typeof cardData[0] }) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus('idle')

    try {
      if (card.title === 'Talk to Sales') {
        const { error } = await supabase.from('sales_inquiries').insert({
          first_name: formData.first_name || '',
          last_name: formData.last_name || '',
          email: formData.email || '',
          company: formData.company || '',
          team_size: formData.team_size || '',
          message: formData.message || '',
        })
        if (error) throw error
      } else if (card.title === 'Contact Support') {
        const { error } = await supabase.from('support_tickets').insert({
          email: formData.email || '',
          issue_type: formData.issue_type || '',
          subject: formData.subject || '',
          details: formData.details || '',
        })
        if (error) throw error
      } else if (card.title === 'Share Feedback') {
        const { error } = await supabase.from('feedback').insert({
          email: formData.email || '',
          feedback_type: formData.feedback_type || '',
          feedback: formData.feedback || '',
        })
        if (error) throw error
      }

      setSubmitStatus('success')
      setFormData({})
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-card p-8 shadow-card">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
          <card.icon size={24} className="text-orange" />
        </div>
        <div>
          <h3 className="font-archivo text-xl font-medium text-charcoal">{card.title}</h3>
          <p className="font-inter text-sm text-clay mt-1">{card.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {card.fields.map((field) => (
          <div key={field.name}>
            <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
              {field.label} {field.optional ? '(optional)' : '*'}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors resize-none"
                disabled={loading}
              />
            ) : field.type === 'select' ? (
              <select
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                disabled={loading}
              >
                <option value="" selected disabled>Select...</option>
                {field.name === 'issue_type' ? (
                  <>
                    <option value="Account or Billing">Account or Billing</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Feature Question">Feature Question</option>
                    <option value="Integrations">Integrations</option>
                    <option value="Other">Other</option>
                  </>
                ) : field.name === 'team_size' ? (
                  <>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </>
                ) : (
                  <>
                    <option value="Feature request">Feature request</option>
                    <option value="Bug report">Bug report</option>
                    <option value="General feedback">General feedback</option>
                    <option value="Praise">Praise</option>
                    <option value="Others">Others</option>
                  </>
                )}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                disabled={loading}
              />
            )}
          </div>
        ))}

        {card.title === 'Contact Support' && (
          <div>
            <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
              Attachments (optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange/40 transition-colors">
              <p className="font-inter text-sm text-charcoal">Click to attach or drag and drop</p>
              <p className="font-inter text-xs text-graytext mt-1">Screenshots, logs or any relevant files. Max 5 MB each.</p>
            </div>
          </div>
        )}

        {card.title === 'Share Feedback' && (
          <div>
            <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
              Attachments (optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-orange/40 transition-colors">
              <p className="font-inter text-sm text-charcoal">Click to attach or drag and drop</p>
              <p className="font-inter text-xs text-graytext mt-1">Screenshots or any supporting files. Max 5 MB each.</p>
            </div>
          </div>
        )}

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            ✅ Thank you! We'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            ❌ Error submitting form. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-3.5 rounded-pill bg-gradient-to-br from-orange to-orange-dark text-white font-inter text-sm font-medium hover:from-orange-dark hover:to-orange-darker transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (card.title === 'Talk to Sales' ? 'Sending...' : card.title === 'Contact Support' ? 'Submitting...' : 'Sending...') : (card.title === 'Talk to Sales' ? 'Send message' : card.title === 'Contact Support' ? 'Submit request' : 'Send feedback')}
        </button>
      </form>
    </div>
  )
}

const cardsSelection = [
  {
    key: 'sales',
    title: 'Talk to Sales',
    description: 'New to Olyth? Get a personalised walkthrough, pricing guidance, or a demo.',
    icon: Rocket,
    iconBg: 'bg-orange/10',
    iconColor: 'text-orange',
  },
  {
    key: 'support',
    title: 'Contact Support',
    description: 'Already a customer? Get help with your account, a feature, or a technical issue.',
    icon: Headphones,
    iconBg: 'bg-teal/10',
    iconColor: 'text-teal',
  },
  {
    key: 'feedback',
    title: 'Share Feedback',
    description: 'Have a suggestion, spotted a bug, or want to share something we should know?',
    icon: Lightbulb,
    iconBg: 'bg-indigo/10',
    iconColor: 'text-indigo',
  },
]

export default function Contact() {
  useScrollToTop()
  const [selectedCardTitle, setSelectedCardTitle] = useState<string | null>(null)
  
  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-content mx-auto px-5">
        {selectedCardTitle === null ? (
          <>
            <ScrollFadeIn className="text-center mb-12">
              <h1 className="font-archivo text-[36px] sm:text-[56px] md:text-[60px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.4px] leading-[1.07] mt-4">
                How can we help?
              </h1>
              <p className="font-inter text-base text-clay mt-4 max-w-lg mx-auto">
                Choose what brings you here today.
              </p>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <div className="max-w-2xl mx-auto space-y-4">
                {cardsSelection.map((card) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={card.key}
                      onClick={() => setSelectedCardTitle(card.title)}
                      className="flex items-center gap-5 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm cursor-pointer hover:border-orange/30 hover:shadow-card-hover transition-all duration-300 group"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", card.iconBg)}>
                        <Icon className={cn("w-6 h-6", card.iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-archivo text-lg font-medium text-charcoal">{card.title}</h3>
                        <p className="font-inter text-sm text-clay mt-1 leading-relaxed">{card.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                    </div>
                  )
                })}

                <div className="text-center pt-8 border-t border-gray-100 mt-10">
                  <h3 className="font-archivo text-lg font-medium text-charcoal">Need something else?</h3>
                  <p className="font-inter text-sm text-clay mt-2 max-w-md mx-auto leading-relaxed">
                    Use the most relevant form above and our team will route your enquiry to the correct department.
                    We typically respond within one business day.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setSelectedCardTitle(null)}
              className="flex items-center gap-2 font-inter text-sm font-medium text-clay hover:text-orange transition-colors mb-6"
            >
              ← Back to options
            </button>
            {cardData
              .filter((card) => card.title === selectedCardTitle)
              .map((card) => (
                <ContactCard key={card.title} card={card} />
              ))}
          </div>
        )}
      </div>
    </main>
  )
}
