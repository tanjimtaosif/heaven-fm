import { useRef, useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { ShopHeader } from './ShopHeader'
import { CategoryBar } from './CategoryBar'
import { ShopFilterToolbar } from './ShopFilterToolbar'
import { ProductGrid } from './ProductGrid'
import { ProductDetailModal } from './ProductDetailModal'
import { ChevronRight, Home } from 'lucide-react'

export const ShopPage = ({ initialCategoryId = 'all', onNavigateHome }) => {
  const gridTopRef = useRef(null)

  // Initialize useProducts hook
  const {
    products,
    categories,
    sortOptions,
    priceRanges,
    filters,
    setCategory,
    setSubcategory,
    setSortBy,
    setPriceRange,
    setSearchQuery,
    resetFilters,
    totalCount,
  } = useProducts({
    categoryId: initialCategoryId,
  })

  // Quick View Modal state
  const [activeModalProduct, setActiveModalProduct] = useState(null)
  const [modalInitialAngle, setModalInitialAngle] = useState(0)

  // Handle Category selection from CategoryBar
  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'bespoke') {
      // Scroll to bespoke card or open bespoke consultation
      const bespokeCard = document.querySelector('[data-bespoke-card]')
      if (bespokeCard) {
        bespokeCard.scrollIntoView({ behavior: 'smooth' })
      } else {
        setCategory('all')
      }
      return
    }
    setCategory(categoryId)
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleQuickView = (product, angleIndex = 0) => {
    setActiveModalProduct(product)
    setModalInitialAngle(angleIndex)
  }

  // Active Category info for breadcrumb
  const currentCategory = categories.find((c) => c.id === filters.categoryId)

  return (
    <div className="bg-canvas min-h-screen pt-24 pb-20 sm:pt-28 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Trail */}
        <nav
          aria-label="Breadcrumb"
          className="text-text-muted flex items-center gap-1.5 text-xs"
        >
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-text-primary flex cursor-pointer items-center gap-1 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="text-border-warm h-3 w-3" />
          <span className="text-text-secondary font-medium">Catalog</span>
          {currentCategory && currentCategory.id !== 'all' && (
            <>
              <ChevronRight className="text-border-warm h-3 w-3" />
              <span className="text-brass-dark font-semibold">
                {currentCategory.name}
              </span>
            </>
          )}
          {filters.subcategory !== 'all' && (
            <>
              <ChevronRight className="text-border-warm h-3 w-3" />
              <span className="text-text-primary capitalize">
                {filters.subcategory.replace('-', ' ')}
              </span>
            </>
          )}
        </nav>

        {/* Master Catalog Header */}
        <ShopHeader totalCount={totalCount} />

        {/* Category Horizontal Slider (Matching Reference) */}
        <CategoryBar
          activeCategoryId={filters.categoryId}
          onSelectCategory={handleCategorySelect}
        />

        {/* Scroll anchor target */}
        <div ref={gridTopRef} className="scroll-mt-28" />

        {/* Filter & Sort Controls Toolbar */}
        <ShopFilterToolbar
          categories={categories}
          sortOptions={sortOptions}
          priceRanges={priceRanges}
          filters={filters}
          onSelectSort={setSortBy}
          onSelectPriceRange={setPriceRange}
          onSelectSubcategory={setSubcategory}
          onSearchChange={setSearchQuery}
          onResetFilters={resetFilters}
          totalCount={totalCount}
        />

        {/* Responsive Product Grid with Angle Switchers */}
        <ProductGrid
          products={products}
          onQuickView={handleQuickView}
          onResetFilters={resetFilters}
          gridTopRef={gridTopRef}
        />
      </div>

      {/* Quick View & Multi-Angle Inspection Modal */}
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
