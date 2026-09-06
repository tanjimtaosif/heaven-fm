import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context'
import { COMPANY_INFO } from '@/constants/companyData'
import {
  X,
  ShoppingBag,
  Check,
  Zap,
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
  const navigate = useNavigate()
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

  const isOutOfStock = !product.stock || product.stock <= 0
  const isLowStock =
    product.stock > 0 && product.stock <= (product.lowStockThreshold || 3)
  const maxAvailableQuantity = Math.max(1, product.stock || 1)

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image]
  const currentImage = images[activeAngleIndex] || product.image

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addItem(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (isOutOfStock) return
    const buyNowItem = {
      id: product.id,
      sku: product.sku || '',
      name: product.name,
      category: product.category,
      subcategoryLabel: product.subcategoryLabel || '',
      price: product.price,
      priceFormatted: product.priceFormatted,
      image: currentImage || product.image,
      finish: product.finish || 'Standard Bespoke Finish',
      dimensions: product.dimensions || 'Standard Atelier Dimensions',
      quantity: quantity,
    }
    try {
      sessionStorage.setItem('heaven_buy_now_item', JSON.stringify(buyNowItem))
    } catch (e) {
      console.error('Error saving buy-now item to storage', e)
    }
    onClose()
    navigate('/checkout', { state: { buyNowItem } })
  }

  const whatsappMessage = isOutOfStock
    ? `Hello Heaven Furniture Mart atelier, I am inquiring about the ${product.name} (SKU: ${product.sku || 'N/A'}, ${product.priceFormatted}), which is currently marked Out of Stock. Can I place a custom bespoke order or request an atelier workshop timeline for this piece?`
    : `Hello Heaven Furniture Mart atelier, I am inquiring about the ${product.name} (SKU: ${product.sku || 'N/A'}, ${product.priceFormatted}). Can you provide more details regarding custom dimensions, stock availability (${product.stock} in stock), and timber options?`

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.contact.phoneClean.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    whatsappMessage
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
              className={cn(
                'h-full w-full object-cover transition-all duration-300',
                isOutOfStock && 'opacity-90 grayscale-15'
              )}
            />

            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {isOutOfStock ? (
                <span className="text-label-xs rounded-full border border-rose-800/30 bg-rose-950/85 px-2.5 py-0.5 font-bold tracking-wider text-rose-200 uppercase shadow-xs backdrop-blur-xs">
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="text-label-xs rounded-full border border-amber-800/30 bg-amber-950/85 px-2.5 py-0.5 font-bold tracking-wider text-amber-200 uppercase shadow-xs backdrop-blur-xs">
                  Only {product.stock} Left
                </span>
              ) : (
                <span className="text-label-xs rounded-full border border-emerald-800/30 bg-emerald-950/85 px-2.5 py-0.5 font-bold tracking-wider text-emerald-200 uppercase shadow-xs backdrop-blur-xs">
                  In Stock
                </span>
              )}
            </div>

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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-brass-dark text-xs font-semibold tracking-wider uppercase">
                {product.category} • {product.subcategoryLabel}
              </span>
              {product.sku && (
                <span className="bg-surface-muted text-text-muted border-border-subtle text-label-xs rounded border px-2 py-0.5 font-mono font-semibold tracking-wide">
                  SKU: {product.sku}
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-brass/20 text-brass-dark text-label-xs rounded-full px-2 py-0.5 font-bold">
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

            <div className="mt-3.5">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 rounded-xl border border-rose-800/30 bg-rose-950/20 px-3 py-2 text-xs font-medium text-rose-300">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span>
                    Currently Out of Stock — Available via Custom Bespoke
                    Commission
                  </span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-2 rounded-xl border border-amber-800/30 bg-amber-950/20 px-3 py-2 text-xs font-medium text-amber-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                  <span>
                    Low Stock: Only {product.stock} units remaining in atelier
                    inventory
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-800/30 bg-emerald-950/20 px-3 py-2 text-xs font-medium text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>
                    In Stock: {product.stock} units ready for immediate
                    white-glove dispatch
                  </span>
                </div>
              )}
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
              <div
                className={cn(
                  'border-border-subtle bg-surface-muted/40 flex items-center rounded-full border p-1',
                  isOutOfStock && 'cursor-not-allowed opacity-50'
                )}
              >
                <button
                  type="button"
                  disabled={isOutOfStock || quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={cn(
                    'text-text-secondary flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    isOutOfStock || quantity <= 1
                      ? 'cursor-not-allowed opacity-40'
                      : 'hover:bg-surface cursor-pointer'
                  )}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-text-primary w-8 text-center text-xs font-semibold tabular-nums">
                  {isOutOfStock ? 0 : quantity}
                </span>
                <button
                  type="button"
                  disabled={isOutOfStock || quantity >= maxAvailableQuantity}
                  onClick={() =>
                    setQuantity(Math.min(maxAvailableQuantity, quantity + 1))
                  }
                  className={cn(
                    'text-text-secondary flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                    isOutOfStock || quantity >= maxAvailableQuantity
                      ? 'cursor-not-allowed opacity-40'
                      : 'hover:bg-surface cursor-pointer'
                  )}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {isOutOfStock ? (
                <button
                  type="button"
                  disabled
                  className="border-border-subtle bg-surface-muted text-text-muted flex grow cursor-not-allowed items-center justify-center gap-2 rounded-full border py-3 text-xs font-semibold tracking-wider uppercase opacity-70"
                >
                  <span>Out of Stock</span>
                </button>
              ) : (
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
              )}
            </div>

            {isOutOfStock ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-brass/40 bg-brass/10 text-brass-dark hover:bg-brass-light/40 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border py-3.5 text-xs font-bold tracking-wider uppercase shadow-xs transition-all duration-200 active:scale-98"
              >
                <MessageCircle className="text-whatsapp h-4 w-4" />
                <span>Inquire Bespoke Order on WhatsApp</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleBuyNow}
                className="bg-brass text-charcoal-deep hover:bg-brass-light flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold tracking-wider uppercase shadow-md transition-all duration-200 active:scale-98"
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Buy Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
