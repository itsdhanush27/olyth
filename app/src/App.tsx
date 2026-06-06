import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingWidget from '@/components/FloatingWidget'
import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import Careers from '@/pages/Careers'
import OlythAcademy from '@/pages/OlythAcademy'
import Waitlist from '@/pages/Waitlist'
import SignIn from '@/pages/SignIn'
import Pricing from '@/pages/Pricing'
import ProductPage from '@/pages/ProductPage'
import FeaturePage from '@/pages/FeaturePage'
import ResourcePage from '@/pages/ResourcePage'
import ToolsPage from '@/pages/ToolsPage'
import AdminDashboard from '@/pages/AdminDashboard'

export default function App() {
  const location = useLocation()
  
  // Don't show nav and footer on admin dashboard
  const isAdminPage = location.pathname === '/admin'
  
  return (
    <div className="min-h-[100dvh] flex flex-col overflow-x-hidden">
      {!isAdminPage && <Navigation />}
      <div className="flex-1">
        <Routes key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources/careers" element={<Careers />} />
          <Route path="/resources/academy" element={<OlythAcademy />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/tools/:toolId" element={<ToolsPage />} />
          <Route path="/features/:featureId" element={<FeaturePage />} />
          <Route path="/resources/:resourceId" element={<ResourcePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingWidget />}
    </div>
  )
}
