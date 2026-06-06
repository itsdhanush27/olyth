import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'email', label: 'Email' },
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'created_at', label: 'Date Joined', type: 'date' as const },
]

export default function WaitlistTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: newData } = await supabase.from('waitlist_entries').select('*').order('created_at', { ascending: false })
    if (newData) setData(newData)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'first_name', label: 'First Name', type: 'text' },
    { key: 'last_name', label: 'Last Name', type: 'text' },
    { key: 'company', label: 'Company Name', type: 'text' },
    { key: 'role', label: 'Job Role', type: 'text' },
  ]

  const columns = [
    { key: 'email', header: 'Email' },
    { key: 'name', header: 'Name', render: (item: any) => `${item.first_name || ''} ${item.last_name || ''}`.trim() || '-' },
    { key: 'company', header: 'Company', render: (item: any) => item.company || '-' },
    { key: 'role', header: 'Role', render: (item: any) => item.role || '-' },
    { 
      key: 'created_at', 
      header: 'Date', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const { error } = await supabase.from('waitlist_entries').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('waitlist_entries').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    const { error } = await supabase.from('waitlist_entries').delete().eq('id', item.id)
    if (error) {
      alert('Failed to delete: ' + error.message)
    } else {
      setData(data.filter(d => d.id !== item.id))
    }
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} entries?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('waitlist_entries').delete().in('id', ids)
    if (error) {
      alert('Failed to delete: ' + error.message)
    } else {
      setData(data.filter(d => !ids.includes(d.id)))
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading waitlist...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="email"
        title="Waitlist Entries"
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
        title={editItem ? 'Edit Waitlist Entry' : 'Add Waitlist Entry'}
        fields={formFields}
        initialValues={editItem || {}}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Waitlist Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
