import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

// Furnished Master Bedroom Suites Photography from Heaven Furniture Mart assets
import noirArchBedImg from '@/assets/products/beds/black-shot-1.webp'
import emeraldBedImg from '@/assets/products/beds/green-shot-1.webp'
import teakBedImg from '@/assets/products/beds/wooden-shot-1.webp'
import brunelloWalnutNightstandImg from '@/assets/products/bedside-tables/brown-shot-1.webp'
import alabasterNightstandImg from '@/assets/products/bedside-tables/white-shot-1.webp'
import aethelgardVanityImg from '@/assets/products/dressing-table/white-shot-1.webp'
import rivieraNavyVanityImg from '@/assets/products/dressing-table/navy-shot-1.webp'
import vareseGlassWardrobeImg from '@/assets/products/wardrobes/coffee-shot-1.webp'
import palazzoChocoWardrobeImg from '@/assets/products/wardrobes/choco-shot-1.webp'
import arisTeakWardrobeImg from '@/assets/products/wardrobes/wood-shot-1.webp'

/**
 * Curated Master Bedroom Furniture Suites matching Heaven Furniture Mart's luxury brand theme:
 * Playfair Display typography, warm brass accents, meaningful catalog pricing & furnished photography.
 */
const FEATURED_FURNITURE_ITEMS = [
  {
    id: 'noir-fluted-arch-bed',
    name: 'The Noir Fluted Arch Bed',
    room: 'Master Bed',
    startingPrice: '৳135,000',
    modelCount: 'Obsidian Bouclé',
    material: 'Architectural Arched Headboard • Matte Bouclé',
    image: noirArchBedImg,
    alt: 'Master king arch bed with fluted channeled headboard in studio suite',
    href: '#/shop?category=bedroom&sub=beds',
  },
  {
    id: 'varese-espresso-wardrobe',
    name: 'The Varese Glass Wardrobe',
    room: 'Walk-in Wardrobe',
    startingPrice: '৳165,000',
    modelCount: 'Tinted Glass Fronts',
    material: 'Smoked Espresso • Internal Illumination',
    image: vareseGlassWardrobeImg,
    alt: 'Architectural tinted glass luxury wardrobe armoire',
    href: '#/shop?category=bedroom&sub=wardrobes',
  },
  {
    id: 'aethelgard-fluted-vanity',
    name: 'The Aethelgard Vanity Suite',
    room: 'Dressing Console',
    startingPrice: '৳72,000',
    modelCount: 'Alabaster White',
    material: 'Ribbed Fluted Detail • Satin Brass Pulls',
    image: aethelgardVanityImg,
    alt: 'Fluted white dressing table vanity console with gold hardware',
    href: '#/shop?category=bedroom&sub=dressing-tables',
  },
  {
    id: 'brunello-walnut-nightstand',
    name: 'The Brunello Walnut Pedestal',
    room: 'Bedside Table',
    startingPrice: '৳26,000',
    modelCount: 'Warm Walnut',
    material: 'Dovetailed Teak Subframe • Solid Brass Hardware',
    image: brunelloWalnutNightstandImg,
    alt: 'Warm walnut solid wood bedside nightstand table',
    href: '#/shop?category=bedroom&sub=bedside-tables',
  },
  {
    id: 'emerald-oasis-platform-bed',
    name: 'The Emerald Wingback Bed',
    room: 'Master Bed',
    startingPrice: '৳148,000',
    modelCount: 'Italian Velvet',
    material: 'Deep Emerald Velvet • Winged Arch Headboard',
    image: emeraldBedImg,
    alt: 'Emerald green luxury upholstered wingback king bed',
    href: '#/shop?category=bedroom&sub=beds',
  },
  {
    id: 'palazzo-choco-wardrobe',
    name: 'The Palazzo Modular Wardrobe',
    room: 'Master Armoire',
    startingPrice: '৳135,000',
    modelCount: 'Modular System',
    material: 'Deep Truffle Teak • Bronze Alloy Trim',
    image: palazzoChocoWardrobeImg,
    alt: 'Luxury chocolate teakwood modular master wardrobe suite',
    href: '#/shop?category=bedroom&sub=wardrobes',
  },
  {
    id: 'riviera-navy-vanity',
    name: 'The Riviera Navy Vanity',
    room: 'Dressing Suite',
    startingPrice: '৳65,000',
    modelCount: 'Midnight Lacquer',
    material: 'Deep Navy Lacquer • Backlit Mirror Ready',
    image: rivieraNavyVanityImg,
    alt: 'Midnight navy dressing table vanity console',
    href: '#/shop?category=bedroom&sub=dressing-tables',
  },
  {
    id: 'alabaster-floating-nightstand',
    name: 'The Alabaster Nightstand',
    room: 'Bedside Table',
    startingPrice: '৳28,000',
    modelCount: 'Warm Ivory',
    material: 'Warm Ivory Lacquer • Satin Brass Accents',
    image: alabasterNightstandImg,
    alt: 'White alabaster bedside nightstand table with drawer',
    href: '#/shop?category=bedroom&sub=bedside-tables',
  },
  {
    id: 'nordic-minimal-teak-bed',
    name: 'The Nordic Teak Platform Bed',
    room: 'Master Bed',
    startingPrice: '৳128,000',
    modelCount: '100% Solid Teak',
    material: 'Kiln-Dried Burma Teak • Japanese Joinery',
    image: teakBedImg,
    alt: 'Scandinavian minimalist solid teakwood platform bed',
    href: '#/shop?category=bedroom&sub=beds',
  },
  {
    id: 'aris-scandinavian-wardrobe',
    name: 'The Aris Teak 4-Door Wardrobe',
    room: 'Master Wardrobe',
    startingPrice: '৳145,000',
    modelCount: 'Golden Teak',
    material: 'Architectural Burma Teak • Brass Bar Handles',
    image: arisTeakWardrobeImg,
    alt: 'Scandinavian solid teak 4-door wardrobe armoire',
    href: '#/shop?category=bedroom&sub=wardrobes',
  },
]

const TOTAL_ORIGINAL = FEATURED_FURNITURE_ITEMS.length // 10 items

export const PopularFurnituresSection = () => {
  const scrollContainerRef = useRef(null)
  const isPausedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)
  const [progress, setProgress] = useState(0)

  // 3 sets of items for true seamless infinite wrapping without jump or scroll-back
  // Set 0 (0..9): Backward buffer
  // Set 1 (10..19): Canonical primary view
  // Set 2 (20..29): Forward buffer
  const displayItems = [
    ...FEATURED_FURNITURE_ITEMS,
    ...FEATURED_FURNITURE_ITEMS,
    ...FEATURED_FURNITURE_ITEMS,
  ]

  // Pause continuous sliding helper
  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  // Resume continuous sliding helper
  const resumeAutoScroll = useCallback((delay = 500) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false
    }, delay)
  }, [])

  // Update progress indicator
  const updateProgress = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el || !el.children || el.children.length < 3 * TOTAL_ORIGINAL) return
    const startOffset = el.children[TOTAL_ORIGINAL]?.offsetLeft || 0
    const endOffset = el.children[2 * TOTAL_ORIGINAL]?.offsetLeft || 0
    const loopWidth = endOffset - startOffset
    if (loopWidth <= 0) return

    const current = el.scrollLeft - startOffset
    const normalized = ((current % loopWidth) + loopWidth) % loopWidth
    const pct = Math.min(Math.max((normalized / loopWidth) * 100, 3), 100)
    setProgress(pct)
  }, [])

  // Position at Set 1 on initial load
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const positionAtPrimarySet = () => {
      if (!el.children || el.children.length < 3 * TOTAL_ORIGINAL) return
      const initialOffset = el.children[TOTAL_ORIGINAL]?.offsetLeft || 0
      if (initialOffset > 0 && el.scrollLeft < 20) {
        el.scrollLeft = initialOffset
        updateProgress()
      }
    }

    positionAtPrimarySet()
    const timer = setTimeout(positionAtPrimarySet, 50)
    return () => clearTimeout(timer)
  }, [updateProgress])

  // Continuous marquee glide animation loop via requestAnimationFrame
  // NOTE: Container intentionally does NOT have `scroll-smooth` in CSS,
  // preventing the browser from animating a backward scroll when normalizing scrollLeft!
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let animationFrameId
    // Dignified, smooth luxury marquee sliding speed (pixels per frame)
    const speed = 0.95

    const step = () => {
      if (
        !isPausedRef.current &&
        el &&
        el.children &&
        el.children.length >= 3 * TOTAL_ORIGINAL
      ) {
        const startOffset = el.children[TOTAL_ORIGINAL]?.offsetLeft || 0
        const endOffset = el.children[2 * TOTAL_ORIGINAL]?.offsetLeft || 0
        const loopWidth = endOffset - startOffset

        if (loopWidth > 0) {
          el.scrollLeft += speed

          // Seamless infinite wrap:
          // Immediately as Set 1 moves past into Set 2, reset scrollLeft back by loopWidth.
          // Since Set 1 and Set 2 are pixel-identical, the transition is completely invisible.
          if (el.scrollLeft >= endOffset) {
            el.scrollLeft -= loopWidth
          } else if (el.scrollLeft < startOffset) {
            el.scrollLeft += loopWidth
          }

          updateProgress()
        }
      }
      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [updateProgress])

  // Manual scroll step (Prev / Next arrow buttons) with programmatic smooth scroll
  const handleScroll = (direction) => {
    pauseAutoScroll()
    const el = scrollContainerRef.current
    if (!el || !el.children || el.children.length < 3 * TOTAL_ORIGINAL) return

    const startOffset = el.children[TOTAL_ORIGINAL]?.offsetLeft || 0
    const endOffset = el.children[2 * TOTAL_ORIGINAL]?.offsetLeft || 0
    const loopWidth = endOffset - startOffset

    const card = el.querySelector('[data-card]')
    const cardWidth = card ? card.offsetWidth : 310
    const gap = 24
    const scrollAmount = (cardWidth + gap) * (direction === 'left' ? -1 : 1)

    // Pre-normalize boundary if user is about to scroll outside buffer range
    if (
      direction === 'left' &&
      el.scrollLeft - Math.abs(scrollAmount) < startOffset - loopWidth * 0.4
    ) {
      el.scrollLeft += loopWidth
    } else if (
      direction === 'right' &&
      el.scrollLeft + scrollAmount > endOffset + loopWidth * 0.4
    ) {
      el.scrollLeft -= loopWidth
    }

    // Programmatic smooth scroll for button clicks
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })

    // Normalize bounds and resume continuous marquee after user action settles
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      if (!el || !el.children || el.children.length < 3 * TOTAL_ORIGINAL) return
      if (el.scrollLeft >= endOffset) {
        el.scrollLeft -= loopWidth
      } else if (el.scrollLeft < startOffset) {
        el.scrollLeft += loopWidth
      }
      updateProgress()
      isPausedRef.current = false
    }, 1200)
  }

  // Touch handlers for mobile gesture interaction
  const handleTouchStart = () => {
    pauseAutoScroll()
  }

  const handleTouchEnd = () => {
    resumeAutoScroll(1000)
  }

  const handleContainerScroll = () => {
    updateProgress()
    const el = scrollContainerRef.current
    if (!el || !el.children || el.children.length < 3 * TOTAL_ORIGINAL) return
    const startOffset = el.children[TOTAL_ORIGINAL]?.offsetLeft || 0
    const endOffset = el.children[2 * TOTAL_ORIGINAL]?.offsetLeft || 0
    const loopWidth = endOffset - startOffset

    // Boundary normalization during manual mobile swiping
    if (loopWidth > 0) {
      if (el.scrollLeft >= endOffset + loopWidth * 0.4) {
        el.scrollLeft -= loopWidth
      } else if (el.scrollLeft <= startOffset - loopWidth * 0.4) {
        el.scrollLeft += loopWidth
      }
    }
  }

  return (
    <section
      id="popular-furnitures"
      className="bg-canvas relative overflow-hidden py-20 select-none sm:py-24 lg:py-28"
      aria-labelledby="featured-furniture-heading"
    >
      {/* Brand Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <Badge variant="brass">Master Atelier Showcase</Badge>
            <h2
              id="featured-furniture-heading"
              className="text-charcoal-deep font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.65rem]"
            >
              Featured Bedroom Suites
            </h2>
            <p className="text-text-secondary max-w-2xl text-sm leading-relaxed text-pretty sm:text-base">
              Fully furnished showroom favorites and master bedroom commissions
              handcrafted from seasoned Burma teak, kiln-dried mahogany, and
              rich bouclé upholstery.
            </p>
          </div>

          {/* Luxury Atelier Navigation Controls (Matching Brand Palette) */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            {/* Satin Brass Progress Track */}
            <div
              className="bg-border-warm/70 relative h-1 w-24 overflow-hidden rounded-full sm:w-32"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Featured furniture slide progress"
            >
              <div
                className="bg-brass absolute top-0 bottom-0 left-0 rounded-full transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Circular Atelier Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                aria-label="Previous furniture pieces"
                className={cn(
                  'border-border-warm bg-surface text-charcoal-deep flex h-10 w-10 items-center justify-center rounded-full border sm:h-11 sm:w-11',
                  'hover:border-brass hover:bg-brass hover:text-charcoal-deep hover:shadow-glow-brass transition-all duration-300',
                  'focus-visible:ring-brass cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:outline-none active:scale-95'
                )}
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                aria-label="Next furniture pieces"
                className={cn(
                  'border-border-warm bg-surface text-charcoal-deep flex h-10 w-10 items-center justify-center rounded-full border sm:h-11 sm:w-11',
                  'hover:border-brass hover:bg-brass hover:text-charcoal-deep hover:shadow-glow-brass transition-all duration-300',
                  'focus-visible:ring-brass cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:outline-none active:scale-95'
                )}
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Marquee Sliding Reel */}
      <div
        className="relative mt-10 sm:mt-12 lg:mt-14"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={() => resumeAutoScroll(400)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className={cn(
            'flex gap-5 overflow-x-auto px-4 sm:gap-6 sm:px-6 lg:gap-7 lg:px-8',
            'no-scrollbar',
            'touch-pan-x'
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {displayItems.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href={item.href}
              data-card
              className={cn(
                'group bg-surface relative flex shrink-0 flex-col overflow-hidden rounded-2xl sm:rounded-3xl',
                'w-65 sm:w-72.5 md:w-80 lg:w-85',
                'border-border-subtle/90 hover:border-brass/50 shadow-subtle hover:shadow-card-hover border transition-all duration-500',
                'focus-visible:ring-brass focus-visible:ring-2 focus-visible:outline-none'
              )}
              aria-label={`${item.name} — from ${item.startingPrice}, explore collection`}
            >
              {/* Product Photography Container */}
              <div className="bg-surface-muted relative aspect-4/3 w-full overflow-hidden sm:aspect-square">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Subtle scrim sheen on hover */}
                <div
                  className="from-charcoal-deep/40 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Room Category Pill Badge */}
                <span className="border-brass/30 bg-charcoal-deep/85 text-brass-light absolute top-3.5 left-3.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md">
                  {item.room}
                </span>

                {/* Showroom Furnished Pill */}
                <span className="border-border-subtle/80 bg-surface/90 text-charcoal-deep absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium tracking-wide shadow-xs backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Showroom Ready
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col justify-between p-4.5 sm:p-5">
                <div>
                  {/* Furniture Name (Serif Elegance) */}
                  <h3 className="text-charcoal-deep group-hover:text-brass-dark font-serif text-lg font-semibold tracking-tight transition-colors duration-200 sm:text-xl">
                    {item.name}
                  </h3>

                  {/* Material & Craft Detail */}
                  <p className="text-text-muted mt-1 line-clamp-1 text-xs font-normal">
                    {item.material}
                  </p>
                </div>

                {/* Pricing & Specification Row */}
                <div className="border-border-subtle/70 mt-4 flex items-center justify-between border-t pt-3">
                  <div>
                    <span className="text-text-muted block text-[10px] tracking-wider uppercase">
                      Starting From
                    </span>
                    <span className="text-charcoal-deep font-sans text-sm font-bold sm:text-base">
                      {item.startingPrice}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-text-muted block text-[10px] tracking-wider uppercase">
                      Finish Spec
                    </span>
                    <span className="text-brass-dark font-sans text-xs font-semibold sm:text-sm">
                      {item.modelCount}
                    </span>
                  </div>
                </div>

                {/* Explore Action Link */}
                <div className="text-charcoal-deep group-hover:text-brass mt-3.5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors duration-200">
                  <span>Explore Suite</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
