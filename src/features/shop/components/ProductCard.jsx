import { useState, useRef } from 'react'
import { useCart } from '@/context'
import { ShoppingBag, Eye, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ProductCard = ({ product, onQuickView }) => {
  const { addItem } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const touchStartXRef = useRef(null)

  const isOutOfStock = !product.stock || product.stock <= 0
  const isLowStock =
    product.stock > 0 && product.stock <= (product.lowStockThreshold || 3)

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]
  const currentImage = images[activeImageIndex] || product.image
  const hasMultipleAngles = images.length > 1

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (isOutOfStock) return
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !hasMultipleAngles) return
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartXRef.current

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        setActiveImageIndex((prev) => (prev + 1) % images.length)
      } else {
        setActiveImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        )
      }
    }
    touchStartXRef.current = null
  }

  return (
    <article
      className={cn(
        'group border-border-subtle/80 bg-surface hover:border-brass/40 relative flex flex-col justify-between rounded-2xl border p-3 transition-all duration-300 hover:shadow-lg sm:p-4',
        isOutOfStock && 'opacity-95'
      )}
      tabIndex={0}
      aria-label={`${product.name}, ${product.priceFormatted}${isOutOfStock ? ' (Out of Stock)' : ''}`}
    >
      <div>
        <div
          className="bg-surface-muted/60 relative aspect-3/4 w-full cursor-pointer overflow-hidden rounded-xl select-none"
          onClick={() => onQuickView && onQuickView(product, activeImageIndex)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentImage}
            alt={`${product.name} angle view ${activeImageIndex + 1}`}
            className={cn(
              'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]',
              isOutOfStock && 'opacity-85 grayscale-15'
            )}
            loading="lazy"
          />

          <div className="absolute top-2.5 left-2.5 z-10 flex flex-wrap gap-1.5">
            {isOutOfStock ? (
              <span className="text-label-xs rounded-full border border-rose-800/30 bg-rose-950/85 px-2.5 py-0.5 font-bold tracking-wider text-rose-200 uppercase shadow-xs backdrop-blur-xs">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-label-xs rounded-full border border-amber-800/30 bg-amber-950/85 px-2.5 py-0.5 font-bold tracking-wider text-amber-200 uppercase shadow-xs backdrop-blur-xs">
                Only {product.stock} Left
              </span>
            ) : null}

            {product.isNew && !isOutOfStock && (
              <span className="bg-charcoal-surface/90 text-brass text-label-xs rounded-full px-2.5 py-0.5 font-semibold tracking-wider uppercase shadow-xs backdrop-blur-xs">
                New
              </span>
            )}
            {product.isFeatured && !isOutOfStock && (
              <span className="bg-brass/90 text-charcoal-deep text-label-xs rounded-full px-2 py-0.5 font-bold tracking-wider uppercase shadow-xs backdrop-blur-xs">
                Featured
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView && onQuickView(product, activeImageIndex)
            }}
            className="bg-surface/90 text-text-primary hover:bg-surface hover:text-brass absolute top-2.5 right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full opacity-100 shadow-xs backdrop-blur-xs transition-opacity duration-200 md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
            title="Inspect angles & details"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>

          {hasMultipleAngles && (
            <div className="text-label-xs pointer-events-none absolute right-2.5 bottom-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 font-medium text-white/90 backdrop-blur-xs sm:hidden">
              <span>
                {activeImageIndex + 1}/{images.length}
              </span>
            </div>
          )}
        </div>

        {hasMultipleAngles && (
          <div
            data-no-scrollbar
            className="no-scrollbar mt-2.5 flex scrollbar-none items-center gap-1.5 overflow-x-auto pb-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {images.map((imgUrl, idx) => {
              const isActive = activeImageIndex === idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImageIndex(idx)
                  }}
                  onMouseEnter={() => setActiveImageIndex(idx)}
                  className={cn(
                    'relative h-10 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all duration-200 sm:h-11 sm:w-11',
                    isActive
                      ? 'border-brass ring-1.5 ring-brass/40 shadow-xs'
                      : 'border-border-subtle hover:border-brass/50 opacity-70 hover:opacity-100'
                  )}
                  aria-label={`View angle ${idx + 1}`}
                  aria-pressed={isActive}
                >
                  <img
                    src={imgUrl}
                    alt={`Angle shot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {isActive && (
                    <span className="bg-brass/10 absolute inset-0" />
                  )}
                </button>
              )
            })}
            <span className="text-text-muted text-label-xs ml-auto hidden font-medium sm:inline-block">
              {images.length} angles
            </span>
          </div>
        )}

        <div className="mt-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-text-muted text-label-sm truncate font-medium tracking-wide uppercase">
              {product.subcategoryLabel || product.category}
            </span>
            {product.sku && (
              <span className="bg-surface-muted text-text-muted border-border-subtle/70 text-label-xs shrink-0 rounded border px-1.5 py-0.5 font-mono font-semibold tracking-wider">
                {product.sku}
              </span>
            )}
          </div>

          <h2
            onClick={() =>
              onQuickView && onQuickView(product, activeImageIndex)
            }
            className="text-text-primary hover:text-brass-dark mt-1 line-clamp-2 cursor-pointer font-serif text-base leading-snug font-medium transition-colors sm:text-lg"
          >
            {product.name}
          </h2>

          <p className="text-text-secondary mt-1 line-clamp-2 text-xs leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="text-text-muted text-label-sm mt-2 flex items-center justify-between gap-1.5">
            <span className="truncate">{product.material}</span>
          </div>
        </div>
      </div>

      <div className="border-border-subtle/80 mt-4 flex items-center justify-between gap-2 border-t pt-3">
        <div className="min-w-0">
          <span className="text-text-muted text-label-xs block tracking-wider uppercase">
            {product.pricePrefix || 'from'}
          </span>
          <span className="text-text-primary font-sans text-sm font-bold sm:text-base">
            {product.priceFormatted}
          </span>
        </div>

        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="border-border-subtle bg-surface-muted/80 text-text-muted inline-flex shrink-0 cursor-not-allowed items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-wide sm:px-3.5 sm:py-2"
            aria-label={`${product.name} is out of stock`}
          >
            <span>Out of Stock</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAddToCart}
            className={cn(
              'inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-xs transition-all duration-200 sm:px-4 sm:py-2',
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-charcoal-surface text-brass hover:bg-charcoal-deep active:scale-95'
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        )}
      </div>
    </article>
  )
}
