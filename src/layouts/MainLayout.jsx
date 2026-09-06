import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useLenis } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar, FloatingCartTrigger } from '@/features/cart'
import { QuotationModal } from '@/features/quotation'

function ScrollToTopOnNavigate() {
  const location = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    // If navigating to an in-page hash anchor, let anchor handling take over
    if (location.hash) return

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash, lenis])

  return null
}

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
      <ScrollToTopOnNavigate />
      <LegacyHashRedirector />

      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />

      <CartSidebar />
      <FloatingCartTrigger />
      <QuotationModal />
    </div>
  )
}
