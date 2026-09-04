import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import { COMPANY_INFO } from '@/constants/companyData'

export const BespokeCalloutCard = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${encodeURIComponent(
    'Hello Heaven Furniture Mart atelier, I would like to inquire about a custom bespoke furniture piece with custom dimensions.'
  )}`

  return (
    <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-deep p-6 text-canvas shadow-xl sm:p-7">
      {/* Subtle Grain Background Accent */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-brass/10 blur-3xl" />

      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-brass uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Bespoke Atelier</span>
        </div>

        <h3 className="mt-4 font-serif text-2xl font-normal leading-snug text-canvas sm:text-3xl">
          Need Custom Dimensions or Grain?
        </h3>

        <p className="mt-3 text-xs leading-relaxed text-text-inverse-muted sm:text-sm">
          Every interior has distinct architectural proportions. If our standard catalog
          pieces do not match your floor plan, our master carpenters will tailor any design
          to your exact millimeter specifications.
        </p>

        <ul className="mt-5 space-y-2 text-xs text-text-inverse-muted">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            <span>Seasoned Burma Teak & Kiln-Dried Mahogany</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            <span>Custom internal wardrobe & drawer layout</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            <span>Fabric, velvet & leather upholstery selection</span>
          </li>
        </ul>
      </div>

      <div className="mt-6 pt-5 border-t border-charcoal-border/80">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass py-3 text-xs font-semibold tracking-wider text-charcoal-deep uppercase transition-all duration-200 hover:bg-brass-hover active:scale-98 shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Request Custom Build</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
