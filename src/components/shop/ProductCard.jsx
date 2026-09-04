import { useState, useRef } from 'react'
import { useCart } from '@/context'
import { ShoppingBag, Eye, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ProductCard = ({ product, onQuickView }) => {
  const { addItem } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  const touchStartXRef = useRef(null)

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]
  const currentImage = images[activeImageIndex] || product.image
  const hasMultipleAngles = images.length > 1

  // Handle Add to Cart with visual feedback
  const handleAddToCart = (e) => {
    e.stopPropagation()
    addItem(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || !hasMultipleAngles) return
    const touchEndX = e.changedTouches[0].clientX
    const deltaX = touchEndX - touchStartXRef.current

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swipe left -> next angle
        setActiveImageIndex((prev) => (prev + 1) % images.length)
      } else {
        // Swipe right -> prev angle
        setActiveImageIndex(
          (prev) => (prev - 1 + images.length) % images.length
        )
      }
    }
    touchStartXRef.current = null
  }

  return (
    <article
      className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle/80 bg-surface p-3 transition-all duration-300 hover:border-brass/40 hover:shadow-lg sm:p-4"
      tabIndex={0}
      aria-label={`${product.name}, ${product.priceFormatted}`}
    >
      <div>
        {/* Main Photo Frame (3:4 aspect ratio) */}
        <div
          className="relative aspect-3/4 w-full overflow-hidden rounded-xl bg-surface-muted/60 select-none cursor-pointer"
          onClick={() => onQuickView && onQuickView(product, activeImageIndex)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={currentImage}
            alt={`${product.name} angle view ${activeImageIndex + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
            {product.isNew && (
              <span className="rounded-full bg-charcoal-surface/90 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-brass uppercase backdrop-blur-xs shadow-xs">
                New
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-brass/90 px-2 py-0.5 text-[10px] font-bold tracking-wider text-charcoal-deep uppercase backdrop-blur-xs shadow-xs">
                Featured
              </span>
            )}
          </div>

          {/* Quick View Floating Overlay Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView && onQuickView(product, activeImageIndex)
            }}
            className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-surface/90 text-text-primary opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 hover:bg-surface hover:text-brass cursor-pointer shadow-xs"
            title="Inspect angles & details"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Mobile Swipe Angle Pill Indicator */}
          {hasMultipleAngles && (
            <div className="pointer-events-none absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-xs sm:hidden">
              <span>
                {activeImageIndex + 1}/{images.length}
              </span>
            </div>
          )}
        </div>

        {/* Multi-Angle Thumbnail Strip (Directly below image, per reference design!) */}
        {hasMultipleAngles && (
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1">
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
                    'relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer sm:h-11 sm:w-11',
                    isActive
                      ? 'border-brass ring-1.5 ring-brass/40 shadow-xs'
                      : 'border-border-subtle opacity-70 hover:opacity-100 hover:border-brass/50'
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
                    <span className="absolute inset-0 bg-brass/10" />
                  )}
                </button>
              )
            })}
            <span className="ml-auto hidden text-[10px] font-medium text-text-muted sm:inline-block">
              {images.length} angles
            </span>
          </div>
        )}

        {/* Product Details */}
        <div className="mt-3">
          {/* Eyebrow / Department Tag */}
          <span className="text-[11px] font-medium tracking-wide text-text-muted uppercase">
            {product.subcategoryLabel || product.category}
          </span>

          {/* Product Title */}
          <h2
            onClick={() => onQuickView && onQuickView(product, activeImageIndex)}
            className="mt-0.5 font-serif text-base font-medium text-text-primary transition-colors hover:text-brass-dark line-clamp-1 cursor-pointer sm:text-lg"
          >
            {product.name}
          </h2>

          {/* Short Description */}
          <p className="mt-1 text-xs leading-relaxed text-text-secondary line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Craft Timber & Dimension Spec */}
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-text-muted">
            <span className="truncate">{product.material}</span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Add to Bag CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-border-subtle/80 pt-3">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-text-muted">
            {product.pricePrefix || 'from'}
          </span>
          <span className="font-sans text-sm font-bold text-text-primary sm:text-base">
            {product.priceFormatted}
          </span>
        </div>

        {/* Add to Bag Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs sm:px-4 sm:py-2',
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
      </div>
    </article>
  )
}
