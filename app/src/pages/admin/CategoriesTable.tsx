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
  { key: 'created_at', label: 'Created', type: 'date' as const },
]

export default function CategoriesTable() {
  const [data, setData] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [viewItem, setViewItem] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // Fetch categories with product count
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*, products(count)')
      .order('name')
    
    if (categories && !error) {
      const formatted = categories.map(c => ({
        ...c,
        product_count: c.products?.[0]?.count || 0
      }))
      setData(formatted)
    }
    setLoading(false)
  }

  const formFields: FormField[] = [
    { key: 'name', label: 'Category Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
  ]

  const columns = [
    { key: 'name', header: 'Category Name' },
    { key: 'description', header: 'Description', render: (item: any) => item.description ? (item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description) : '-' },
    { key: 'product_count', header: 'Products', render: (item: any) => item.product_count },
    { 
      key: 'created_at', 
      header: 'Created', 
      render: (item: any) => item.created_at ? format(new Date(item.created_at), 'MMM dd, yyyy') : '-' 
    },
  ]

  const handleCreate = async (formData: Record<string, any>) => {
    const { error } = await supabase.from('categories').insert(formData)
    if (error) throw error
    fetchData()
  }

  const handleEdit = async (formData: Record<string, any>) => {
    if (!editItem) return
    const { error } = await supabase.from('categories').update(formData).eq('id', editItem.id)
    if (error) throw error
    fetchData()
  }

  const handleDelete = async (item: any) => {
    if (!confirm('Are you sure you want to delete this category? Products in this category will NOT be deleted, but their category will be removed.')) return
    const { error } = await supabase.from('categories').delete().eq('id', item.id)
    if (!error) setData(data.filter(d => d.id !== item.id))
  }

  const handleBulkDelete = async (items: any[]) => {
    if (!confirm(`Are you sure you want to delete ${items.length} categories?`)) return
    const ids = items.map(i => i.id)
    const { error } = await supabase.from('categories').delete().in('id', ids)
    if (!error) setData(data.filter(d => !ids.includes(d.id)))
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading categories...</div>

  return (
    <>
      <DataTable 
        data={data} 
        columns={columns} 
        searchKey="name"
        title="Categories"
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
        title={editItem ? 'Edit Category' : 'Add Category'}
        fields={formFields}
        initialValues={editItem || {}}
      />

      <DetailModal
        isOpen={!!viewItem}
        onClose={() => setViewItem(null)}
        title="Category Details"
        data={viewItem}
        fields={detailFields}
      />
    </>
  )
}
