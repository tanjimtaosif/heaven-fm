import { SmoothScrollProvider } from '@/components/providers'
import { CartProvider } from '@/context'
import { Navbar } from '@/components/layout/Navbar'
import { AtelierBackdrop } from '@/components/layout/AtelierBackdrop'
import { Footer } from '@/components/layout/Footer'
import { CartSidebar, FloatingCartTrigger } from '@/components/cart'
import { useIsDesktop } from '@/hooks'
import {
  HeroSection,
  ScrollVideoRevealSection,
  ManifestoSection,
  CollectionsSection,
  WhyChooseUsSection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from '@/components/sections'

export default function App() {
  // The pinned, scroll-driven film only earns its 180vh on large screens.
  // Below lg the same film plays inline inside the hero instead.
  const isDesktop = useIsDesktop()

  return (
    <SmoothScrollProvider>
      <CartProvider>
        <div className="bg-canvas text-text-primary selection:bg-brass/20 flex min-h-screen flex-col font-sans antialiased">
          {/* Studio Header */}
          <Navbar />

          {/* Main Content Sections */}
          <main className="grow">
            {/* The hero and the scroll-reveal film share one continuous ground
                so they read as a single space, not two stacked sections.
                No overflow clipping here — the film section pins with
                position: sticky and needs this scroll container intact. */}
            <div className="relative">
              <AtelierBackdrop />
              <HeroSection />
              {isDesktop && <ScrollVideoRevealSection />}
            </div>

            <ManifestoSection />
            <CollectionsSection />
            <WhyChooseUsSection />
            <TestimonialsSection />
            <FaqSection />
            <ContactSection />
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
