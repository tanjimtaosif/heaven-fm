import { useState, useMemo } from 'react'
import { useLenis } from '@/components/providers'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { ProductCard } from './ProductCard'
import { BespokeCalloutCard } from './BespokeCalloutCard'
import { ChevronLeft, ChevronRight, SearchX, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

const DESKTOP_ITEMS_PER_PAGE = 11
const MOBILE_ITEMS_PER_PAGE = 6

export const ProductGrid = ({
  products = [],
  onQuickView,
  onResetFilters,
  gridTopRef,
}) => {
  const lenis = useLenis()
  const isMobile = useIsMobile()
  const itemsPerPage = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE

  const [requestedPage, setRequestedPage] = useState(1)
  const [prevCount, setPrevCount] = useState(products.length)

  // Reset to page 1 whenever product list count changes (e.g. category or search filter changed)
  if (products.length !== prevCount) {
    setPrevCount(products.length)
    setRequestedPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage))

  // A narrower filter or responsive switch can leave the viewer stranded on a page
  // the shortened result set no longer has. Clamping here keeps the page safely valid.
  const currentPage = Math.min(requestedPage, totalPages)

  const handlePageChange = (newPage) => {
    setRequestedPage(newPage)
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
    const start = (currentPage - 1) * itemsPerPage
    return products.slice(start, start + itemsPerPage)
  }, [products, currentPage, itemsPerPage])

  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const items = []
    items.push(1)

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    if (start > 2) {
      items.push('ellipsis-prev')
    }

    for (let i = start; i <= end; i++) {
      items.push(i)
    }

    if (end < totalPages - 1) {
      items.push('ellipsis-next')
    }

    items.push(totalPages)
    return items
  }, [totalPages, currentPage])

  if (products.length === 0) {
    return (
      <div className="border-border-subtle bg-surface-muted/30 my-10 flex flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center sm:my-16 sm:p-12">
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

  const bespokeIndex = isMobile ? 3 : 5

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
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
          className="flex flex-wrap items-center justify-center gap-1.5 pt-5 pb-4 sm:gap-2 sm:pt-6"
        >
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={cn(
              'border-border-subtle bg-surface text-text-secondary flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full border transition-all sm:h-9 sm:w-9',
              currentPage === 1
                ? 'cursor-not-allowed opacity-40'
                : 'hover:border-brass hover:text-brass'
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {paginationItems.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="text-text-muted flex h-8.5 w-6 items-center justify-center text-xs select-none sm:h-9 sm:w-8"
                >
                  &hellip;
                </span>
              )
            }

            const isCurrent = item === currentPage
            return (
              <button
                key={item}
                type="button"
                onClick={() => handlePageChange(item)}
                className={cn(
                  'flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full text-xs font-semibold transition-all sm:h-9 sm:w-9',
                  isCurrent
                    ? 'bg-brass text-charcoal-deep font-bold shadow-xs'
                    : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/50 hover:text-text-primary border'
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item}
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
              'border-border-subtle bg-surface text-text-secondary flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full border transition-all sm:h-9 sm:w-9',
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
