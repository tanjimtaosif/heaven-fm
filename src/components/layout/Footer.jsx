import { useLenis } from '@/components/providers'
import { COMPANY_INFO } from '@/constants/companyData'
import heavenLogo from '@/assets/logo/heaven_logo.svg'
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'

// Exponential ease-out matching the studio Lenis configuration
const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))

// Social Brand Vector Glyphs for luxury dark aesthetics
const SocialIcon = ({ type }) => {
  if (type === 'facebook') {
    return (
      <svg
        className="h-4 w-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )
  }
  if (type === 'instagram') {
    return (
      <svg
        className="h-4 w-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
  if (type === 'youtube') {
    return (
      <svg
        className="h-4 w-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  return null
}

export const Footer = () => {
  const lenis = useLenis()

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    if (!targetId || targetId === '#') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.4, easing: easeOutExpo })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    const element = document.querySelector(targetId)
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -90,
          duration: 1.4,
          easing: easeOutExpo,
        })
      } else {
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - 90
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="bg-charcoal-deep text-canvas border-charcoal-border/60 relative overflow-hidden border-t pt-20 pb-12">
      {/* Architectural Ambient Lighting & Gold Gradient Accent */}
      <div
        aria-hidden="true"
        className="via-brass/45 pointer-events-none absolute top-0 left-1/2 h-[1px] w-3/4 max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-brass/10 via-brass/[0.02] pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Atelier & Official Logo (Span 4) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Official SVG Logo */}
            <div>
              <a
                href="#"
                onClick={(e) => handleSmoothScroll(e, '#')}
                className="group focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep inline-block rounded-md focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                aria-label="Heaven Furniture Mart — Return to top"
              >
                <img
                  src={heavenLogo}
                  alt="Heaven Furniture Mart"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-12"
                />
              </a>

              {/* Tagline */}
              <p className="text-brass mt-2.5 text-xs font-medium tracking-[0.28em] uppercase">
                {COMPANY_INFO.tagline}
              </p>
            </div>

            {/* Atelier Descriptor */}
            <p className="text-text-inverse-muted max-w-md text-sm leading-relaxed">
              Chattogram's premier bespoke interior atelier. We conceptualize,
              tailor, and handcraft architectural furniture pieces designed
              around your space, proportions, and lifestyle.
            </p>

            {/* Curated Trust & Heritage Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="border-charcoal-border/80 bg-charcoal-surface/80 text-brass-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-xs">
                <Award className="text-brass h-3.5 w-3.5" />
                BFIOA Recognized
              </span>
              <span className="border-charcoal-border/80 bg-charcoal-surface/80 text-brass-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-xs">
                <ShieldCheck className="text-brass h-3.5 w-3.5" />
                Chamber of Commerce
              </span>
              <span className="border-charcoal-border/80 bg-charcoal-surface/80 text-text-inverse-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                Est. {COMPANY_INFO.foundedYear}
              </span>
            </div>
          </div>

          {/* Column 2: Bespoke Collections (Span 2) */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-canvas font-serif text-base font-semibold tracking-wide">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_INFO.categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#collections"
                    onClick={(e) => handleSmoothScroll(e, '#collections')}
                    className="group text-text-inverse-muted hover:text-brass inline-flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <span className="bg-charcoal-border group-hover:bg-brass h-1 w-1 rounded-full transition-all duration-300 group-hover:w-2.5" />
                    <span>{cat.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The Atelier & Discovery (Span 2) */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-canvas font-serif text-base font-semibold tracking-wide">
              The Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleSmoothScroll(e, '#why-us')}
                  className="group text-text-inverse-muted hover:text-brass inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span className="bg-charcoal-border group-hover:bg-brass h-1 w-1 rounded-full transition-all duration-300 group-hover:w-2.5" />
                  <span>The Studio Story</span>
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleSmoothScroll(e, '#why-us')}
                  className="group text-text-inverse-muted hover:text-brass inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span className="bg-charcoal-border group-hover:bg-brass h-1 w-1 rounded-full transition-all duration-300 group-hover:w-2.5" />
                  <span>The Heaven Difference</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleSmoothScroll(e, '#faq')}
                  className="group text-text-inverse-muted hover:text-brass inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span className="bg-charcoal-border group-hover:bg-brass h-1 w-1 rounded-full transition-all duration-300 group-hover:w-2.5" />
                  <span>Bespoke FAQ</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, '#contact')}
                  className="group text-text-inverse-muted hover:text-brass inline-flex items-center gap-1.5 transition-colors duration-200"
                >
                  <span className="bg-charcoal-border group-hover:bg-brass h-1 w-1 rounded-full transition-all duration-300 group-hover:w-2.5" />
                  <span>Book Consultation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Location & Inquiries (Minimal & Elegant, Span 4) */}
          <div className="space-y-4 lg:col-span-4">
            <h4 className="text-canvas font-serif text-base font-semibold tracking-wide">
              Visit Our Studio
            </h4>
            <div className="text-text-inverse-muted space-y-3.5 text-sm">
              {/* Studio Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="text-brass mt-1 h-4 w-4 shrink-0" />
                <div>
                  <p className="text-canvas/90 leading-snug">
                    {COMPANY_INFO.location}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Heaven+Furniture+Mart+Agrabad+Access+Road+Chattogram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brass hover:text-brass-hover inline-flex items-center gap-1 pt-1 text-xs transition-colors"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <Phone className="text-brass h-4 w-4 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                  className="hover:text-brass tracking-wide transition-colors"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>

              {/* Direct Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="text-brass h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="hover:text-brass truncate transition-colors"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </div>

              {/* WhatsApp Concierge */}
              <div className="flex items-center gap-2.5">
                <MessageSquare className="text-brass h-4 w-4 shrink-0" />
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass hover:text-brass-hover inline-flex items-center gap-1 transition-colors"
                >
                  <span>WhatsApp Design Concierge</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Atelier Pillars Bar */}
        <div className="border-charcoal-border/50 border-t py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="border-charcoal-border bg-charcoal-surface/60 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-canvas text-xs font-semibold tracking-wide">
                  Free Spatial Consultation
                </p>
                <p className="text-text-inverse-muted text-[11px]">
                  Tailored to your interior blueprints
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="border-charcoal-border bg-charcoal-surface/60 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-canvas text-xs font-semibold tracking-wide">
                  100% Bespoke Joinery
                </p>
                <p className="text-text-inverse-muted text-[11px]">
                  Seasoned solid hardwoods & fine textiles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="border-charcoal-border bg-charcoal-surface/60 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-canvas text-xs font-semibold tracking-wide">
                  White-Glove Installation
                </p>
                <p className="text-text-inverse-muted text-[11px]">
                  Direct assembly by master craftsmen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Social Presence & Back to Top */}
        <div className="border-charcoal-border/50 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Left: Copyright & Heritage Seal */}
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-text-inverse-muted text-xs">
                © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
                reserved.
              </p>
              <p className="text-text-inverse-muted/70 text-[11px] tracking-wide">
                Agrabad Access Road, Chattogram, Bangladesh • Luxury Bespoke
                Interiors
              </p>
            </div>

            {/* Center: Luxury Social Media Links */}
            <div className="flex items-center gap-2.5">
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Heaven Furniture Mart on Facebook"
                className="border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:bg-brass hover:text-charcoal-deep flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
              >
                <SocialIcon type="facebook" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Heaven Furniture Mart on Instagram"
                className="border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:bg-brass hover:text-charcoal-deep flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
              >
                <SocialIcon type="instagram" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Heaven Furniture Mart on YouTube"
                className="border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:bg-brass hover:text-charcoal-deep flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105"
              >
                <SocialIcon type="youtube" />
              </a>
            </div>

            {/* Right: Smooth Back to Top Action */}
            <div>
              <button
                type="button"
                onClick={(e) => handleSmoothScroll(e, '#')}
                className="group border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:text-brass focus-visible:ring-brass inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Back to Top"
              >
                <span>Back to Top</span>
                <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
