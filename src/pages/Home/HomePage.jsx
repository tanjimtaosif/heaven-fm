import { AtelierBackdrop } from '@/components/layout/AtelierBackdrop'
import {
  HeroSection,
  ScrollVideoRevealSection,
  ManifestoSection,
  CollectionsSection,
  PopularFurnituresSection,
  WhyChooseUsSection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from '@/features/home'
import { useIsDesktop } from '@/hooks'

export function HomePage() {
  const isDesktop = useIsDesktop()

  return (
    <>
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
  )
}
