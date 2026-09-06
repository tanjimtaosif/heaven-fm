import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  ClipboardList,
} from 'lucide-react'
import { COMPANY_INFO } from '@/constants/companyData'
import { useQuotation } from '@/features/quotation'

export const BespokeCalloutCard = () => {
  const { openQuotation } = useQuotation()

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.phoneClean.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello Heaven Furniture Mart atelier, I would like to inquire about a custom bespoke furniture piece with custom dimensions.'
  )}`

  return (
    <div
      data-bespoke-card
      className="border-charcoal-border bg-charcoal-deep text-canvas relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-xl sm:p-6 lg:p-7"
    >
      <div className="bg-brass/10 pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl" />

      <div>
        <div className="border-brass/30 bg-brass/10 text-brass text-label-sm inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold tracking-wider uppercase">
          <Sparkles className="h-3 w-3" />
          <span>Bespoke Atelier</span>
        </div>

        <h3 className="text-canvas mt-4 font-serif text-2xl leading-snug font-normal lg:text-3xl">
          Need Custom Dimensions or Grain?
        </h3>

        <p className="text-text-inverse-muted mt-3 text-xs leading-relaxed sm:text-sm">
          Every interior has distinct architectural proportions. If our standard
          catalog pieces do not match your floor plan, our master carpenters
          will tailor any design to your exact millimeter specifications.
        </p>

        <ul className="text-text-inverse-muted mt-5 space-y-2 text-xs">
          <li className="flex items-center gap-2">
            <span className="bg-brass h-1.5 w-1.5 rounded-full" />
            <span>Seasoned Burma Teak & Kiln-Dried Mahogany</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-brass h-1.5 w-1.5 rounded-full" />
            <span>Custom internal wardrobe & drawer layout</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-brass h-1.5 w-1.5 rounded-full" />
            <span>Fabric, velvet & leather upholstery selection</span>
          </li>
        </ul>
      </div>

      <div className="border-charcoal-border/80 mt-6 border-t pt-5">
        <button
          type="button"
          onClick={() =>
            openQuotation({
              categories: ['bespoke-commissions'],
              projectType: 'single-piece',
            })
          }
          className="bg-brass text-charcoal-deep hover:bg-brass-hover hover:text-white group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-98"
        >
          <ClipboardList className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span>Request Custom Build</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-inverse-muted hover:text-brass text-label-sm mt-2.5 inline-flex w-full items-center justify-center gap-1.5 font-medium transition-colors"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Or ask a quick question on WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
