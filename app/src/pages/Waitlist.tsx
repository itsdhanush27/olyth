import { useState } from 'react'
import ScrollFadeIn from '@/components/ScrollFadeIn'
import SectionLabel from '@/components/SectionLabel'
import { Star } from 'lucide-react'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { supabase } from '@/lib/supabase'

export default function Waitlist() {
  useScrollToTop()
  const [formData, setFormData] = useState<any>({
    fullName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
    companyAddress: '',
    country: '',
    estimatedUsers: '',
    package: '',
    thalAddon: '',
    howLearned: '',
    subject: '',
    message: '',
    securityCode: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [securityError, setSecurityError] = useState('')

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSecurityError('')
    setErrorMsg('')
    setSubmitStatus('idle')

    if (formData.securityCode.trim() !== 'OLYTH') {
      setSecurityError('Please type the security code "OLYTH" exactly in capital letters.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('loading')

    try {
      const { error } = await supabase.from('waitlist_entries').insert({
        email: formData.email,
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        company: formData.companyName,
        company_address: formData.companyAddress,
        country: formData.country,
        estimated_users: formData.estimatedUsers,
        package: formData.package,
        thal_addon: formData.thalAddon,
        how_learned: formData.howLearned,
        subject: formData.subject,
        message: formData.message,
      })

      if (error) {
        if (error.code === '23505') {
          setErrorMsg('This email is already registered.')
          setSubmitStatus('error')
        } else {
          throw error
        }
      } else {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          companyName: '',
          companyAddress: '',
          country: '',
          estimatedUsers: '',
          package: '',
          thalAddon: '',
          howLearned: '',
          subject: '',
          message: '',
          securityCode: '',
        })
      }
    } catch (err: any) {
      console.error('Error submitting waitlist:', err)
      setErrorMsg(err.message || 'An error occurred. Please try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-24 md:pt-36 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-[720px] mx-auto px-5">
        <ScrollFadeIn className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-orange/10 flex items-center justify-center mx-auto mb-6">
            <Star size={32} className="text-orange" />
          </div>
          <SectionLabel text="EXCLUSIVE ACCESS" />
          <h1 className="font-archivo text-[32px] sm:text-[48px] md:text-[64px] font-light text-charcoal tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.56px] leading-[1.08] mt-4">
            Join 8,257 others on the waitlist
          </h1>
          <p className="font-inter text-base text-clay mt-4">
            Join our Invite-Only Access. We are rolling out gradually starting August 2026. Join the queue for exclusive, invite-only access.
          </p>
        </ScrollFadeIn>

        <ScrollFadeIn>
          <div className="bg-white rounded-card p-8 lg:p-10 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  />
                </div>
              </div>

              {/* Email Block */}
              <div>
                <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                />
              </div>

              {/* Company Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Company Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyAddress}
                    onChange={(e) => handleChange('companyAddress', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  />
                </div>
              </div>

              {/* Region and Package Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  >
                    <option value="" selected disabled>Select...</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Egypt">Egypt</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Number of Users *
                  </label>
                  <select
                    required
                    value={formData.estimatedUsers}
                    onChange={(e) => handleChange('estimatedUsers', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  >
                    <option value="" selected disabled>Select...</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Olyth Package *
                  </label>
                  <select
                    required
                    value={formData.package}
                    onChange={(e) => handleChange('package', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  >
                    <option value="" selected disabled>Select...</option>
                    <option value="Free Trial">Free Trial</option>
                    <option value="Basic">Basic</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              {/* Thal AI Select Add-on */}
              <div>
                <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                  Would you like to add Thal AI? *
                </label>
                <select
                  required
                  value={formData.thalAddon === '' ? '' : (formData.thalAddon ? 'Thal Add On' : 'No Add On')}
                  onChange={(e) => handleChange('thalAddon', e.target.value === '' ? '' : e.target.value === 'Thal Add On')}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                >
                  <option value="" selected disabled>Select...</option>
                  <option value="Thal Add On">Thal Add On</option>
                  <option value="No Add On">No Add On</option>
                </select>
              </div>

              {/* Refer and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    How did you learn about Olyth *
                  </label>
                  <select
                    required
                    value={formData.howLearned}
                    onChange={(e) => handleChange('howLearned', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  >
                    <option value="" selected disabled>Select...</option>
                    <option value="Google">Google</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Word of mouth">Word of mouth</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Article/Blog">Article/Blog</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                    Message Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors"
                  />
                </div>
              </div>

              {/* Text Message Brief */}
              <div>
                <label className="font-inter text-sm font-medium text-charcoal mb-1.5 block">
                  Your Message in Brief *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  disabled={isSubmitting}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm text-charcoal placeholder:text-graytext focus:outline-none focus:border-orange/50 focus:ring-1 focus:ring-orange/20 transition-colors resize-none"
                />
              </div>

              {/* Security Verification */}
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 space-y-3">
                <label className="font-inter text-sm font-medium text-charcoal block">
                  Security Check *
                </label>
                <p className="font-inter text-xs text-clay">
                  Type the word <strong className="text-orange">OLYTH</strong> below in Capital Letters to verify you are a human.
                </p>
                <input
                  type="text"
                  required
                  value={formData.securityCode}
                  onChange={(e) => handleChange('securityCode', e.target.value)}
                  disabled={isSubmitting}
                  className="w-full max-w-[200px] bg-white border border-gray-200 rounded-lg px-4 py-2.5 font-inter text-sm text-charcoal tracking-widest text-center font-bold focus:outline-none focus:border-orange/50"
                />
                {securityError && (
                  <p className="text-red-600 text-xs mt-1">{securityError}</p>
                )}
              </div>

              {/* Message Banner Statuses */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  ✅ Successfully registered! Thank you.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  ❌ {errorMsg || 'Error saving data. Please try again.'}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-br from-orange to-orange-dark text-white rounded-lg font-inter text-sm font-medium hover:from-orange-dark hover:to-orange-darker transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get Started'}
              </button>

            </form>
          </div>
        </ScrollFadeIn>
      </div>
    </main>
  )
}
