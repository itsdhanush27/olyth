import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'company', label: 'Company' },
  { key: 'team_size', label: 'Team Size' },
  { key: 'message', label: 'Message' },
  { key: 'contacted', label: 'Contacted', type: 'boolean' as const },
  { key: 'created_at', label: 'Date', type: 'date' as const },
]

export default function SalesTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: newData } = await supabase.from('sales_inquiries').select('*').order('created_at', { ascending: false })
    if (newData) setData(newData)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'first_name', label: 'First Name', type: 'text', required: true },
    { key: 'last_name', label: 'Last Name', type: 'text', required: true },
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'team_size', label: 'Team Size', type: 'select', options: [
      { value: '1-10', label: '1-10 employees' },
      { value: '11-50', label: '11-50 employees' },
      { value: '51-200', label: '51-200 employees' },
      { value: '201+', label: '201+ employees' },
    ]},
    { key: 'message', label: 'Message', type: 'textarea' },
    { key: 'contacted', label: 'Contacted', type: 'checkbox' },
  ]

  const columns = [
    { key: 'name', header: 'Name', render: (item: any) => `${item.first_name} ${item.last_name}` },
    { key: 'email', header: 'Email' },
    { key: 'company', header: 'Company', render: (item: any) => item.company || '-' },
    { key: 'contacted', header: 'Contacted', render: (item: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.contacted ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {item.contacted ? 'Yes' : 'No'}
      </span>
    )},
    { 
      key: 'created_at', 
      header: 'Date', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const { error } = await supabase.from('sales_inquiries').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('sales_inquiries').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return
    const { error } = await supabase.from('sales_inquiries').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} inquiries?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('sales_inquiries').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading sales inquiries...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="email"
        title="Sales Inquiries"
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
        title={editItem ? 'Edit Inquiry' : 'Add Inquiry'}
        fields={formFields}
        initialValues={editItem || {}}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Inquiry Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
