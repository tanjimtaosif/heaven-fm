import { useState, useMemo } from 'react'
import { useLenis } from '@/components/providers'
import { ProductCard } from './ProductCard'
import { BespokeCalloutCard } from './BespokeCalloutCard'
import { ChevronLeft, ChevronRight, SearchX, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 11

export const ProductGrid = ({
  products = [],
  onQuickView,
  onResetFilters,
  gridTopRef,
}) => {
  const lenis = useLenis()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    if (gridTopRef && gridTopRef.current) {
      if (lenis) {
        lenis.scrollTo(gridTopRef.current, { offset: -110, duration: 0.9 })
      } else {
        gridTopRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return products.slice(start, start + ITEMS_PER_PAGE)
  }, [products, currentPage])

  if (products.length === 0) {
    return (
      <div className="border-border-subtle bg-surface-muted/30 my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed p-12 text-center">
        <div className="bg-brass-light/80 text-brass-dark flex h-14 w-14 items-center justify-center rounded-full">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-text-primary mt-4 font-serif text-xl font-medium">
          No architectural pieces found
        </h3>
        <p className="text-text-secondary mt-1.5 max-w-sm text-xs sm:text-sm">
          We could not find any items matching your selected criteria. Try
          broadening your filters or searching for alternative timbers.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="bg-charcoal-deep text-brass hover:bg-charcoal-surface mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold shadow-sm transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Catalog Filters</span>
        </button>
      </div>
    )
  }

  const bespokeIndex = 5

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product, index) => {
          return (
            <div key={product.id} className="contents">
              {index === bespokeIndex && <BespokeCalloutCard />}
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          )
        })}

        {currentProducts.length <= bespokeIndex && <BespokeCalloutCard />}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Catalog Pagination"
          className="flex items-center justify-center gap-2 pt-6 pb-4"
        >
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={cn(
              'border-border-subtle bg-surface text-text-secondary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all',
              currentPage === 1
                ? 'cursor-not-allowed opacity-40'
                : 'hover:border-brass hover:text-brass'
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isCurrent = page === currentPage
            return (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={cn(
                  'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-all',
                  isCurrent
                    ? 'bg-brass text-charcoal-deep font-bold shadow-xs'
                    : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/50 hover:text-text-primary border'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {page}
              </button>
            )
          })}

          <button
            type="button"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className={cn(
              'border-border-subtle bg-surface text-text-secondary flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-all',
              currentPage === totalPages
                ? 'cursor-not-allowed opacity-40'
                : 'hover:border-brass hover:text-brass'
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  )
}
