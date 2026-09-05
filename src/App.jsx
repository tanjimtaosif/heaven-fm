import { useState, useEffect } from 'react'
import { SmoothScrollProvider } from '@/components/providers'
import { CartProvider } from '@/context'
import { Navbar } from '@/components/layout/Navbar'
import { AtelierBackdrop } from '@/components/layout/AtelierBackdrop'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar, FloatingCartTrigger } from '@/components/cart'
import { ShopPage } from '@/components/shop'
import { useIsDesktop } from '@/hooks'
import {
  HeroSection,
  ScrollVideoRevealSection,
  ManifestoSection,
  PopularFurnituresSection,
  CollectionsSection,
  WhyChooseUsSection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from '@/components/sections'

export default function App() {
  // Pinned scroll-driven film only runs on desktop
  const isDesktop = useIsDesktop()

  const [currentHash, setCurrentHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  )

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isShopView = currentHash.startsWith('#/shop') || currentHash === '#shop'

  // Extract category param if present, e.g. #/shop?category=bedroom
  let initialCategory = 'all'
  if (isShopView && currentHash.includes('?')) {
    const query = new URLSearchParams(currentHash.split('?')[1])
    const cat = query.get('category')
    if (cat) initialCategory = cat
  }

  const navigateToHome = () => {
    window.location.hash = '#'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <SmoothScrollProvider>
      <CartProvider>
        <div className="bg-canvas text-text-primary selection:bg-brass/20 flex min-h-screen flex-col font-sans antialiased">
          {/* Studio Header */}
          <Navbar isShopView={isShopView} onNavigateHome={navigateToHome} />

          {/* Main Content View */}
          <main className="grow">
            {isShopView ? (
              <ShopPage
                key={initialCategory}
                initialCategoryId={initialCategory}
                onNavigateHome={navigateToHome}
              />
            ) : (
              <>
                {/* The hero and scroll-reveal film share continuous background */}
                <div className="relative">
                  <AtelierBackdrop />
                  <HeroSection />
                  {isDesktop && <ScrollVideoRevealSection />}
                </div>

                <ManifestoSection />
                <CollectionsSection />
                <PopularFurnituresSection />
                <WhyChooseUsSection />
                <TestimonialsSection />
                <FaqSection />
                <ContactSection />
              </>
            )}
          </main>

          {/* Studio Footer */}
          <Footer />

          {/* Cart Sidebar Drawer & Floating Mobile Trigger */}
          <CartSidebar />
          <FloatingCartTrigger />
        </div>
      </CartProvider>
    </SmoothScrollProvider>
  )
}
