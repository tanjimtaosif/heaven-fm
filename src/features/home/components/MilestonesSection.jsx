import { useRef, useState, useCallback, useEffect } from 'react'
import { COMPANY_INFO } from '@/constants/companyData'
import { Badge } from '@/components/ui'
import { useIsMobile } from '@/hooks'

import studioFounded from '@/assets/milestones/studio-founded.jpg'
import showroomLaunch from '@/assets/milestones/agrabaad-showroom-launch.webp'
import furnitureFair from "@/assets/milestones/int'l-exibition.jpg"
import chamberOfCommerce from '@/assets/milestones/cember-of-commerce.jpg'
import bfioaRecognition from '@/assets/milestones/nationwide-bfioa-recognition.jpg'

const IMAGES = {
  'studio-founded': studioFounded,
  'showroom-launch': showroomLaunch,
  'furniture-fair': furnitureFair,
  'chamber-of-commerce': chamberOfCommerce,
  'bfioa-recognition': bfioaRecognition,
}

/* ─── Desktop: Awwwards-style cursor-following image reveal ─────────── */

function DesktopTimeline({ milestones }) {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const rafRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(-1)

  const lerp = (a, b, n) => a + (b - a) * n

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    function tick() {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.1)
      current.current.y = lerp(current.current.y, mouse.current.y, 0.1)

      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) rotate(${(mouse.current.x - current.current.x) * 0.04}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    mouse.current.x = e.clientX - rect.left - 180
    mouse.current.y = e.clientY - rect.top - 130
  }, [])

  const handleMouseEnter = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(-1)
  }, [])

  return (
    <div ref={sectionRef} className="relative" onMouseMove={handleMouseMove}>
      {/* Floating image that follows cursor */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute z-10 will-change-transform"
        style={{
          width: 360,
          height: 260,
          opacity: activeIndex >= 0 ? 1 : 0,
          transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {milestones.map((m, i) => (
          <div
            key={m.image}
            className="absolute inset-0 overflow-hidden rounded-xl"
            style={{
              clipPath:
                activeIndex === i
                  ? 'inset(0% 0% 0% 0% round 12px)'
                  : 'inset(50% 25% 50% 25% round 12px)',
              opacity: activeIndex === i ? 1 : 0,
              transition:
                'clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            }}
          >
            <img
              src={IMAGES[m.image]}
              alt={m.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Timeline rows */}
      <div className="relative">
        {milestones.map((milestone, index) => {
          const isActive = activeIndex === index
          const isDimmed = activeIndex >= 0 && !isActive

          return (
            <div
              key={milestone.year}
              className="group border-b border-white/[0.07] first:border-t"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="flex items-baseline gap-6 py-8 transition-opacity duration-300 lg:gap-12 lg:py-10"
                style={{ opacity: isDimmed ? 0.25 : 1 }}
              >
                {/* Year */}
                <span
                  className="font-serif text-5xl font-light tracking-tight transition-colors duration-300 lg:text-7xl"
                  style={{
                    color: isActive
                      ? 'var(--color-brass)'
                      : 'rgba(250, 248, 245, 0.5)',
                  }}
                >
                  {milestone.year}
                </span>

                {/* Text content */}
                <div className="flex-1 space-y-1.5">
                  <h3
                    className="font-serif text-xl font-semibold transition-colors duration-300 lg:text-2xl"
                    style={{
                      color: isActive
                        ? 'var(--color-canvas)'
                        : 'rgba(250, 248, 245, 0.75)',
                    }}
                  >
                    {milestone.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-white/40 lg:text-base">
                    {milestone.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <span
                  className="hidden text-xl transition-all duration-300 lg:block"
                  style={{
                    color: isActive
                      ? 'var(--color-brass)'
                      : 'rgba(250, 248, 245, 0.15)',
                    transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  ↗
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Mobile: Stacked editorial cards with inline images ────────────── */

function MobileTimeline({ milestones }) {
  return (
    <div className="space-y-6">
      {milestones.map((milestone, index) => (
        <article
          key={milestone.year}
          className="overflow-hidden rounded-2xl border border-white/8 bg-white/3"
        >
          {/* Image */}
          <div className="relative aspect-16/10 overflow-hidden">
            <img
              src={IMAGES[milestone.image]}
              alt={milestone.title}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Year overlay */}
            <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10">
              <span className="font-serif text-3xl font-light tracking-tight text-white/90">
                {milestone.year}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 p-5">
            <h3 className="font-serif text-lg font-semibold text-white/90">
              {milestone.title}
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              {milestone.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ─── Main Section ──────────────────────────────────────────────────── */

export const MilestonesSection = () => {
  const isMobile = useIsMobile()
  const { milestones } = COMPANY_INFO

  return (
    <section
      id="milestones"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-charcoal-deep)' }}
    >
      {/* Subtle texture overlay */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grain absolute inset-0 opacity-[0.03] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(196,159,102,0.08),transparent)]" />
      </div>

      <div className="container-page section-y relative">
        {/* Section header */}
        <div className="mb-12 space-y-4 lg:mb-16">
          <Badge variant="charcoal">Since 2020</Badge>
          <h2 className="font-serif text-3xl leading-tight font-bold text-white/95 sm:text-4xl lg:text-5xl">
            Six years of building
            <br />
            <span className="text-white/50">in Chattogram.</span>
          </h2>
        </div>

        {/* Conditional render based on device */}
        {isMobile ? (
          <MobileTimeline milestones={milestones} />
        ) : (
          <DesktopTimeline milestones={milestones} />
        )}
      </div>
    </section>
  )
}
