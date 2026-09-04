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
  CalendarCheck,
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

// Shared presentation primitives keep every column visually consistent
const columnHeadingClass =
  'text-canvas font-serif text-[13px] font-semibold tracking-[0.16em] uppercase sm:text-base sm:tracking-wide sm:normal-case'

const navLinkClass =
  'group text-text-inverse-muted hover:text-brass inline-flex items-center gap-2 py-0.5 text-[13px] transition-colors duration-200 sm:text-sm'

const LinkBullet = () => (
  <span
    aria-hidden="true"
    className="bg-charcoal-border group-hover:bg-brass h-1 w-1 shrink-0 rounded-full transition-all duration-300 group-hover:w-2.5"
  />
)

const socialActionClass =
  'border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:bg-brass hover:text-charcoal-deep focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'

const badgeBaseClass =
  'border-charcoal-border/80 bg-charcoal-surface/80 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs'

const STUDIO_LINKS = [
  { label: 'The Studio Story', target: '#why-us' },
  { label: 'The Heaven Difference', target: '#why-us' },
  { label: 'Bespoke FAQ', target: '#faq' },
  { label: 'Book Consultation', target: '#contact' },
]

const ATELIER_PILLARS = [
  {
    icon: Sparkles,
    title: 'Free Spatial Consultation',
    detail: 'Tailored to your interior blueprints',
  },
  {
    icon: ShieldCheck,
    title: '100% Bespoke Joinery',
    detail: 'Seasoned solid hardwoods & fine textiles',
  },
  {
    icon: CheckCircle2,
    title: 'White-Glove Installation',
    detail: 'Direct assembly by master craftsmen',
  },
]

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
    <footer className="bg-charcoal-deep text-canvas border-charcoal-border/60 relative overflow-hidden border-t pt-14 pb-8 sm:pt-16 sm:pb-10">
      {/* Architectural Ambient Lighting & Gold Gradient Accent */}
      <div
        aria-hidden="true"
        className="via-brass/45 pointer-events-none absolute top-0 left-1/2 h-[1px] w-3/4 max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-brass/10 via-brass/[0.02] pointer-events-none absolute -top-24 left-1/2 h-72 w-[680px] max-w-[140vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-12 lg:gap-8 lg:pb-12">
          {/* Column 1: Brand Atelier & Official Logo (Span 4) */}
          <div className="col-span-2 space-y-5 lg:col-span-4">
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
                  className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-11"
                />
              </a>

              {/* Tagline */}
              <p className="text-brass mt-2.5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-xs sm:tracking-[0.28em]">
                {COMPANY_INFO.tagline}
              </p>
            </div>

            {/* Atelier Descriptor */}
            <p className="text-text-inverse-muted max-w-md text-[13px] leading-relaxed sm:text-sm">
              Chattogram&apos;s premier bespoke interior atelier. We
              conceptualize, tailor, and handcraft architectural furniture
              pieces designed around your space, proportions, and lifestyle.
            </p>

            {/* Curated Trust & Heritage Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`${badgeBaseClass} text-brass-border`}>
                <Award className="text-brass h-3.5 w-3.5 shrink-0" />
                BFIOA Recognized
              </span>
              <span className={`${badgeBaseClass} text-brass-border`}>
                <ShieldCheck className="text-brass h-3.5 w-3.5 shrink-0" />
                Chamber of Commerce
              </span>
              <span className={`${badgeBaseClass} text-text-inverse-muted`}>
                Est. {COMPANY_INFO.foundedYear}
              </span>
            </div>
          </div>

          {/* Column 2: Bespoke Collections (Span 2) */}
          <div className="col-span-1 space-y-4 lg:col-span-2">
            <h4 className={columnHeadingClass}>Collections</h4>
            <ul className="space-y-2.5">
              {COMPANY_INFO.categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#collections"
                    onClick={(e) => handleSmoothScroll(e, '#collections')}
                    className={navLinkClass}
                  >
                    <LinkBullet />
                    <span>{cat.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: The Atelier & Discovery (Span 3) */}
          <div className="col-span-1 space-y-4 lg:col-span-3">
            <h4 className={columnHeadingClass}>The Studio</h4>
            <ul className="space-y-2.5">
              {STUDIO_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.target}
                    onClick={(e) => handleSmoothScroll(e, link.target)}
                    className={navLinkClass}
                  >
                    <LinkBullet />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Studio Location & Inquiries (Span 3) */}
          <div className="col-span-2 space-y-4 lg:col-span-3">
            <h4 className={columnHeadingClass}>Visit Our Studio</h4>
            <div className="text-text-inverse-muted space-y-3.5 text-[13px] sm:text-sm">
              {/* Studio Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="text-brass mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0">
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
                    <ArrowUpRight className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="text-brass h-4 w-4 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                  className="hover:text-brass tracking-wide transition-colors"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>

              {/* Direct Email */}
              <div className="flex min-w-0 items-center gap-2.5">
                <Mail className="text-brass h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.contact.email}`}
                  className="hover:text-brass min-w-0 truncate transition-colors"
                >
                  {COMPANY_INFO.contact.email}
                </a>
              </div>

              {/* WhatsApp Concierge */}
              <div className="flex items-start gap-2.5">
                <MessageSquare className="text-brass mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass hover:text-brass-hover inline-flex items-center gap-1 transition-colors"
                >
                  <span>WhatsApp Design Concierge</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0" />
                </a>
              </div>
            </div>

            {/* Consultation Action — anchors the column and closes the gap */}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, '#contact')}
              className="group border-brass/45 text-brass hover:border-brass hover:bg-brass hover:text-charcoal-deep focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              <span>Book a Design Consultation</span>
            </a>
          </div>
        </div>

        {/* Signature Atelier Pillars Bar */}
        <div className="border-charcoal-border/50 border-t py-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {ATELIER_PILLARS.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="border-charcoal-border bg-charcoal-surface/60 text-brass flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-canvas text-xs font-semibold tracking-wide">
                    {title}
                  </p>
                  <p className="text-text-inverse-muted text-[11px] leading-snug">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Social Presence & Back to Top */}
        <div className="border-charcoal-border/50 border-t pt-7">
          {/* Equal thirds on desktop keep the social row optically dead-centred */}
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3 sm:gap-4">
            {/* Left: Copyright & Heritage Seal */}
            <div className="order-2 space-y-1 text-center sm:order-1 sm:text-left">
              <p className="text-text-inverse-muted text-[11px] sm:text-xs">
                © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
                reserved.
              </p>
              <p className="text-text-inverse-muted/70 text-[11px] tracking-wide">
                Luxury Bespoke Interiors • Chattogram
              </p>
            </div>

            {/* Center: Luxury Social Media Links */}
            <div className="order-1 flex items-center justify-center gap-3 sm:order-2">
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Heaven Furniture Mart on Facebook"
                className={socialActionClass}
              >
                <SocialIcon type="facebook" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Heaven Furniture Mart on Instagram"
                className={socialActionClass}
              >
                <SocialIcon type="instagram" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Heaven Furniture Mart on YouTube"
                className={socialActionClass}
              >
                <SocialIcon type="youtube" />
              </a>
            </div>

            {/* Right: Smooth Back to Top Action */}
            <div className="order-3 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={(e) => handleSmoothScroll(e, '#')}
                className="group border-charcoal-border bg-charcoal-surface/60 text-text-inverse-muted hover:border-brass hover:text-brass focus-visible:ring-brass focus-visible:ring-offset-charcoal-deep inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
