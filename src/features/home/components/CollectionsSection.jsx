import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY_INFO } from '@/constants/companyData'
import { Badge } from '@/components/ui'
import { usePrefersReducedMotion } from '@/hooks'
import { cn } from '@/lib/utils'
import { ArrowRight, Sparkles } from 'lucide-react'

import sofaCat from '@/assets/category/sofa-cat.webp'
import bedCat from '@/assets/category/bed-cat.webp'
import diningCat from '@/assets/category/dining-cat.webp'
import officeCat from '@/assets/category/office-cat.webp'
import custom1 from '@/assets/category/custom-1.mp4'
import custom2 from '@/assets/category/custom-2.mp4'

const STILLS = {
  'sofa-cat': sofaCat,
  'bed-cat': bedCat,
  'dining-cat': diningCat,
  'office-cat': officeCat,
}

const BESPOKE_CLIPS = [custom1, custom2]

const PLACEMENT = {
  'living-room':
    'sm:col-span-2 sm:row-start-1 sm:h-[400px] lg:col-start-1 lg:col-span-8 lg:row-start-1 lg:h-[480px]',
  'bespoke-commissions':
    'sm:col-start-2 sm:row-start-2 sm:h-[370px] lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:h-[480px]',
  bedroom:
    'sm:col-start-1 sm:row-start-2 sm:h-[370px] lg:col-start-1 lg:col-span-4 lg:row-start-2 lg:h-[410px]',
  dining:
    'sm:col-start-1 sm:row-start-3 sm:h-[370px] lg:col-start-5 lg:col-span-4 lg:row-start-2 lg:h-[410px]',
  'office-study':
    'sm:col-start-2 sm:row-start-3 sm:h-[370px] lg:col-start-9 lg:col-span-4 lg:row-start-2 lg:h-[410px]',
}

const BespokeVideo = ({ hostRef }) => {
  const videoRefs = useRef([])
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [hostRef])

  useEffect(() => {
    if (!inView || reducedMotion) return
    const video = videoRefs.current[active]
    if (!video) return

    video.currentTime = 0
    video.play()?.catch(() => {})

    return () => video.pause()
  }, [inView, active, reducedMotion])

  return (
    <>
      {BESPOKE_CLIPS.map((clip, index) => (
        <video
          key={clip}
          ref={(el) => {
            videoRefs.current[index] = el
          }}
          src={clip}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onEnded={() => setActive((current) => (current + 1) % 2)}
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ease-out',
            index === active ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}
    </>
  )
}

const CategoryCard = ({ category }) => {
  const hostRef = useRef(null)
  const isVideo = category.media === 'video'
  const isHero = category.id === 'living-room'
  const detail =
    category.note || (category.items ? category.items.join('  ·  ') : '')

  const isInternal = category.id !== 'bespoke-commissions'
  const CardComponent = isInternal ? Link : 'a'
  const linkProps = isInternal
    ? { to: `/shop?category=${category.id}` }
    : { href: '#contact' }

  return (
    <CardComponent
      ref={hostRef}
      id={`category-${category.id}`}
      {...linkProps}
      aria-label={`${category.title} — explore category and bespoke commissions`}
      className={cn(
        'group bg-charcoal-deep relative isolate flex flex-col justify-end overflow-hidden rounded-2xl',
        'h-97.5 transition-colors duration-300',
        'border-border-subtle hover:border-brass/40 shadow-editorial border',
        'focus-visible:ring-brass focus-visible:ring-offset-canvas focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        PLACEMENT[category.id]
      )}
    >
      {isVideo ? (
        <BespokeVideo hostRef={hostRef} />
      ) : (
        <img
          src={STILLS[category.media]}
          alt={category.imageTag}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}

      <div
        className="from-charcoal-deep/95 via-charcoal-deep/45 group-hover:from-charcoal-deep/98 pointer-events-none absolute inset-0 bg-linear-to-t to-transparent transition-opacity duration-300"
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative flex flex-col justify-end p-6 sm:p-7',
          isHero && 'lg:p-9'
        )}
      >
        <div className="flex items-center gap-2">
          {category.highlight ? (
            <span className="border-brass/40 bg-brass/20 text-brass-light text-label-xs inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold tracking-[0.2em] uppercase backdrop-blur-xs">
              <Sparkles className="text-brass h-2.5 w-2.5" />
              Atelier Signature
            </span>
          ) : (
            <span className="text-brass text-label-sm font-semibold tracking-[0.24em] uppercase">
              {category.title}
            </span>
          )}
        </div>

        <h3
          className={cn(
            'text-canvas mt-2 font-serif leading-[1.2] font-medium tracking-tight text-balance',
            isHero
              ? 'text-2xl sm:text-3xl lg:text-4xl'
              : 'text-xl sm:text-2xl lg:text-3xl'
          )}
        >
          {category.subtitle}
        </h3>

        <p className="text-canvas/80 mt-2 text-xs leading-relaxed font-light tracking-wide text-pretty sm:text-sm">
          {detail}
        </p>

        <div className="mt-4 flex items-center pt-1">
          <span className="text-canvas/95 group-hover:text-brass sm:text-label-md inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors duration-300">
            <span>{category.ctaLabel || `Explore ${category.title}`}</span>
            <ArrowRight className="text-brass h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>

      <div
        className="group-hover:border-brass/40 pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300"
        aria-hidden="true"
      />
    </CardComponent>
  )
}

export const CollectionsSection = () => {
  return (
    <section id="collections" className="bg-canvas section-y">
      <div className="container-page space-y-4 text-center">
        <Badge variant="brass">Curated Spaces</Badge>
        <h2 className="text-charcoal-deep text-display-sm font-serif font-bold">
          Architectural Portfolios
        </h2>
        <p className="text-text-secondary mx-auto max-w-2xl text-sm leading-relaxed text-pretty sm:text-base">
          From sculptural living room centerpieces to tailored study suites,
          every category is designed, crafted, and customized to your exact
          architectural space and lifestyle.
        </p>
      </div>

      <div
        className={cn(
          'container-page mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:mt-16',
          'sm:grid-cols-2 sm:gap-4',
          'lg:grid-cols-12 lg:gap-4'
        )}
      >
        {COMPANY_INFO.categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
