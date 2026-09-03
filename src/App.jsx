import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import {
  HeroSection,
  ScrollVideoRevealSection,
  ManifestoSection,
  CollectionsSection,
  ContactSection,
} from '@/components/sections'

export default function App() {
  return (
    <div className="bg-canvas text-text-primary selection:bg-brass/20 flex min-h-screen flex-col font-sans antialiased">
      {/* Studio Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="grow">
        <HeroSection />
        <ScrollVideoRevealSection />
        <ManifestoSection />
        <CollectionsSection />
        <ContactSection />
      </main>

      {/* Studio Footer */}
      <Footer />
    </div>
  )
}
