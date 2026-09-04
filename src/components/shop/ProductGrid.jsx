import { useState, useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { BespokeCalloutCard } from './BespokeCalloutCard'
import { ChevronLeft, ChevronRight, SearchX, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const ITEMS_PER_PAGE = 11 // 11 items + 1 Bespoke card = 12 grid items (multiple of 4, 3, 2)

export const ProductGrid = ({
  products = [],
  onQuickView,
  onResetFilters,
  gridTopRef,
}) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Reset to page 1 if product list length or filters change
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))

  // Handle page change and smooth scroll to top of catalog
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    if (gridTopRef && gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Get current page slice of products
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return products.slice(start, start + ITEMS_PER_PAGE)
  }, [products, currentPage])

  // Empty state when search or filters yield no results
  if (products.length === 0) {
    return (
      <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-subtle bg-surface-muted/30 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brass-light/80 text-brass-dark">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-medium text-text-primary">
          No architectural pieces found
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-text-secondary sm:text-sm">
          We could not find any items matching your selected criteria. Try
          broadening your filters or searching for alternative timbers.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-charcoal-deep px-5 py-2.5 text-xs font-semibold text-brass hover:bg-charcoal-surface cursor-pointer shadow-sm transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Catalog Filters</span>
        </button>
      </div>
    )
  }

  // Insert BespokeCalloutCard at index 5 on page 1, or end of grid
  const bespokeIndex = 5

  return (
    <div className="space-y-10">
      {/* 4-Column Responsive Product Grid (matching reference UI) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product, index) => {
          return (
            <div key={product.id} className="contents">
              {/* Inject editorial Bespoke Card at position 5 (or matching reference placement) */}
              {index === bespokeIndex && <BespokeCalloutCard />}
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          )
        })}

        {/* If fewer than 5 items, still render Bespoke card at the end */}
        {currentProducts.length <= bespokeIndex && <BespokeCalloutCard />}
      </div>

      {/* Pagination Bar (< 1 2 3 >) matching reference design */}
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
              'flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary transition-all cursor-pointer',
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed'
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
                  'flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all cursor-pointer',
                  isCurrent
                    ? 'bg-brass text-charcoal-deep shadow-xs font-bold'
                    : 'border border-border-subtle bg-surface text-text-secondary hover:border-brass/50 hover:text-text-primary'
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
              'flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-secondary transition-all cursor-pointer',
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed'
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
