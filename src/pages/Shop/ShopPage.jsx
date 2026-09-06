import { useRef, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProducts } from '@/features/shop'
import {
  ShopHeader,
  CategoryBar,
  ShopFilterToolbar,
  ProductGrid,
  ProductDetailModal,
} from '@/features/shop'
import { ChevronRight, Home } from 'lucide-react'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawCategory = searchParams.get('category') || 'all'
  const categoryFromUrl =
    rawCategory === 'bespoke-commissions' ? 'bespoke' : rawCategory
  const subcategoryFromUrl =
    searchParams.get('subcategory') || searchParams.get('sub') || 'all'
  const gridTopRef = useRef(null)

  const {
    products,
    categories,
    sortOptions,
    priceRanges,
    stockFilterOptions,
    filters,
    setCategory,
    setSubcategory,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    setStockFilter,
    resetFilters,
    totalCount,
  } = useProducts({
    categoryId: categoryFromUrl,
    subcategory: subcategoryFromUrl,
  })

  // Synchronize filter state whenever URL parameters change (back/forward or navbar navigation)
  useEffect(() => {
    if (categoryFromUrl !== filters.categoryId) {
      setCategory(categoryFromUrl)
    }
    if (subcategoryFromUrl !== filters.subcategory) {
      setSubcategory(subcategoryFromUrl)
    }
  }, [
    categoryFromUrl,
    subcategoryFromUrl,
    filters.categoryId,
    filters.subcategory,
    setCategory,
    setSubcategory,
  ])

  const [activeModalProduct, setActiveModalProduct] = useState(null)
  const [modalInitialAngle, setModalInitialAngle] = useState(0)

  const handleCategorySelect = (categoryId) => {
    const normalizedCat =
      categoryId === 'bespoke-commissions' ? 'bespoke' : categoryId

    setCategory(normalizedCat)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (normalizedCat === 'all') {
        next.delete('category')
      } else {
        next.set('category', normalizedCat)
      }
      next.delete('subcategory')
      next.delete('sub')
      return next
    })

    if (normalizedCat === 'bespoke') {
      setTimeout(() => {
        const bespokeCard = document.querySelector('[data-bespoke-card]')
        if (bespokeCard) {
          bespokeCard.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    } else if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubcategorySelect = (subId) => {
    setSubcategory(subId)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (!subId || subId === 'all') {
        next.delete('subcategory')
        next.delete('sub')
      } else {
        next.set('subcategory', subId)
        next.delete('sub')
      }
      return next
    })

    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleResetAllFilters = () => {
    resetFilters()
    setSearchParams(new URLSearchParams())
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleQuickView = (product, angleIndex = 0) => {
    setActiveModalProduct(product)
    setModalInitialAngle(angleIndex)
  }

  const currentCategory = categories.find((c) => c.id === filters.categoryId)

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-20 sm:pt-28 md:pt-32">
      <div className="container-page">
        <nav
          aria-label="Breadcrumb"
          className="text-text-muted flex items-center gap-1.5 text-xs select-none"
        >
          <Link
            to="/"
            className="hover:text-brass text-text-muted flex cursor-pointer items-center gap-1 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="text-border-warm/70 h-3 w-3 shrink-0" />
          {currentCategory && currentCategory.id !== 'all' ? (
            <button
              type="button"
              onClick={() => handleCategorySelect('all')}
              className="hover:text-brass text-text-secondary cursor-pointer transition-colors"
            >
              Catalog
            </button>
          ) : (
            <span className="text-brass-dark font-semibold">Catalog</span>
          )}

          {currentCategory && currentCategory.id !== 'all' && (
            <>
              <ChevronRight className="text-border-warm/70 h-3 w-3 shrink-0" />
              {filters.subcategory !== 'all' ? (
                <button
                  type="button"
                  onClick={() => handleSubcategorySelect('all')}
                  className="hover:text-brass text-text-secondary cursor-pointer transition-colors"
                >
                  {currentCategory.name}
                </button>
              ) : (
                <span className="text-brass-dark font-semibold">
                  {currentCategory.name}
                </span>
              )}
            </>
          )}

          {filters.subcategory !== 'all' && (
            <>
              <ChevronRight className="text-border-warm/70 h-3 w-3 shrink-0" />
              <span className="text-brass-dark font-semibold capitalize">
                {filters.subcategory.replace('-', ' ')}
              </span>
            </>
          )}
        </nav>

        <ShopHeader totalCount={totalCount} />

        <CategoryBar
          activeCategoryId={filters.categoryId}
          onSelectCategory={handleCategorySelect}
        />

        <div ref={gridTopRef} className="scroll-mt-28" />

        <ShopFilterToolbar
          categories={categories}
          sortOptions={sortOptions}
          priceRanges={priceRanges}
          stockFilterOptions={stockFilterOptions}
          filters={filters}
          onSelectSort={setSortBy}
          onSelectPriceRange={setPriceRange}
          onSelectStockFilter={setStockFilter}
          onSelectSubcategory={handleSubcategorySelect}
          onSearchChange={setSearchQuery}
          onResetFilters={handleResetAllFilters}
          totalCount={totalCount}
        />

        <ProductGrid
          products={products}
          onQuickView={handleQuickView}
          onResetFilters={handleResetAllFilters}
          gridTopRef={gridTopRef}
        />
      </div>

      {activeModalProduct && (
        <ProductDetailModal
          key={`${activeModalProduct.id}-${modalInitialAngle}`}
          product={activeModalProduct}
          initialAngleIndex={modalInitialAngle}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </div>
  )
}
