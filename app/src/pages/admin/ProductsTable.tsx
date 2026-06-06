import { useState, useEffect } from 'react'
import { DataTable } from '@/components/admin/ui/DataTable'
import { FormModal } from '@/components/admin/ui/FormModal'
import type { FormField } from '@/components/admin/ui/FormModal'
import { DetailModal } from '@/components/admin/ui/DetailModal'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'

const detailFields = [
  { key: 'name', label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'category_name', label: 'Category' },
  { key: 'images', label: 'Images', type: 'list' as const },
  { key: 'created_at', label: 'Created', type: 'date' as const },
  { key: 'updated_at', label: 'Updated', type: 'date' as const },
]

export default function ProductsTable() {
  const [data, setData] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [productsRes, categoriesRes] = await Promise.all([
      supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name')
    ])
    
    if (productsRes.data) setData(productsRes.data)
    if (categoriesRes.data) setCategories(categoriesRes.data)
    
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'name', label: 'Product Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'price', label: 'Price ($)', type: 'number', required: true },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'category_id', label: 'Category', type: 'select', options: categories.map(c => ({ value: c.id, label: c.name })) },
  ]

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'category', header: 'Category', render: (item: any) => item.categories?.name || '-' },
    { key: 'price', header: 'Price', render: (item: any) => `$${Number(item.price).toFixed(2)}` },
    { key: 'stock', header: 'Stock', render: (item: any) => item.stock ?? 0 },
    { 
      key: 'created_at', 
      header: 'Created', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const payload: any = { ...formData, price: Number(formData.price), stock: Number(formData.stock || 0) }
    if (!payload.category_id) delete payload.category_id
    const { error } = await supabase.from('products').insert(payload)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const payload: any = { ...formData, price: Number(formData.price), stock: Number(formData.stock || 0) }
    if (!payload.category_id) payload.category_id = null
    const { error } = await supabase.from('products').update(payload).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} products?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('products').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  const viewDetailFields = [
    ...detailFields.slice(0, 1),
    { key: 'category_name', label: 'Category' },
    ...detailFields.slice(1),
  ]

  if (loading) return <div className="p-8 text-center text-gray-500">Loading products...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="name"
        title="Products"
        onCreate={() => setShowForm(true)}
        onView={(item) => setViewItem({ ...item, category_name: item.categories?.name || '-' })}
        onEdit={(item) => { setEditItem(item); setShowForm(true) }}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
      />

      <FormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditItem(null) }}
        onSubmit={editItem ? handleEdit : handleCreate}
        title={editItem ? 'Edit Product' : 'Add Product'}
        fields={formFields}
        initialValues={editItem ? {
          name: editItem.name,
          description: editItem.description,
          price: editItem.price,
          stock: editItem.stock,
          category_id: editItem.category_id,
        } : {}}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Product Details"
        data={viewItem}
        fields={viewDetailFields}
      />
    </>
  )
}
