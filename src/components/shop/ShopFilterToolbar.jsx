import { useState, useRef, useEffect } from 'react'
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
  filters,
  onSelectSort,
  onSelectPriceRange,
  onSelectSubcategory,
  onSearchChange,
  onResetFilters,
  totalCount,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const sortRef = useRef(null)
  const priceRef = useRef(null)

  // Current active category object
  const activeCategory = categories.find((c) => c.id === filters.categoryId)
  const subcategories = activeCategory?.subcategories || []

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false)
      }
      if (priceRef.current && !priceRef.current.contains(e.target)) {
        setIsPriceOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Identify selected sort and price labels
  const currentSort =
    sortOptions.find((s) => s.id === filters.sortBy) || sortOptions[0]
  const currentPrice =
    priceRanges.find(
      (p) => p.min === filters.minPrice && p.max === filters.maxPrice
    ) || priceRanges[0]

  // Count active non-default filters
  const hasActiveFilters =
    filters.categoryId !== 'all' ||
    filters.subcategory !== 'all' ||
    filters.sortBy !== 'featured' ||
    filters.minPrice > 0 ||
    filters.maxPrice < Infinity ||
    Boolean(filters.searchQuery?.trim())

  const activeFilterCount =
    (filters.categoryId !== 'all' ? 1 : 0) +
    (filters.subcategory !== 'all' ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < Infinity ? 1 : 0) +
    (filters.searchQuery?.trim() ? 1 : 0)

  return (
    <div className="mb-8 space-y-4">
      {/* Primary Toolbar: Sort Pill, Price Pill, Search Input, Mobile Filter Drawer Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-border-subtle/80 py-3">
        {/* Desktop Filter Pills */}
        <div className="hidden items-center gap-2.5 sm:flex">
          {/* Sort Dropdown Pill */}
          <div className="relative" ref={sortRef}>
            <button
              type="button"
              onClick={() => {
                setIsSortOpen(!isSortOpen)
                setIsPriceOpen(false)
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer',
                isSortOpen || filters.sortBy !== 'featured'
                  ? 'border-brass bg-brass-light/40 text-brass-dark'
                  : 'border-border-subtle bg-surface text-text-primary hover:border-border-warm'
              )}
              aria-expanded={isSortOpen}
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
              <span>Sort: {currentSort.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isSortOpen && 'rotate-180'
                )}
              />
            </button>

            {isSortOpen && (
              <div className="animate-fade-in absolute top-full left-0 z-30 mt-1.5 w-52 rounded-2xl border border-border-subtle bg-surface p-1.5 shadow-xl">
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
                        ? 'bg-brass-light/80 font-semibold text-brass-dark'
                        : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                    )}
                  >
                    <span>{option.label}</span>
                    {filters.sortBy === option.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Dropdown Pill */}
          <div className="relative" ref={priceRef}>
            <button
              type="button"
              onClick={() => {
                setIsPriceOpen(!isPriceOpen)
                setIsSortOpen(false)
              }}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer',
                isPriceOpen || filters.minPrice > 0 || filters.maxPrice < Infinity
                  ? 'border-brass bg-brass-light/40 text-brass-dark'
                  : 'border-border-subtle bg-surface text-text-primary hover:border-border-warm'
              )}
              aria-expanded={isPriceOpen}
            >
              <DollarSign className="h-3.5 w-3.5 text-text-muted" />
              <span>Price: {currentPrice.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  isPriceOpen && 'rotate-180'
                )}
              />
            </button>

            {isPriceOpen && (
              <div className="animate-fade-in absolute top-full left-0 z-30 mt-1.5 w-56 rounded-2xl border border-border-subtle bg-surface p-1.5 shadow-xl">
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
                          ? 'bg-brass-light/80 font-semibold text-brass-dark'
                          : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
                      )}
                    >
                      <span>{range.label}</span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brass" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Reset Filters Quick Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-text-muted transition-colors hover:text-destructive cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-xs font-medium text-text-primary shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-brass" />
            <span>Filters & Sort</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] font-bold text-charcoal-deep">
                {activeFilterCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-muted hover:text-destructive cursor-pointer"
              title="Reset filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Instant Search Box */}
        <div className="relative min-w-[200px] max-w-xs grow sm:grow-0">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search timber, piece, room..."
            className="w-full rounded-full border border-border-subtle bg-surface py-2 pr-9 pl-9 text-xs text-text-primary placeholder:text-text-muted focus:border-brass focus:ring-1 focus:ring-brass focus:outline-none"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Subcategories Secondary Pill Row (Visible when category has subcategories, e.g. Bedroom) */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted mr-1">
            Department:
          </span>
          <button
            type="button"
            onClick={() => onSelectSubcategory('all')}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
              filters.subcategory === 'all'
                ? 'bg-charcoal-surface text-brass shadow-xs'
                : 'border border-border-subtle bg-surface text-text-secondary hover:border-brass/40 hover:text-text-primary'
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
                  'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer',
                  isSubActive
                    ? 'bg-charcoal-surface text-brass shadow-xs'
                    : 'border border-border-subtle bg-surface text-text-secondary hover:border-brass/40 hover:text-text-primary'
                )}
              >
                {sub.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Mobile Filters Bottom Sheet Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs sm:hidden">
          <div className="animate-slide-up max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border-subtle bg-surface p-5 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-text-primary">
                  Filter & Sort Catalog
                </h3>
                <p className="text-xs text-text-muted">
                  {totalCount} pieces match current criteria
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="rounded-full p-2 text-text-muted hover:bg-surface-muted hover:text-text-primary cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sort Options */}
            <div className="py-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                Sort By
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectSort(opt.id)}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer',
                      filters.sortBy === opt.id
                        ? 'bg-brass-light/80 font-bold text-brass-dark'
                        : 'bg-surface-muted/50 text-text-secondary'
                    )}
                  >
                    <span>{opt.label}</span>
                    {filters.sortBy === opt.id && (
                      <span className="h-2 w-2 rounded-full bg-brass" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="border-t border-border-subtle py-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                Price Range
              </span>
              <div className="grid grid-cols-1 gap-1.5">
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
                        'flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors cursor-pointer',
                        isSelected
                          ? 'bg-brass-light/80 font-bold text-brass-dark'
                          : 'bg-surface-muted/50 text-text-secondary'
                      )}
                    >
                      <span>{range.label}</span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-brass" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="sticky bottom-0 -mx-5 -mb-5 flex items-center gap-3 border-t border-border-subtle bg-surface p-5">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    onResetFilters()
                    setIsMobileFiltersOpen(false)
                  }}
                  className="rounded-full border border-border-subtle px-4 py-2.5 text-xs font-semibold text-text-secondary hover:bg-surface-muted cursor-pointer"
                >
                  Reset All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="grow rounded-full bg-charcoal-deep py-2.5 text-xs font-semibold text-brass hover:bg-charcoal-surface cursor-pointer"
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
