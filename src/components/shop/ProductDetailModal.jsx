import { useState, useEffect } from 'react'
import { useCart } from '@/context'
import { COMPANY_INFO } from '@/constants/companyData'
import {
  X,
  ShoppingBag,
  Check,
  MessageCircle,
  Clock,
  Ruler,
  ShieldCheck,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const ProductDetailModal = ({
  product,
  initialAngleIndex = 0,
  onClose,
}) => {
  const { addItem } = useCart()
  const [activeAngleIndex, setActiveAngleIndex] = useState(initialAngleIndex)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]
  const currentImage = images[activeAngleIndex] || product.image

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=${encodeURIComponent(
    `Hello Heaven Furniture Mart atelier, I am inquiring about the ${product.name} (${product.priceFormatted}). Can you provide more details regarding custom dimensions and timber options?`
  )}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="animate-scale-in relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl border border-border-subtle bg-surface shadow-2xl md:flex-row md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-text-primary shadow-sm backdrop-blur-xs transition-colors hover:bg-surface-muted cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Angle Gallery View */}
        <div className="flex flex-col bg-surface-muted/40 p-4 sm:p-6 md:w-1/2">
          {/* Main Large Photograph */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-surface-muted">
            <img
              src={currentImage}
              alt={`${product.name} view ${activeAngleIndex + 1}`}
              className="h-full w-full object-cover transition-all duration-300"
            />

            {/* Navigation Arrows for Angles */}
            {images.length > 1 && (
              <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAngleIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-text-primary shadow-sm hover:bg-surface cursor-pointer"
                  aria-label="Previous angle"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveAngleIndex((prev) => (prev + 1) % images.length)
                  }
                  className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-surface/80 text-text-primary shadow-sm hover:bg-surface cursor-pointer"
                  aria-label="Next angle"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Angle Strip */}
          {images.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAngleIndex(idx)}
                  className={cn(
                    'h-12 w-12 shrink-0 overflow-hidden rounded-xl border transition-all cursor-pointer sm:h-14 sm:w-14',
                    activeAngleIndex === idx
                      ? 'border-brass ring-2 ring-brass/40 shadow-xs'
                      : 'border-border-subtle opacity-70 hover:opacity-100'
                  )}
                  aria-label={`Switch to angle ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specification & Actions */}
        <div className="flex flex-col justify-between p-6 md:w-1/2 md:overflow-y-auto md:p-8">
          <div>
            {/* Category / Department */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-brass-dark uppercase">
                {product.category} • {product.subcategoryLabel}
              </span>
              {product.isFeatured && (
                <span className="rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-bold text-brass-dark">
                  Atelier Choice
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="mt-2 font-serif text-2xl font-normal text-text-primary sm:text-3xl">
              {product.name}
            </h2>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xs uppercase text-text-muted">
                {product.pricePrefix || 'from'}
              </span>
              <span className="font-sans text-2xl font-bold text-text-primary">
                {product.priceFormatted}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-xs leading-relaxed text-text-secondary sm:text-sm">
              {product.shortDescription}
            </p>

            {/* Specifications Grid */}
            <div className="mt-6 space-y-2.5 rounded-2xl border border-border-subtle bg-surface-muted/30 p-4 text-xs">
              <div className="flex items-center gap-2 text-text-secondary">
                <Ruler className="h-4 w-4 shrink-0 text-brass" />
                <span className="font-medium text-text-primary">Dimensions:</span>
                <span>{product.dimensions || 'Customizable to space'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Layers className="h-4 w-4 shrink-0 text-brass" />
                <span className="font-medium text-text-primary">Material:</span>
                <span>{product.material}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <Clock className="h-4 w-4 shrink-0 text-brass" />
                <span className="font-medium text-text-primary">Atelier Lead Time:</span>
                <span>{product.leadTime || '14–21 Working Days'}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brass" />
                <span className="font-medium text-text-primary">Joinery Guarantee:</span>
                <span>10-Year Master Guarantee</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 space-y-3 pt-4 border-t border-border-subtle">
            {/* Quantity Selector & Add to Bag */}
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-border-subtle bg-surface-muted/40 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-surface cursor-pointer text-xs font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-text-primary">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-surface cursor-pointer text-xs font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={cn(
                  'flex grow items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md',
                  isAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-charcoal-deep text-brass hover:bg-charcoal-surface active:scale-98'
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Bespoke WhatsApp Concierge */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-brass/40 py-2.5 text-xs font-semibold tracking-wide text-brass-dark hover:bg-brass-light/40 transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" />
              <span>Inquire Custom Sizing on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
