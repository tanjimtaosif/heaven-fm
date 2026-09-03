import { COMPANY_INFO } from '@/constants/companyData'
import { Button, Badge } from '@/components/ui'
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react'

export const HeroSection = () => {
  return (
    <section className="relative flex h-dvh min-h-150 w-full flex-col items-center justify-center overflow-hidden pt-20 pb-[18vh] sm:pt-24">
      {/* Subtle warm ambient background blur */}
      <div className="bg-brass/10 pointer-events-none absolute top-0 right-1/4 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-charcoal-surface/5 pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full blur-3xl" />

      {/* Main Hero Center Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
          <div className="inline-flex">
            <Badge variant="brass" className="text-xs">
              <Sparkles className="text-brass h-3.5 w-3.5" />
              {COMPANY_INFO.hero.badge}
            </Badge>
          </div>

          <h1 className="text-charcoal-deep font-serif text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {COMPANY_INFO.hero.headline}
          </h1>

          <p className="text-text-secondary mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
            {COMPANY_INFO.hero.subheadline}
          </p>

          {/* Clear Conversion CTA with Luxe Satin Shimmer & Text Rolling */}
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Button
              as="a"
              href={COMPANY_INFO.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="primary"
              animation="shimmer"
              textRoll={true}
              rollType="stagger"
              className="w-full sm:w-auto"
            >
              <MessageSquare className="text-brass h-4 w-4" />
              {COMPANY_INFO.hero.primaryCta}
            </Button>

            <Button
              as="a"
              href="#collections"
              size="lg"
              variant="outline"
              animation="slide-arrow"
              textRoll={true}
              rollType="phrase"
              className="w-full sm:w-auto"
            >
              {COMPANY_INFO.hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Trust Bar — commented out for scroll video reveal section
          <div className="text-text-secondary flex flex-wrap items-center justify-center gap-6 pt-4 sm:pt-6 text-xs">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="text-brass h-4 w-4" />
              Agrabad Showroom in Chattogram
            </span>
            <span className="text-border-subtle hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="text-brass h-4 w-4" />
              Free Design Consultation
            </span>
            <span className="text-border-subtle hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="text-brass h-4 w-4" />
              Delivery &amp; Installation Included
            </span>
          </div>
          */}
        </div>
      </div>

      {/* Infinite Carousel Marquee — commented out for scroll video reveal section
      <Marquee items={MARQUEE_ITEMS} className="mt-auto z-10" />
      */}
    </section>
  )
}
