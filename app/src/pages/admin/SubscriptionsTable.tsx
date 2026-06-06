import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'email', label: 'Email' },
  { key: 'plan', label: 'Plan' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Started', type: 'date' as const },
  { key: 'updated_at', label: 'Last Updated', type: 'date' as const },
]

export default function SubscriptionsTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: newData } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false })
    if (newData) setData(newData)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'plan', label: 'Plan', type: 'select', options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ]},
    { key: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'past_due', label: 'Past Due' },
      { value: 'canceled', label: 'Canceled' },
      { value: 'trialing', label: 'Trialing' },
    ]},
  ]

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    past_due: 'bg-yellow-100 text-yellow-800',
    canceled: 'bg-red-100 text-red-800',
    trialing: 'bg-blue-100 text-blue-800',
  }

  const columns = [
    { key: 'email', header: 'Email' },
    { key: 'plan', header: 'Plan', render: (item: any) => <span className="capitalize">{item.plan}</span> },
    { 
      key: 'status', 
      header: 'Status', 
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || 'bg-gray-100'}`}>
          {(item.status || '').replace('_', ' ').toUpperCase()}
        </span>
      )
    },
    { 
      key: 'created_at', 
      header: 'Started', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const { error } = await supabase.from('subscriptions').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('subscriptions').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this subscription?')) return
    const { error } = await supabase.from('subscriptions').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} subscriptions?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('subscriptions').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading subscriptions...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="email"
        title="Subscriptions"
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
        title={editItem ? 'Edit Subscription' : 'Add Subscription'}
        fields={formFields}
        initialValues={editItem || { plan: 'free', status: 'active' }}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Subscription Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
