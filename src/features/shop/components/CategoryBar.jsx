import { useRef } from 'react'
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

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return
    const offset = direction === 'left' ? -260 : 260
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute -top-11 right-0 hidden items-center gap-1 sm:flex">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="border-border-subtle bg-surface text-text-secondary hover:border-brass hover:text-brass pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          className="border-border-subtle bg-surface text-text-secondary hover:border-brass hover:text-brass pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="no-scrollbar -mx-4 flex snap-x items-center gap-3 overflow-x-auto scroll-smooth px-4 py-2 sm:mx-0 sm:gap-4 sm:px-0"
      >
        {CATEGORY_ITEMS.map((item) => {
          const isActive = activeCategoryId === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className={cn(
                'group relative flex shrink-0 cursor-pointer snap-start items-center gap-3 rounded-2xl border p-2 pr-4 transition-all duration-200 select-none',
                isActive
                  ? 'border-brass bg-surface shadow-subtle ring-brass/30 ring-1'
                  : 'border-border-subtle/80 bg-surface hover:border-brass/50 hover:bg-surface-muted/40'
              )}
              aria-pressed={isActive}
            >
              <div
                className={cn(
                  'bg-surface-muted relative h-12 w-12 overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-13 sm:w-13',
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

              <div className="text-left">
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
                <span className="text-text-muted block text-[11px]">
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
