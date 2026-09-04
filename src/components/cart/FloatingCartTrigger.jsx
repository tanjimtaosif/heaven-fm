import { useCart } from '@/context'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

export const FloatingCartTrigger = () => {
  const { totalCount, isCartOpen, openCart } = useCart()

  if (totalCount === 0 || isCartOpen) return null

  return (
    <div className="animate-fade-up fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={openCart}
        className={cn(
          'group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full sm:h-13 sm:w-13',
          'border-brass/50 bg-charcoal-deep/95 text-brass hover:border-brass hover:text-canvas border',
          'shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_0_20px_-3px_rgba(196,159,102,0.3)]',
          'backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95',
          'focus-visible:ring-brass focus-visible:ring-offset-canvas focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
        )}
        aria-label={`Open Bespoke Bag (${totalCount} ${totalCount === 1 ? 'item' : 'items'})`}
      >
        <ShoppingBag className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

        {/* Item count badge */}
        <span className="bg-brass text-charcoal-deep ring-charcoal-deep absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-extrabold shadow-xs ring-2">
          {totalCount}
        </span>
      </button>
    </div>
  )
}
