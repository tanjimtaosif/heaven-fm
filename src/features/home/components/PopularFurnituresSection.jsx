import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

import noirArchBedImg from '@/assets/products/beds/HFM-BED-001/shot-1.webp'
import emeraldBedImg from '@/assets/products/beds/HFM-BED-002/shot-1.webp'
import teakBedImg from '@/assets/products/beds/HFM-BED-004/shot-1.webp'
import brunelloWalnutNightstandImg from '@/assets/products/bedside-tables/HFM-BST-001/shot-1.webp'
import alabasterNightstandImg from '@/assets/products/bedside-tables/HFM-BST-003/shot-1.webp'
import aethelgardVanityImg from '@/assets/products/dressing-tables/HFM-DRS-003/shot-1.webp'
import rivieraNavyVanityImg from '@/assets/products/dressing-tables/HFM-DRS-001/shot-1.webp'
import vareseGlassWardrobeImg from '@/assets/products/wardrobes/HFM-WDR-002/shot-1.webp'
import palazzoChocoWardrobeImg from '@/assets/products/wardrobes/HFM-WDR-001/shot-1.webp'
import arisTeakWardrobeImg from '@/assets/products/wardrobes/HFM-WDR-003/shot-1.webp'

const FEATURED_FURNITURE_ITEMS = [
  {
    id: 'royal-chevron-midnight-bed',
    sku: 'HFM-BED-001',
    name: 'The Royal Chevron Midnight Bed',
    room: 'Master Bedroom',
    startingPrice: '৳155,000',
    modelCount: 'Midnight & Gold',
    material: 'Midnight Velvet • 24K Gold Leaf Trim',
    image: noirArchBedImg,
    alt: 'Royal chevron midnight velvet king bed with gold trellis frame',
    href: '/shop?category=bedroom&subcategory=beds',
  },
  {
    id: 'greek-key-carved-espresso-armoire',
    sku: 'HFM-WDR-002',
    name: 'The Greek-Key Espresso Armoire',
    room: 'Wardrobe Suite',
    startingPrice: '৳158,000',
    modelCount: 'Smoked Espresso',
    material: 'Carved Greek-Key Panels • Solid Mahogany',
    image: vareseGlassWardrobeImg,
    alt: 'Dark espresso mahogany armoire and chest with carved fretwork',
    href: '/shop?category=bedroom&subcategory=wardrobes',
  },
  {
    id: 'alabaster-fluted-marble-vanity-suite',
    sku: 'HFM-DRS-003',
    name: 'The Alabaster Fluted Vanity Suite',
    room: 'Dressing Console',
    startingPrice: '৳74,000',
    modelCount: 'Ivory & Marble',
    material: 'Natural Marble Top • Backlit LED Mirror',
    image: aethelgardVanityImg,
    alt: 'Fluted white dressing table vanity console with gold hardware',
    href: '/shop?category=bedroom&subcategory=dressing-tables',
  },
  {
    id: 'neoclassical-empire-gilded-nightstand',
    sku: 'HFM-BST-001',
    name: 'The Neoclassical Empire Nightstand',
    room: 'Bedside Table',
    startingPrice: '৳32,000',
    modelCount: 'Empire Mahogany',
    material: 'Solid Mahogany • Gilded Rope Molding',
    image: brunelloWalnutNightstandImg,
    alt: 'Neoclassical solid mahogany nightstand with gilded columns',
    href: '/shop?category=bedroom&subcategory=bedside-tables',
  },
  {
    id: 'emerald-sovereign-quilted-bed',
    sku: 'HFM-BED-002',
    name: 'The Emerald Sovereign Bed',
    room: 'Master Bedroom',
    startingPrice: '৳148,000',
    modelCount: 'Italian Velvet',
    material: 'Italian Emerald Velvet • Diamond Quilted Footboard',
    image: emeraldBedImg,
    alt: 'Emerald green luxury upholstered wingback king bed',
    href: '/shop?category=bedroom&subcategory=beds',
  },
  {
    id: 'heritage-3door-solid-wood-wardrobe',
    sku: 'HFM-WDR-001',
    name: 'The Heritage 3-Door Teak Wardrobe',
    room: 'Master Wardrobe',
    startingPrice: '৳135,000',
    modelCount: 'Solid Teak',
    material: 'Solid Seasoned Teak • Full Mirror Door',
    image: palazzoChocoWardrobeImg,
    alt: 'Solid teakwood 3-door wardrobe with full-length dressing mirror',
    href: '/shop?category=bedroom&subcategory=wardrobes',
  },
  {
    id: 'halo-led-midnight-slate-vanity',
    sku: 'HFM-DRS-001',
    name: 'The Halo LED Midnight Vanity',
    room: 'Dressing Suite',
    startingPrice: '৳78,000',
    modelCount: 'Slate & Brass',
    material: 'Touch-Sensor Halo LED • Brushed Gold Trims',
    image: rivieraNavyVanityImg,
    alt: 'Midnight slate navy vanity console with halo LED mirror',
    href: '/shop?category=bedroom&subcategory=dressing-tables',
  },
  {
    id: 'versailles-round-marble-gilded-nightstand',
    sku: 'HFM-BST-003',
    name: 'The Versailles Marble Nightstand',
    room: 'Bedside Table',
    startingPrice: '৳38,000',
    modelCount: 'Italian Marble',
    material: 'Honed Marble Top • Gold Leaf Cabriole Base',
    image: alabasterNightstandImg,
    alt: 'Round French gilded nightstand with Italian cream marble top',
    href: '/shop?category=bedroom&subcategory=bedside-tables',
  },
  {
    id: 'louis-xv-french-provincial-linen-bed',
    sku: 'HFM-BED-004',
    name: 'The Louis XV Wingback Linen Bed',
    room: 'Master Bedroom',
    startingPrice: '৳138,000',
    modelCount: 'Belgian Linen',
    material: 'Natural Textured Linen • Nailhead Trim & Bench',
    image: teakBedImg,
    alt: 'French Provincial Louis XV upholstered linen wingback bed',
    href: '/shop?category=bedroom&subcategory=beds',
  },
  {
    id: 'royal-chittagong-teak-inlaid-wardrobe',
    sku: 'HFM-WDR-003',
    name: 'The Royal Chittagong Teak Wardrobe',
    room: 'Master Wardrobe',
    startingPrice: '৳185,000',
    modelCount: 'Pure Segun Teak',
    material: '100% Pure Chittagong Teak • Silver Scroll Inlays',
    image: arisTeakWardrobeImg,
    alt: 'Master artisan Chittagong teak wardrobe with silver inlays',
    href: '/shop?category=bedroom&subcategory=wardrobes',
  },
]

const TOTAL_ORIGINAL = FEATURED_FURNITURE_ITEMS.length

export const PopularFurnituresSection = () => {
  const scrollContainerRef = useRef(null)
  const isPausedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const displayItems = [
    ...FEATURED_FURNITURE_ITEMS,
    ...FEATURED_FURNITURE_ITEMS,
    ...FEATURED_FURNITURE_ITEMS,
  ]

  const pauseAutoScroll = useCallback(() => {
    isPausedRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }, [])

  const resumeAutoScroll = useCallback((delay = 500) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false
    }, delay)
  }, [])

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

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let animationFrameId
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

    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })

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
      className="bg-canvas section-y relative overflow-hidden select-none"
      aria-labelledby="featured-furniture-heading"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <Badge variant="brass">Master Atelier Showcase</Badge>
            <h2
              id="featured-furniture-heading"
              className="text-charcoal-deep text-display-sm font-serif font-bold"
            >
              Featured Bedroom Suites
            </h2>
            <p className="text-text-secondary max-w-2xl text-sm leading-relaxed text-pretty sm:text-base">
              Fully furnished showroom favorites and master bedroom commissions
              handcrafted from seasoned Burma teak, kiln-dried mahogany, and
              rich bouclé upholstery.
            </p>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
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
            <Link
              key={`${item.id}-${index}`}
              to={item.href}
              data-card
              className={cn(
                'group bg-surface relative flex shrink-0 flex-col overflow-hidden rounded-2xl sm:rounded-3xl',
                'w-65 sm:w-72.5 md:w-80 lg:w-85',
                'border-border-subtle/90 hover:border-brass/50 shadow-subtle hover:shadow-card-hover border transition-all duration-500',
                'focus-visible:ring-brass focus-visible:ring-2 focus-visible:outline-none'
              )}
              aria-label={`${item.name} — from ${item.startingPrice}, explore collection`}
            >
              <div className="bg-surface-muted relative aspect-4/3 w-full overflow-hidden sm:aspect-square">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                <div
                  className="from-charcoal-deep/40 pointer-events-none absolute inset-0 bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span className="border-brass/30 bg-charcoal-deep/85 text-brass-light text-label-xs absolute top-3.5 left-3.5 rounded-full border px-2.5 py-1 font-semibold tracking-wider uppercase backdrop-blur-md">
                  {item.room}
                </span>

                <span className="border-border-subtle/80 bg-surface/90 text-charcoal-deep text-label-xs absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium tracking-wide shadow-xs backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  Showroom Ready
                </span>
              </div>

              <div className="flex flex-col justify-between p-4.5 sm:p-5">
                <div>
                  <h3 className="text-charcoal-deep group-hover:text-brass-dark font-serif text-lg font-semibold tracking-tight transition-colors duration-200 sm:text-xl">
                    {item.name}
                  </h3>

                  <p className="text-text-muted mt-1 line-clamp-1 text-xs font-normal">
                    {item.material}
                  </p>
                </div>

                <div className="border-border-subtle/70 mt-4 flex items-center justify-between border-t pt-3">
                  <div>
                    <span className="text-text-muted text-label-xs block tracking-wider uppercase">
                      Starting From
                    </span>
                    <span className="text-charcoal-deep font-sans text-sm font-bold sm:text-base">
                      {item.startingPrice}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-text-muted text-label-xs block tracking-wider uppercase">
                      Finish Spec
                    </span>
                    <span className="text-brass-dark font-sans text-xs font-semibold sm:text-sm">
                      {item.modelCount}
                    </span>
                  </div>
                </div>

                <div className="text-charcoal-deep group-hover:text-brass mt-3.5 flex items-center justify-between text-xs font-semibold tracking-wider uppercase transition-colors duration-200">
                  <span>Explore Suite</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
