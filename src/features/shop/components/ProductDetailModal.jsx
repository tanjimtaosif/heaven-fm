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
        className="animate-scale-in border-border-subtle bg-surface relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl border shadow-2xl md:flex-row md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="bg-surface/90 text-text-primary hover:bg-surface-muted absolute top-4 right-4 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur-xs transition-colors"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="bg-surface-muted/40 flex flex-col p-4 sm:p-6 md:w-1/2">
          <div className="bg-surface-muted relative aspect-3/4 w-full overflow-hidden rounded-2xl">
            <img
              src={currentImage}
              alt={`${product.name} view ${activeAngleIndex + 1}`}
              className="h-full w-full object-cover transition-all duration-300"
            />

            {images.length > 1 && (
              <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setActiveAngleIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                  className="bg-surface/80 text-text-primary hover:bg-surface pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-sm"
                  aria-label="Previous angle"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveAngleIndex((prev) => (prev + 1) % images.length)
                  }
                  className="bg-surface/80 text-text-primary hover:bg-surface pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-sm"
                  aria-label="Next angle"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAngleIndex(idx)}
                  className={cn(
                    'h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all sm:h-14 sm:w-14',
                    activeAngleIndex === idx
                      ? 'border-brass ring-brass/40 shadow-xs ring-2'
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

        <div className="flex flex-col justify-between p-6 md:w-1/2 md:overflow-y-auto md:p-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-brass-dark text-xs font-semibold tracking-wider uppercase">
                {product.category} • {product.subcategoryLabel}
              </span>
              {product.isFeatured && (
                <span className="bg-brass/20 text-brass-dark rounded-full px-2 py-0.5 text-[10px] font-bold">
                  Atelier Choice
                </span>
              )}
            </div>

            <h2 className="text-text-primary mt-2 font-serif text-2xl font-normal sm:text-3xl">
              {product.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-text-muted text-xs uppercase">
                {product.pricePrefix || 'from'}
              </span>
              <span className="text-text-primary font-sans text-2xl font-bold">
                {product.priceFormatted}
              </span>
            </div>

            <p className="text-text-secondary mt-4 text-xs leading-relaxed sm:text-sm">
              {product.shortDescription}
            </p>

            <div className="border-border-subtle bg-surface-muted/30 mt-6 space-y-2.5 rounded-2xl border p-4 text-xs">
              <div className="text-text-secondary flex items-center gap-2">
                <Ruler className="text-brass h-4 w-4 shrink-0" />
                <span className="text-text-primary font-medium">
                  Dimensions:
                </span>
                <span>{product.dimensions || 'Customizable to space'}</span>
              </div>
              <div className="text-text-secondary flex items-center gap-2">
                <Layers className="text-brass h-4 w-4 shrink-0" />
                <span className="text-text-primary font-medium">Material:</span>
                <span>{product.material}</span>
              </div>
              <div className="text-text-secondary flex items-center gap-2">
                <Clock className="text-brass h-4 w-4 shrink-0" />
                <span className="text-text-primary font-medium">
                  Atelier Lead Time:
                </span>
                <span>{product.leadTime || '14–21 Working Days'}</span>
              </div>
              <div className="text-text-secondary flex items-center gap-2">
                <ShieldCheck className="text-brass h-4 w-4 shrink-0" />
                <span className="text-text-primary font-medium">
                  Joinery Guarantee:
                </span>
                <span>10-Year Master Guarantee</span>
              </div>
            </div>
          </div>

          <div className="border-border-subtle mt-6 space-y-3 border-t pt-4">
            <div className="flex items-center gap-3">
              <div className="border-border-subtle bg-surface-muted/40 flex items-center rounded-full border p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-text-secondary hover:bg-surface flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-text-primary w-8 text-center text-xs font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-text-secondary hover:bg-surface flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={cn(
                  'flex grow cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold tracking-wider uppercase shadow-md transition-all duration-200',
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

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-brass/40 text-brass-dark hover:bg-brass-light/40 flex w-full items-center justify-center gap-2 rounded-full border py-2.5 text-xs font-semibold tracking-wide transition-colors"
            >
              <MessageCircle className="text-whatsapp h-4 w-4" />
              <span>Inquire Custom Sizing on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
