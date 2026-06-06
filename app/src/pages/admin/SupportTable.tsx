import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'email', label: 'Email' },
  { key: 'subject', label: 'Subject' },
  { key: 'issue_type', label: 'Issue Type' },
  { key: 'details', label: 'Details' },
  { key: 'status', label: 'Status' },
  { key: 'attachments', label: 'Attachments', type: 'list' as const },
  { key: 'created_at', label: 'Created', type: 'date' as const },
  { key: 'updated_at', label: 'Updated', type: 'date' as const },
]

export default function SupportTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: newData } = await supabase.from('support_tickets').select('*').order('created_at', { ascending: false })
    if (newData) setData(newData)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'subject', label: 'Subject', type: 'text', required: true },
    { key: 'issue_type', label: 'Issue Type', type: 'select', options: [
      { value: 'bug', label: 'Bug Report' },
      { value: 'feature', label: 'Feature Request' },
      { value: 'billing', label: 'Billing Issue' },
      { value: 'other', label: 'Other' },
    ]},
    { key: 'details', label: 'Details', type: 'textarea', required: true },
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: 'open', label: 'Open' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'closed', label: 'Closed' },
    ]},
  ]

  const statusColors: Record<string, string> = {
    open: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
  }

  const columns = [
    { key: 'subject', header: 'Subject' },
    { key: 'email', header: 'Email' },
    { key: 'issue_type', header: 'Type', render: (item: any) => item.issue_type || '-' },
    { 
      key: 'status', 
      header: 'Status', 
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || statusColors.open}`}>
          {(item.status || 'open').replace('_', ' ').toUpperCase()}
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
    const { error } = await supabase.from('support_tickets').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('support_tickets').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return
    const { error } = await supabase.from('support_tickets').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} tickets?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('support_tickets').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading support tickets...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="email"
        title="Support Tickets"
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
        title={editItem ? 'Edit Ticket' : 'Add Ticket'}
        fields={formFields}
        initialValues={editItem || { status: 'open' }}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Ticket Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
