import { useState, useRef, useEffect } from 'react'
import { useLenis } from '@/components/providers'
import {
  SlidersHorizontal,
  ChevronDown,
  Search,
  X,
  ArrowUpDown,
  DollarSign,
  RotateCcw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const ShopFilterToolbar = ({
  categories,
  sortOptions,
  priceRanges,
  stockFilterOptions = [
    { id: 'all', label: 'All Availability' },
    { id: 'in-stock', label: 'In Stock Only' },
    { id: 'out-of-stock', label: 'Made-to-Order / Out of Stock' },
  ],
  filters,
  onSelectSort,
  onSelectPriceRange,
  onSelectStockFilter,
  onSelectSubcategory,
  onSearchChange,
  onResetFilters,
  totalCount,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isStockOpen, setIsStockOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const sortRef = useRef(null)
  const priceRef = useRef(null)
  const stockRef = useRef(null)
  const lenis = useLenis()

  const activeCategory = categories.find((c) => c.id === filters.categoryId)
  const subcategories = activeCategory?.subcategories || []

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false)
      }
      if (priceRef.current && !priceRef.current.contains(e.target)) {
        setIsPriceOpen(false)
      }
      if (stockRef.current && !stockRef.current.contains(e.target)) {
        setIsStockOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isMobileFiltersOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMobileFiltersOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    if (lenis) lenis.stop()
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEscape)
      if (lenis) lenis.start()
      document.body.style.overflow = ''
    }
  }, [isMobileFiltersOpen, lenis])

  const currentSort =
    sortOptions.find((s) => s.id === filters.sortBy) || sortOptions[0]
  const currentPrice =
    priceRanges.find(
      (p) => p.min === filters.minPrice && p.max === filters.maxPrice
    ) || priceRanges[0]
  const currentStock =
    stockFilterOptions.find((s) => s.id === filters.stockFilter) ||
    stockFilterOptions[0]

  const hasActiveFilters =
    filters.categoryId !== 'all' ||
    filters.subcategory !== 'all' ||
    filters.sortBy !== 'featured' ||
    filters.minPrice > 0 ||
    filters.maxPrice < Infinity ||
    (filters.stockFilter && filters.stockFilter !== 'all') ||
    Boolean(filters.searchQuery?.trim())

  const activeFilterCount =
    (filters.categoryId !== 'all' ? 1 : 0) +
    (filters.subcategory !== 'all' ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < Infinity ? 1 : 0) +
    (filters.stockFilter && filters.stockFilter !== 'all' ? 1 : 0) +
    (filters.searchQuery?.trim() ? 1 : 0)

  return (
    <div className="mb-6 space-y-3 sm:mb-8 sm:space-y-4">
      <div className="border-border-subtle/80 flex flex-wrap items-center justify-between gap-2.5 border-y py-2.5 sm:gap-3 sm:py-3">
        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => {
                setIsSortOpen(!isSortOpen)
                setIsPriceOpen(false)
                setIsStockOpen(false)
              }}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200',
                isSortOpen || filters.sortBy !== 'featured'
                  ? 'border-brass bg-brass-light/40 text-brass-dark'
                  : 'border-border-subtle bg-surface text-text-primary hover:border-border-warm'
              )}
              aria-expanded={isSortOpen}
            >
              <ArrowUpDown className="text-text-muted h-3.5 w-3.5" />
              <span>Sort: {currentSort.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isSortOpen && 'rotate-180'
                )}
              />
            </button>

            {isSortOpen && (
              <div className="animate-fade-in border-border-subtle bg-surface absolute top-full left-0 z-30 mt-1.5 w-52 rounded-2xl border p-1.5 shadow-xl">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onSelectSort(option.id)
                      setIsSortOpen(false)
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors',
                      filters.sortBy === option.id
                        ? 'bg-brass-light/80 text-brass-dark font-semibold'
                        : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                    )}
                  >
                    <span>{option.label}</span>
                    {filters.sortBy === option.id && (
                      <span className="bg-brass h-1.5 w-1.5 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={priceRef}>
            <button
              type="button"
              onClick={() => {
                setIsPriceOpen(!isPriceOpen)
                setIsSortOpen(false)
                setIsStockOpen(false)
              }}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200',
                isPriceOpen ||
                  filters.minPrice > 0 ||
                  filters.maxPrice < Infinity
                  ? 'border-brass bg-brass-light/40 text-brass-dark'
                  : 'border-border-subtle bg-surface text-text-primary hover:border-border-warm'
              )}
              aria-expanded={isPriceOpen}
            >
              <DollarSign className="text-text-muted h-3.5 w-3.5" />
              <span>Price: {currentPrice.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isPriceOpen && 'rotate-180'
                )}
              />
            </button>

            {isPriceOpen && (
              <div className="animate-fade-in border-border-subtle bg-surface absolute top-full left-0 z-30 mt-1.5 w-56 rounded-2xl border p-1.5 shadow-xl">
                {priceRanges.map((range) => {
                  const isSelected =
                    filters.minPrice === range.min &&
                    filters.maxPrice === range.max

                  return (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => {
                        onSelectPriceRange(range.min, range.max)
                        setIsPriceOpen(false)
                      }}
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors',
                        isSelected
                          ? 'bg-brass-light/80 text-brass-dark font-semibold'
                          : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                      )}
                    >
                      <span>{range.label}</span>
                      {isSelected && (
                        <span className="bg-brass h-1.5 w-1.5 rounded-full" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="relative" ref={stockRef}>
            <button
              type="button"
              onClick={() => {
                setIsStockOpen(!isStockOpen)
                setIsSortOpen(false)
                setIsPriceOpen(false)
              }}
              className={cn(
                'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200',
                isStockOpen ||
                  (filters.stockFilter && filters.stockFilter !== 'all')
                  ? 'border-brass bg-brass-light/40 text-brass-dark'
                  : 'border-border-subtle bg-surface text-text-primary hover:border-border-warm'
              )}
              aria-expanded={isStockOpen}
            >
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  filters.stockFilter === 'in-stock'
                    ? 'bg-emerald-500'
                    : filters.stockFilter === 'out-of-stock'
                      ? 'bg-rose-500'
                      : 'bg-brass'
                )}
              />
              <span>{currentStock.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isStockOpen && 'rotate-180'
                )}
              />
            </button>

            {isStockOpen && (
              <div className="animate-fade-in border-border-subtle bg-surface absolute top-full left-0 z-30 mt-1.5 w-60 rounded-2xl border p-1.5 shadow-xl">
                {stockFilterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onSelectStockFilter && onSelectStockFilter(opt.id)
                      setIsStockOpen(false)
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors',
                      filters.stockFilter === opt.id
                        ? 'bg-brass-light/80 text-brass-dark font-semibold'
                        : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          opt.id === 'in-stock'
                            ? 'bg-emerald-500'
                            : opt.id === 'out-of-stock'
                              ? 'bg-rose-500'
                              : 'bg-brass'
                        )}
                      />
                      <span>{opt.label}</span>
                    </div>
                    {filters.stockFilter === opt.id && (
                      <span className="bg-brass h-1.5 w-1.5 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-text-muted hover:text-destructive inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="border-border-subtle bg-surface text-text-primary inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-xs"
          >
            <SlidersHorizontal className="text-brass h-3.5 w-3.5" />
            <span>Filters & Sort</span>
            {activeFilterCount > 0 && (
              <span className="bg-brass text-charcoal-deep text-label-xs flex h-4 w-4 items-center justify-center rounded-full font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="border-border-subtle bg-surface text-text-muted hover:text-destructive flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border"
              title="Reset filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="relative w-full grow sm:w-auto sm:max-w-xs sm:min-w-50 sm:grow-0">
          <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search timber, piece, room..."
            className={cn(
              'border-border-subtle bg-surface text-text-primary w-full rounded-full border py-2 pr-9 pl-9 text-xs',
              'placeholder:text-text-muted focus:border-brass focus:ring-brass focus:ring-1 focus:outline-none'
            )}
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="text-text-muted hover:text-text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {subcategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-text-muted mr-1 text-xs font-semibold tracking-wider uppercase">
            Department:
          </span>
          <button
            type="button"
            onClick={() => onSelectSubcategory('all')}
            className={cn(
              'cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
              filters.subcategory === 'all'
                ? 'bg-charcoal-surface text-brass shadow-xs'
                : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/40 hover:text-text-primary border'
            )}
          >
            All {activeCategory.name}
          </button>
          {subcategories.map((sub) => {
            const isSubActive = filters.subcategory === sub.id
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubcategory(sub.id)}
                className={cn(
                  'cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
                  isSubActive
                    ? 'bg-charcoal-surface text-brass shadow-xs'
                    : 'border-border-subtle bg-surface text-text-secondary hover:border-brass/40 hover:text-text-primary border'
                )}
              >
                {sub.name}
              </button>
            )
          })}
        </div>
      )}

      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs sm:hidden"
          onClick={() => setIsMobileFiltersOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Filter and sort catalog"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="animate-slide-up border-border-subtle bg-surface flex max-h-[88dvh] w-full flex-col rounded-t-3xl border-t shadow-2xl"
          >
            <div className="flex shrink-0 justify-center pt-2.5 pb-1">
              <span className="bg-border-subtle h-1 w-10 rounded-full" />
            </div>

            <div className="border-border-subtle flex shrink-0 items-start justify-between gap-3 border-b px-5 pt-2 pb-4">
              <div className="min-w-0">
                <h3 className="text-text-primary font-serif text-base font-bold">
                  Filter &amp; Sort Catalog
                </h3>
                <p className="text-text-muted mt-0.5 text-xs">
                  {totalCount} pieces match current criteria
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="text-text-muted hover:bg-surface-muted hover:text-text-primary -mr-1 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">
              <div className="py-4">
                <span className="text-text-muted mb-2.5 block text-[11px] font-bold tracking-wider uppercase">
                  Sort By
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectSort(opt.id)}
                      className={cn(
                        'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors',
                        filters.sortBy === opt.id
                          ? 'bg-brass-light/80 text-brass-dark font-bold'
                          : 'bg-surface-muted/50 text-text-secondary'
                      )}
                    >
                      <span className="min-w-0">{opt.label}</span>
                      {filters.sortBy === opt.id && (
                        <span className="bg-brass h-2 w-2 shrink-0 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-border-subtle border-t py-4">
                <span className="text-text-muted mb-2.5 block text-[11px] font-bold tracking-wider uppercase">
                  Stock Availability
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {stockFilterOptions.map((opt) => {
                    const isSelected =
                      filters.stockFilter === opt.id ||
                      (!filters.stockFilter && opt.id === 'all')

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          onSelectStockFilter && onSelectStockFilter(opt.id)
                        }
                        className={cn(
                          'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors',
                          isSelected
                            ? 'bg-brass-light/80 text-brass-dark font-bold'
                            : 'bg-surface-muted/50 text-text-secondary'
                        )}
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <span
                            className={cn(
                              'h-2 w-2 shrink-0 rounded-full',
                              opt.id === 'in-stock'
                                ? 'bg-emerald-500'
                                : opt.id === 'out-of-stock'
                                  ? 'bg-rose-500'
                                  : 'bg-brass'
                            )}
                          />
                          <span className="min-w-0">{opt.label}</span>
                        </span>
                        {isSelected && (
                          <span className="bg-brass h-2 w-2 shrink-0 rounded-full" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="border-border-subtle border-t py-4">
                <span className="text-text-muted mb-2.5 block text-[11px] font-bold tracking-wider uppercase">
                  Price Range
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {priceRanges.map((range) => {
                    const isSelected =
                      filters.minPrice === range.min &&
                      filters.maxPrice === range.max

                    return (
                      <button
                        key={range.id}
                        type="button"
                        onClick={() => onSelectPriceRange(range.min, range.max)}
                        className={cn(
                          'flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors',
                          isSelected
                            ? 'bg-brass-light/80 text-brass-dark font-bold'
                            : 'bg-surface-muted/50 text-text-secondary'
                        )}
                      >
                        <span className="min-w-0">{range.label}</span>
                        {isSelected && (
                          <span className="bg-brass h-2 w-2 shrink-0 rounded-full" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="border-border-subtle bg-surface flex shrink-0 items-center gap-3 border-t px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    onResetFilters()
                    setIsMobileFiltersOpen(false)
                  }}
                  className="border-border-subtle text-text-secondary hover:bg-surface-muted shrink-0 cursor-pointer rounded-full border px-5 py-3 text-xs font-semibold"
                >
                  Reset All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="bg-charcoal-deep text-brass hover:bg-charcoal-surface min-w-0 grow cursor-pointer truncate rounded-full px-4 py-3 text-xs font-semibold"
              >
                Apply Filters ({totalCount} Pieces)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
