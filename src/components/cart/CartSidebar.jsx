import { useEffect, useRef, useState } from 'react'
import { useCart } from '@/context'
import { useLenis } from '@/components/providers'
import { Button } from '@/components/ui'
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const formatBdt = (value) => `৳${value.toLocaleString('en-US')}`

export const CartSidebar = () => {
  const {
    items,
    isCartOpen,
    totalCount,
    subtotalFormatted,
    clientInfo,
    setClientInfo,
    closeCart,
    removeItem,
    updateQuantity,
    updateItemNotes,
    clearCart,
    generateWhatsAppUrl,
  } = useCart()

  const lenis = useLenis()
  const drawerRef = useRef(null)
  const [showClientForm, setShowClientForm] = useState(false)
  const [activeNoteId, setActiveNoteId] = useState(null)

  // Pause Lenis smooth scroll and prevent body scroll when drawer is open
  useEffect(() => {
    if (!lenis) return
    if (isCartOpen) {
      lenis.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis.start()
      document.body.style.overflow = ''
    }
    return () => {
      if (lenis) lenis.start()
      document.body.style.overflow = ''
    }
  }, [isCartOpen, lenis])

  // Keyboard accessibility: ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCartOpen, closeCart])

  if (!isCartOpen) return null

  const handleBackdropClick = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      closeCart()
    }
  }

  const handleOrderClick = () => {
    const url = generateWhatsAppUrl()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Close the drawer and glide down to the collections gallery
  const handleBrowseClick = () => {
    closeCart()
    const target = document.getElementById('collections')
    if (!target) return
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -90,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const inputClass =
    'w-full rounded-lg border border-border-subtle bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted/70 outline-none transition-colors focus:border-brass'

  const stepperButtonClass =
    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary'

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      {/* Soft veil over the page */}
      <div
        className="bg-charcoal-deep/35 animate-fade-in fixed inset-0 backdrop-blur-[2px]"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer — full width on mobile, a slim column from tablet up */}
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
        <aside
          ref={drawerRef}
          data-lenis-prevent
          className={cn(
            'animate-drawer-in pointer-events-auto flex h-dvh w-screen flex-col',
            'bg-canvas border-border-subtle shadow-editorial-lg border-l',
            'sm:w-105 lg:w-115'
          )}
        >
          {/* Header */}
          <header className="flex items-start justify-between gap-4 px-5 pt-6 pb-5 sm:px-7 sm:pt-7">
            <div>
              <p className="text-text-muted text-[10.5px] tracking-[0.2em] uppercase">
                Shopping Cart
              </p>
              <h2 className="text-text-primary mt-1.5 font-serif text-2xl leading-none font-normal tracking-tight sm:text-[28px]">
                {totalCount === 0
                  ? 'Empty'
                  : `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}
              </h2>
            </div>

            <button
              type="button"
              onClick={closeCart}
              className="border-border-subtle text-text-secondary hover:border-brass/50 hover:text-text-primary focus-visible:ring-brass flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border bg-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </header>

          {/* Body */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-7"
          >
            {items.length === 0 ? (
              /* Empty state */
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="border-border-warm text-text-muted flex h-16 w-16 items-center justify-center rounded-full border">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.25} />
                </div>
                <h3 className="text-text-primary mt-6 font-serif text-lg font-normal">
                  Your cart is empty
                </h3>
                <p className="text-text-secondary mt-2 max-w-60 text-sm leading-relaxed">
                  Every Heaven piece is made to your proportions. Start with a
                  collection to begin your commission.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleBrowseClick}
                  className="mt-7"
                >
                  Explore Collections
                </Button>
              </div>
            ) : (
              /* Item list — hairline rows, no boxes */
              <ul>
                {items.map((item) => {
                  const isNoteOpen = activeNoteId === item.id

                  return (
                    <li
                      key={item.id}
                      className="border-border-subtle border-t py-5"
                    >
                      <div className="flex gap-4">
                        <div className="bg-surface-muted border-border-subtle h-20 w-20 shrink-0 overflow-hidden rounded-lg border sm:h-22 sm:w-22">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="text-text-primary font-serif text-[15px] leading-snug font-normal sm:text-base">
                            {item.name}
                          </h3>

                          {item.finish && (
                            <p className="text-text-muted mt-0.5 line-clamp-1 text-xs">
                              {item.finish}
                            </p>
                          )}

                          <p className="text-text-secondary mt-1.5 text-sm">
                            {formatBdt(item.price)}
                          </p>

                          {/* Stepper + line total */}
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="border-border-subtle bg-surface flex items-center rounded-full border p-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className={stepperButtonClass}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="text-text-primary min-w-6 text-center text-sm tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className={stepperButtonClass}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                              <span
                                className="bg-border-subtle mx-0.5 h-4 w-px"
                                aria-hidden="true"
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className={cn(
                                  stepperButtonClass,
                                  'hover:text-destructive'
                                )}
                                aria-label={`Remove ${item.name}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            {item.quantity > 1 && (
                              <span className="text-text-primary font-serif text-sm sm:text-base">
                                {formatBdt(item.price * item.quantity)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bespoke note */}
                      <div className="mt-3 pl-24 sm:pl-26">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveNoteId(isNoteOpen ? null : item.id)
                          }
                          className="text-text-muted hover:text-brass-dark cursor-pointer text-[11px] tracking-wide underline underline-offset-4 transition-colors"
                        >
                          {item.notes
                            ? 'Edit note'
                            : 'Add dimensions or finish'}
                        </button>

                        {isNoteOpen && (
                          <input
                            type="text"
                            value={item.notes || ''}
                            onChange={(e) =>
                              updateItemNotes(item.id, e.target.value)
                            }
                            placeholder="e.g. 7.5ft length, matte walnut"
                            className={cn(inputClass, 'mt-2 text-xs')}
                          />
                        )}

                        {item.notes && !isNoteOpen && (
                          <p className="text-text-secondary mt-1 line-clamp-2 text-[11px] italic">
                            &ldquo;{item.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}

            {items.length > 0 && (
              <div className="border-border-subtle flex items-center justify-between border-t py-4">
                <button
                  type="button"
                  onClick={() => setShowClientForm(!showClientForm)}
                  className="text-text-secondary hover:text-text-primary flex cursor-pointer items-center gap-1.5 text-xs tracking-wide transition-colors"
                  aria-expanded={showClientForm}
                >
                  Delivery details
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform duration-200',
                      showClientForm && 'rotate-180'
                    )}
                  />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-text-muted hover:text-destructive cursor-pointer text-xs tracking-wide transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}

            {items.length > 0 && showClientForm && (
              <div className="animate-fade-in space-y-2.5 pb-5">
                <input
                  type="text"
                  value={clientInfo.name}
                  onChange={(e) =>
                    setClientInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className={inputClass}
                  aria-label="Your name"
                />
                <input
                  type="text"
                  value={clientInfo.location}
                  onChange={(e) =>
                    setClientInfo((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Delivery area — Agrabad, Khulshi, GEC"
                  className={inputClass}
                  aria-label="Delivery area"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="border-border-subtle border-t px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-7 sm:pt-5 sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-text-secondary text-sm">Subtotal</span>
              <span className="text-text-primary font-serif text-xl tracking-tight sm:text-2xl">
                {subtotalFormatted}
              </span>
            </div>
            <p className="text-text-muted mt-1 text-right text-[11px]">
              Delivery &amp; 3D consultation included across Chattogram
            </p>

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBrowseClick}
                className="order-2 w-full sm:order-1"
              >
                Keep browsing
              </Button>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={handleOrderClick}
                disabled={items.length === 0}
                className="order-1 w-full sm:order-2"
              >
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                Order on WhatsApp
              </Button>
            </div>
          </footer>
        </aside>
      </div>
    </div>
  )
}
