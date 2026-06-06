import { useEffect } from 'react'
import { X } from 'lucide-react'
import { format } from 'date-fns'

interface DetailField {
  key: string
  label: string
  type?: 'text' | 'date' | 'badge' | 'boolean' | 'list'
  badgeColors?: Record<string, string>
}

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  data: Record<string, any> | null
  fields: DetailField[]
}

export function DetailModal({ isOpen, onClose, title, data, fields }: DetailModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !data) return null

  const renderValue = (field: DetailField) => {
    const value = data[field.key]

    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">Not provided</span>
    }

    switch (field.type) {
      case 'date':
        try {
          return <span className="text-gray-900">{format(new Date(value), 'MMM dd, yyyy — h:mm a')}</span>
        } catch {
          return <span className="text-gray-900">{String(value)}</span>
        }
      case 'badge': {
        const colors = field.badgeColors || {}
        const color = colors[value] || 'bg-gray-100 text-gray-800'
        return (
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {String(value).replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </span>
        )
      }
      case 'boolean':
        return (
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            {value ? '✓ Yes' : '✗ No'}
          </span>
        )
      case 'list':
        if (!Array.isArray(value) || value.length === 0) {
          return <span className="text-gray-400 italic">None</span>
        }
        return (
          <div className="flex flex-wrap gap-1.5">
            {value.map((v: string, i: number) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{v}</span>
            ))}
          </div>
        )
      default:
        return <span className="text-gray-900 whitespace-pre-wrap break-words">{String(value)}</span>
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 animate-[slideUp_0.25s_ease] max-h-[90vh] flex flex-col">
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
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <dl className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-50 last:border-0">
                <dt className="text-sm font-medium text-gray-500 col-span-1">{field.label}</dt>
                <dd className="text-sm col-span-2">{renderValue(field)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
