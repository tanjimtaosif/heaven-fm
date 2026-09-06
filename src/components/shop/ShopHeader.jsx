import { useState } from 'react'
import { Sparkles, ShieldCheck, Hammer, Clock, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ShopHeader = ({ totalCount = 0 }) => {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false)

  return (
    <header className="relative pt-6 pb-8 md:pt-10 md:pb-12">
      <div className="max-w-4xl">
        <div className="border-brass/30 bg-brass-light/60 text-brass-dark dark:bg-brass/10 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="text-brass h-3.5 w-3.5" />
          <span>Atelier Product Catalog</span>
        </div>

        <h1 className="text-text-primary mt-4 font-serif text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Architectural Furnishings
        </h1>

        <p className="text-text-secondary mt-3 text-base leading-relaxed sm:text-lg">
          Choose the piece that harmonizes with your interior. Handcrafted from
          seasoned Burma teak and kiln-dried mahogany, tailored to the exact
          proportions of your home.
        </p>

        <div className="mt-3">
          <button
            type="button"
            onClick={() => setIsStoryExpanded(!isStoryExpanded)}
            className="text-brass-dark decoration-brass/40 hover:text-text-primary inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium tracking-wide underline underline-offset-4 transition-colors"
            aria-expanded={isStoryExpanded}
          >
            <span>
              {isStoryExpanded
                ? 'Show less'
                : 'Read atelier standard & joinery notes'}
            </span>
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200',
                isStoryExpanded && 'rotate-180'
              )}
            />
          </button>

          {isStoryExpanded && (
            <div className="animate-fade-in border-border-subtle bg-surface-muted/50 text-text-secondary mt-3 rounded-2xl border p-4 text-xs leading-relaxed sm:text-sm">
              <p>
                Every piece in our catalog is built to order in our Narayanganj
                atelier. We eliminate MDF and commercial particle board in favor
                of sustainably sourced, kiln-dried solid hardwoods, traditional
                mortise-and-tenon joints, and durable satin wax or Italian
                polyurethane lacquers. Custom dimensional adjustments are
                available for every item.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="text-text-muted border-border-subtle/80 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <Hammer className="text-brass h-3.5 w-3.5" />
          <span className="text-text-secondary font-medium">
            Solid Hardwood Joinery
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="text-brass h-3.5 w-3.5" />
          <span className="text-text-secondary font-medium">
            10-Year Structural Guarantee
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="text-brass h-3.5 w-3.5" />
          <span className="text-text-secondary font-medium">
            Direct Atelier Lead Times
          </span>
        </div>
        <div className="text-text-muted ml-auto hidden text-xs font-medium sm:block">
          {totalCount}{' '}
          {totalCount === 1 ? 'piece available' : 'pieces available'}
        </div>
      </div>
    </header>
  )
}
