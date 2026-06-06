import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { LogOut, Menu, X, LayoutDashboard, Users, MessageSquare, Ticket, Star, CreditCard, Package, Tag, ShoppingCart, Settings } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Import the new modular components
import WaitlistTable from './admin/WaitlistTable'
import SalesTable from './admin/SalesTable'
import SupportTable from './admin/SupportTable'
import FeedbackTable from './admin/FeedbackTable'
import SubscriptionsTable from './admin/SubscriptionsTable'
import ProductsTable from './admin/ProductsTable'
import CategoriesTable from './admin/CategoriesTable'
import OrdersTable from './admin/OrdersTable'
import SettingsView from './admin/SettingsView'

interface AdminUser {
  username: string
  email: string
  first_name: string
  last_name: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activePage, setActivePage] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {

      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        navigate('/signin')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', session.user.id)
        .single()

      if (profile && (profile.role === 'Admin' || profile.role === 'Super Admin')) {
        setAdminUser({
          username: session.user.email || '',
          email: session.user.email || '',
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
        })
      } else {
        await supabase.auth.signOut()
        navigate('/signin')
      }
    } catch (error) {
      console.error('Auth check error:', error)
      navigate('/signin')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'waitlist', label: 'Waitlist', icon: <Users size={18} /> },
    { id: 'sales', label: 'Sales Inquiries', icon: <MessageSquare size={18} /> },
    { id: 'support', label: 'Support Tickets', icon: <Ticket size={18} /> },
    { id: 'feedback', label: 'Feedback', icon: <Star size={18} /> },
    { id: 'subscriptions', label: 'Subscriptions', icon: <CreditCard size={18} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ]

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-full lg:w-64' : 'w-0'
        } bg-charcoal text-white transition-all duration-300 flex flex-col lg:flex ${
          sidebarOpen ? 'block' : 'hidden lg:flex'
        }`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="font-archivo text-2xl font-light text-orange">Olyth<span className="text-white text-lg ml-2">Admin</span></h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-700 p-2 rounded lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id)
                if (window.innerWidth < 1024) setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                activePage === item.id
                  ? 'bg-orange text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="mb-4 px-2">
            <p className="text-sm font-medium text-white truncate">{adminUser?.first_name} {adminUser?.last_name}</p>
            <p className="text-xs text-gray-400 truncate">{adminUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col h-screen">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-100 p-2 rounded-lg text-gray-600 transition-colors"
          >
            <Menu size={20} />
          </button>
          <h2 className="font-archivo text-xl font-medium text-charcoal capitalize">
            {navItems.find(item => item.id === activePage)?.label || activePage}
          </h2>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50">
          {activePage === 'dashboard' && <DashboardOverview />}
          {activePage === 'waitlist' && <WaitlistTable />}
          {activePage === 'sales' && <SalesTable />}
          {activePage === 'support' && <SupportTable />}
          {activePage === 'feedback' && <FeedbackTable />}
          {activePage === 'subscriptions' && <SubscriptionsTable />}
          {activePage === 'products' && <ProductsTable />}
          {activePage === 'categories' && <CategoriesTable />}
          {activePage === 'orders' && <OrdersTable />}
          {activePage === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  )
}

function DashboardOverview() {
  const [stats, setStats] = useState({
    waitlist: 0,
    sales: 0,
    support: 0,
    feedback: 0,
    subscriptions: 0,
    orders: 0,
    products: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [waitlistRes, salesRes, supportRes, feedbackRes, subscriptionsRes, ordersRes, productsRes] = await Promise.all([
        supabase.from('waitlist_entries').select('*', { count: 'exact', head: true }),
        supabase.from('sales_inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('support_tickets').select('*', { count: 'exact', head: true }),
        supabase.from('feedback').select('*', { count: 'exact', head: true }),
        supabase.from('subscriptions').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        waitlist: waitlistRes.count || 0,
        sales: salesRes.count || 0,
        support: supportRes.count || 0,
        feedback: feedbackRes.count || 0,
        subscriptions: subscriptionsRes.count || 0,
        orders: ordersRes.count || 0,
        products: productsRes.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading overview...</div>

  const statCards = [
    { title: 'Total Revenue', value: '$24,500', color: 'from-green-500 to-green-600' },
    { title: 'Orders', value: stats.orders, color: 'from-blue-500 to-blue-600' },
    { title: 'Subscriptions', value: stats.subscriptions, color: 'from-purple-500 to-purple-600' },
    { title: 'Waitlist', value: stats.waitlist, color: 'from-orange to-orange-dark' },
    { title: 'Support Tickets', value: stats.support, color: 'from-red-500 to-red-600' },
    { title: 'Products', value: stats.products, color: 'from-teal to-teal/80' },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg`}>
            <h3 className="text-white/80 text-sm font-medium mb-2">{stat.title}</h3>
            <p className="text-4xl font-light">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-lg font-medium text-charcoal mb-4">Welcome to Olyth Admin</h3>
        <p className="text-gray-600">
          This dashboard allows you to manage all aspects of the Olyth platform. Use the sidebar to navigate between different modules. 
          You can create, read, update, and delete records directly from the tables.
        </p>
      </div>
    </div>
  )
}
