import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export interface FormField {
  key: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox'
  required?: boolean
  options?: { value: string; label: string }[]
  disabled?: boolean
}

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => Promise<void>
  title: string
  fields: FormField[]
  initialValues?: Record<string, any>
  submitLabel?: string
}

export function FormModal({ isOpen, onClose, onSubmit, title, fields, initialValues = {}, submitLabel }: FormModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setFormData(initialValues)
    setError('')
  }, [isOpen, initialValues])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const payload: Record<string, any> = {}
      fields.forEach(f => {
        payload[f.key] = formData[f.key]
      })
      await onSubmit(payload)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 animate-[slideUp_0.25s_ease] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 font-archivo">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-0.5">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    disabled={field.disabled}
                    rows={3}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors resize-none disabled:bg-gray-50 disabled:text-gray-500"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    disabled={field.disabled}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="" selected disabled>Select...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!formData[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.checked)}
                      disabled={field.disabled}
                      className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange"
                    />
                    <span className="text-sm text-gray-600">Yes</span>
                  </label>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    required={field.required}
                    disabled={field.disabled}
                    step={field.type === 'number' ? 'any' : undefined}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange/20 focus:border-orange transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  />
                )}
              </div>
            ))}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange to-orange-dark rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : (submitLabel || (Object.keys(initialValues).length > 0 ? 'Update' : 'Create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
