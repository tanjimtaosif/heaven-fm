import { COMPANY_INFO } from '@/constants/companyData'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-charcoal-deep text-canvas border-charcoal-subtle border-t pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-charcoal-muted grid grid-cols-1 gap-12 border-b pb-16 md:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-5">
            <div>
              <span className="text-canvas font-serif text-2xl font-bold tracking-tight">
                {COMPANY_INFO.name}
              </span>
              <p className="text-brass mt-1 text-xs font-medium tracking-[0.25em] uppercase">
                {COMPANY_INFO.tagline}
              </p>
            </div>
            <p className="text-text-inverse-muted max-w-sm text-sm leading-relaxed">
              Chattogram's leading bespoke furniture atelier. Creating timeless,
              architecturally harmonious custom furniture pieces crafted
              specifically around you.
            </p>
            <div className="pt-2">
              <span className="bg-charcoal-surface border-charcoal-border text-brass-border inline-block rounded-full border px-3 py-1 text-xs font-medium">
                BFIOA Recognized • Member Chamber of Commerce
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-canvas font-serif text-base font-semibold">
              Collections
            </h4>
            <ul className="text-text-inverse-muted space-y-2 text-sm">
              {COMPANY_INFO.categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#collections"
                    className="hover:text-brass transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Location & Direct Contact */}
          <div className="space-y-4 md:col-span-4">
            <h4 className="text-canvas font-serif text-base font-semibold">
              Visit Our Studio
            </h4>

            <div className="text-text-inverse-muted flex items-start gap-3 text-sm">
              <MapPin className="text-brass mt-0.5 h-5 w-5 shrink-0" />
              <span>{COMPANY_INFO.location}</span>
            </div>

            <div className="text-text-inverse-muted flex items-center gap-3 text-sm">
              <Phone className="text-brass h-4 w-4 shrink-0" />
              <a
                href={`tel:${COMPANY_INFO.contact.phoneClean}`}
                className="hover:text-brass transition-colors"
              >
                {COMPANY_INFO.contact.phone}
              </a>
            </div>

            <div className="text-text-inverse-muted flex items-center gap-3 text-sm">
              <Mail className="text-brass h-4 w-4 shrink-0" />
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                className="hover:text-brass transition-colors"
              >
                {COMPANY_INFO.contact.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse-muted hover:text-brass flex items-center gap-1 text-xs tracking-wider uppercase"
              >
                Facebook <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse-muted hover:text-brass flex items-center gap-1 text-xs tracking-wider uppercase"
              >
                Instagram <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-inverse-muted hover:text-brass flex items-center gap-1 text-xs tracking-wider uppercase"
              >
                YouTube <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-text-inverse-muted/70 flex flex-col items-center justify-between gap-4 pt-8 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
            reserved.
          </p>
          <p className="tracking-wide">
            Chattogram, Bangladesh • Luxury Bespoke Interiors
          </p>
        </div>
      </div>
    </footer>
  )
}
