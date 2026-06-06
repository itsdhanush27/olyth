import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer_name', label: 'Customer' },
  { key: 'total_amount', label: 'Total Amount' },
  { key: 'status', label: 'Status' },
  { key: 'items', label: 'Order Items', type: 'list' as const },
  { key: 'created_at', label: 'Order Date', type: 'date' as const },
]

export default function OrdersTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, profiles(first_name, last_name, email)')
      .order('created_at', { ascending: false })
      
    if (orders && !error) setData(orders)
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'status', label: 'Order Status', type: 'select', options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Processing' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ]},
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const columns = [
    { key: 'id', header: 'Order ID', render: (item: any) => item.id.substring(0, 8).toUpperCase() },
    { key: 'customer', header: 'Customer', render: (item: any) => item.profiles ? `${item.profiles.first_name || ''} ${item.profiles.last_name || ''}`.trim() || item.profiles.email : '-' },
    { key: 'total_amount', header: 'Total', render: (item: any) => `$${Number(item.total_amount).toFixed(2)}` },
    { 
      key: 'status', 
      header: 'Status', 
      render: (item: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || 'bg-gray-100'}`}>
          {(item.status || 'pending').replace('_', ' ').toUpperCase()}
        </span>
      )
    },
    { 
      key: 'created_at', 
      header: 'Date', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('orders').update({ status: formData.status }).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    const { error } = await supabase.from('orders').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} orders?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('orders').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  const handleView = async (item: any) => {
    // Fetch order items when viewing
    const { data: items } = await supabase
      .from('order_items')
      .select('*, products(name)')
      .eq('order_id', item.id)
      
    const formattedItems = items?.map(i => `${i.quantity}x ${i.products?.name || 'Unknown'} - $${i.price}`) || []
    
    setViewItem({
      ...item,
      customer_name: item.profiles ? `${item.profiles.first_name || ''} ${item.profiles.last_name || ''} (${item.profiles.email})` : 'Unknown',
      items: formattedItems
    })
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="id"
        title="Orders"
        onView={handleView}
        onEdit={(item) => { setEditItem(item); setShowForm(true) }}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditItem(null) }}
        onSubmit={handleEdit}
        title="Update Order Status"
        fields={formFields}
        initialValues={editItem ? { status: editItem.status } : {}}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Order Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
