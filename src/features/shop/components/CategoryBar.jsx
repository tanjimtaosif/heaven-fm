import { useRef, useState, useEffect, useCallback } from 'react'
import { Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

import sofaCat from '@/assets/category/sofa-cat.webp'
import bedCat from '@/assets/category/bed-cat.webp'
import diningCat from '@/assets/category/dining-cat.webp'
import officeCat from '@/assets/category/office-cat.webp'

const CATEGORY_ITEMS = [
  {
    id: 'all',
    name: 'All Products',
    icon: Layers,
    type: 'icon',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: bedCat,
    type: 'image',
  },
  {
    id: 'living-room',
    name: 'Living Room',
    image: sofaCat,
    type: 'image',
  },
  {
    id: 'dining',
    name: 'Dining',
    image: diningCat,
    type: 'image',
  },
  {
    id: 'office-study',
    name: 'Office & Study',
    image: officeCat,
    type: 'image',
  },
  {
    id: 'bespoke',
    name: 'Bespoke / Custom',
    icon: Sparkles,
    type: 'bespoke',
  },
]

export const CategoryBar = ({ activeCategoryId = 'all', onSelectCategory }) => {
  const scrollContainerRef = useRef(null)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return

    // Tolerance of 2px for browser subpixel rounding
    const overflow = el.scrollWidth > el.clientWidth + 2
    setHasOverflow(overflow)

    if (overflow) {
      setCanScrollLeft(el.scrollLeft > 4)
      setCanScrollRight(
        Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 4
      )
    } else {
      setCanScrollLeft(false)
      setCanScrollRight(false)
    }
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    updateScrollState()

    const handleScroll = () => {
      updateScrollState()
    }

    el.addEventListener('scroll', handleScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })
    resizeObserver.observe(el)

    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return
    const offset = direction === 'left' ? -280 : 280
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <div className="relative mb-4 sm:mb-6">
      {/* Navigation buttons appear ONLY when tabs don't fit on screen (and hidden on mobile where users slide with touch) */}
      {hasOverflow && (
        <>
          {/* Left scroll button with soft fade */}
          <div
            className={cn(
              'pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden items-center pr-6 transition-opacity duration-200 sm:flex',
              'from-canvas via-canvas/90 bg-linear-to-r to-transparent',
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            )}
          >
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="border-border-subtle bg-surface text-text-secondary hover:border-brass hover:text-brass pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-all active:scale-95 disabled:pointer-events-none"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          {/* Right scroll button with soft fade */}
          <div
            className={cn(
              'pointer-events-none absolute top-0 right-0 bottom-0 z-10 hidden items-center pl-6 transition-opacity duration-200 sm:flex',
              'from-canvas via-canvas/90 bg-linear-to-l to-transparent',
              canScrollRight ? 'opacity-100' : 'opacity-0'
            )}
          >
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="border-border-subtle bg-surface text-text-secondary hover:border-brass hover:text-brass pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border shadow-sm transition-all active:scale-95 disabled:pointer-events-none"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}

      <div
        ref={scrollContainerRef}
        data-no-scrollbar
        className="no-scrollbar -mx-4 flex snap-x scroll-pl-4 scrollbar-none items-center gap-2.5 overflow-x-auto scroll-smooth px-4 py-2 sm:-mx-6 sm:scroll-pl-6 sm:gap-3.5 sm:px-6 lg:mx-0 lg:scroll-pl-0 lg:px-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {CATEGORY_ITEMS.map((item) => {
          const isActive = activeCategoryId === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className={cn(
                'group relative flex shrink-0 cursor-pointer snap-start items-center gap-2.5 rounded-2xl border p-2 pr-3.5 transition-all duration-200 select-none sm:gap-3 sm:pr-4',
                isActive
                  ? 'border-brass bg-surface shadow-subtle ring-brass/30 ring-1'
                  : 'border-border-subtle/80 bg-surface hover:border-brass/50 hover:bg-surface-muted/40'
              )}
              aria-pressed={isActive}
            >
              <div
                className={cn(
                  'bg-surface-muted relative h-11 w-11 shrink-0 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-13 sm:w-13',
                  isActive ? 'ring-brass/40 ring-1' : ''
                )}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : item.type === 'bespoke' ? (
                  <div className="bg-charcoal-surface text-brass flex h-full w-full items-center justify-center">
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                ) : (
                  <div className="bg-brass-light/80 text-brass-dark flex h-full w-full items-center justify-center">
                    <Layers className="text-brass h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="text-left whitespace-nowrap">
                <span
                  className={cn(
                    'block text-xs font-semibold tracking-wide transition-colors sm:text-sm',
                    isActive
                      ? 'text-brass-dark font-bold'
                      : 'text-text-primary group-hover:text-brass-dark'
                  )}
                >
                  {item.name}
                </span>
                <span className="text-text-muted text-label-sm block">
                  {item.id === 'all'
                    ? 'Full Catalog'
                    : item.id === 'bespoke'
                      ? 'Custom Crafted'
                      : 'Collection'}
                </span>
              </div>

              {isActive && (
                <span className="bg-brass absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
