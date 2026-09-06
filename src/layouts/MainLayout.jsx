import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar, FloatingCartTrigger } from '@/features/cart'

function LegacyHashRedirector() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/shop') || hash === '#shop') {
      const queryPart = hash.includes('?') ? hash.slice(hash.indexOf('?')) : ''
      navigate(`/shop${queryPart}`, { replace: true })
    }
  }, [navigate, location])

  return null
}

export function MainLayout() {
  return (
    <div className="bg-canvas text-text-primary selection:bg-brass/20 flex min-h-screen flex-col font-sans antialiased">
      <LegacyHashRedirector />

      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      <CartSidebar />
      <FloatingCartTrigger />
    </div>
  )
}
