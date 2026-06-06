import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'email', label: 'Email' },
  { key: 'feedback_type', label: 'Type' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'reviewed', label: 'Reviewed', type: 'boolean' as const },
  { key: 'created_at', label: 'Created', type: 'date' as const },
]

export default function FeedbackTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: newData } = await supabase.from('feedback').select('*').order('created_at', { ascending: false })
    if (newData) setData(newData)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'feedback_type', label: 'Type', type: 'select', options: [
      { value: 'suggestion', label: 'Suggestion' },
      { value: 'complaint', label: 'Complaint' },
      { value: 'praise', label: 'Praise' },
      { value: 'other', label: 'Other' },
    ]},
    { key: 'feedback', label: 'Feedback Content', type: 'textarea', required: true },
    { key: 'reviewed', label: 'Reviewed', type: 'checkbox' },
  ]

  const columns = [
    { key: 'feedback_type', header: 'Type', render: (item: any) => item.feedback_type || '-' },
    { key: 'email', header: 'Email', render: (item: any) => item.email || 'Anonymous' },
    { key: 'feedback', header: 'Feedback', render: (item: any) => item.feedback.length > 50 ? item.feedback.substring(0, 50) + '...' : item.feedback },
    { 
      key: 'reviewed', 
      header: 'Reviewed', 
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.reviewed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {item.reviewed ? 'Yes' : 'No'}
        </span>
      )
    },
    { 
      key: 'created_at', 
      header: 'Date', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const { error } = await supabase.from('feedback').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('feedback').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this feedback?')) return
    const { error } = await supabase.from('feedback').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} feedback entries?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('feedback').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading feedback...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="feedback"
        title="User Feedback"
        onCreate={() => setShowForm(true)}
        onView={setViewItem}
        onEdit={(item) => { setEditItem(item); setShowForm(true) }}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditItem(null) }}
        onSubmit={editItem ? handleEdit : handleCreate}
        title={editItem ? 'Edit Feedback' : 'Add Feedback'}
        fields={formFields}
        initialValues={editItem || { reviewed: false }}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Feedback Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
