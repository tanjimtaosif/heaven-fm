import { useRef, useEffect, useCallback } from 'react'
import { useLenis } from '@/components/providers'
import { COMPANY_INFO } from '@/constants/companyData'
import { Badge, Button } from '@/components/ui'
import { useQuotation } from '@/features/quotation'

import why1 from '@/assets/whychooseus/why-1.webp'
import why2 from '@/assets/whychooseus/why-2.webp'
import why3 from '@/assets/whychooseus/why-3.webp'
import why4 from '@/assets/whychooseus/why-4.webp'

const IMAGES = {
  'why-1': why1,
  'why-2': why2,
  'why-3': why3,
  'why-4': why4,
}

const RECEDE_SCALE = 0.055
const RECEDE_DIM = 0.14

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export const WhyChooseUsSection = () => {
  const { openQuotation } = useQuotation()
  const wrapperRefs = useRef([])
  const cardRefs = useRef([])
  const rafId = useRef(null)

  const updateStack = useCallback(() => {
    if (typeof window === 'undefined') return

    // On mobile screens (< 640px), cards stack smoothly via native GPU-accelerated CSS sticky.
    // Bypassing JS scale/recede calculations eliminates layout thrashing, main-thread touch-lag,
    // and text re-rasterization during scrolling.
    if (window.innerWidth < 640) {
      const cards = cardRefs.current
      for (let i = 0; i < cards.length; i++) {
        if (cards[i] && cards[i].style.transform) {
          cards[i].style.transform = ''
          cards[i].style.removeProperty('--recede')
        }
      }
      return
    }

    if (rafId.current) return
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null
      const wrappers = wrapperRefs.current
      const cards = cardRefs.current
      const viewportHeight = window.innerHeight

      // Phase 1: Batch all layout reads to prevent forced reflow / layout thrashing
      const cardTops = new Array(cards.length)
      const nextTops = new Array(cards.length)

      for (let i = 0; i < cards.length; i++) {
        if (cards[i]) {
          cardTops[i] = cards[i].getBoundingClientRect().top
        }
        if (wrappers[i + 1]) {
          nextTops[i] = wrappers[i + 1].getBoundingClientRect().top
        }
      }

      // Phase 2: Batch all style mutations
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        if (!card) continue

        let progress = 0
        if (wrappers[i + 1]) {
          const travel = viewportHeight - cardTops[i]
          if (travel > 0) {
            progress = clamp((viewportHeight - nextTops[i]) / travel, 0, 1)
          }
        }

        const eased = progress * progress * (3 - 2 * progress)
        card.style.transform = `scale(${(1 - RECEDE_SCALE * eased).toFixed(4)})`
        card.style.setProperty('--recede', (RECEDE_DIM * eased).toFixed(3))
      }
    })
  }, [])

  useLenis(updateStack)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    updateStack()
    window.addEventListener('resize', updateStack, { passive: true })
    window.addEventListener('scroll', updateStack, { passive: true })

    return () => {
      window.removeEventListener('resize', updateStack)
      window.removeEventListener('scroll', updateStack)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [updateStack])

  return (
    <section id="why-choose-us" className="bg-canvas section-y relative">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#faf8f5_0%,#f4ede4_40%,#ebe3d7_100%)]" />

        <div className="bg-atelier-rules absolute inset-0 mask-[linear-gradient(180deg,transparent_0%,#000_11%,#000_84%,transparent_100%)] opacity-50" />

        <div className="sm:animate-aurora absolute top-[8%] right-[-6%] h-152 w-152 rounded-full bg-[radial-gradient(circle,rgba(196,159,102,0.17)_0%,rgba(196,159,102,0.06)_45%,transparent_70%)]" />

        <div className="absolute bottom-[4%] left-[-8%] h-136 w-136 rounded-full bg-[radial-gradient(circle,rgba(23,44,48,0.07)_0%,rgba(23,44,48,0.02)_45%,transparent_70%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,26,23,0.05)_0%,transparent_13%,transparent_87%,rgba(31,26,23,0.05)_100%)] mask-[linear-gradient(180deg,transparent_0%,#000_5%,#000_94%,transparent_100%)]" />
        <div className="bg-grain absolute inset-0 hidden mask-[linear-gradient(180deg,transparent_0%,#000_5%,#000_94%,transparent_100%)] opacity-[0.05] mix-blend-multiply sm:block" />
      </div>

      <div className="container-page relative space-y-4 text-center">
        <Badge variant="brass">The Heaven Difference</Badge>
        <h2 className="text-charcoal-deep font-serif text-3xl font-bold sm:text-4xl">
          Why Choose Us
        </h2>
        <p className="text-text-secondary mx-auto max-w-xl text-sm text-pretty sm:text-base">
          Four reasons Chattogram homeowners trust us with the pieces they live
          with every day.
        </p>
      </div>

      <div className="container-page relative mt-12 pb-[6vh] sm:mt-14">
        <div
          className="3xl:block pointer-events-none absolute inset-y-0 -left-6 hidden"
          aria-hidden="true"
        >
          <div className="sticky top-[24vh] flex h-[52vh] flex-col items-center gap-6">
            <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
            <span className="text-text-muted text-label-xs rotate-180 tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              01 — {String(COMPANY_INFO.whyChooseUs.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div
          className="3xl:block pointer-events-none absolute inset-y-0 -right-6 hidden"
          aria-hidden="true"
        >
          <div className="sticky top-[24vh] flex h-[52vh] flex-col items-center gap-6">
            <span className="text-text-muted text-label-xs tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              {COMPANY_INFO.tagline}
            </span>
            <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
          </div>
        </div>

        {COMPANY_INFO.whyChooseUs.map((item, index) => {
          const isLast = index === COMPANY_INFO.whyChooseUs.length - 1

          return (
            <div
              key={item.id}
              ref={(el) => {
                wrapperRefs.current[index] = el
              }}
              className={
                'sticky top-[calc(5.5rem+var(--stack-index)*0.75rem)] sm:top-[calc(7rem+var(--stack-index)*0.9rem)] ' +
                (isLast ? '' : 'mb-5 sm:mb-6')
              }
              style={{ '--stack-index': index, zIndex: index + 1 }}
            >
              <article
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="border-border-warm bg-surface sm:bg-paper-grain hover:border-brass/45 relative origin-top overflow-hidden rounded-3xl border p-6 shadow-[0_12px_28px_-12px_rgba(15,30,33,0.16)] transition-colors duration-300 sm:p-8 sm:shadow-[0_22px_50px_-26px_rgba(15,30,33,0.22),0_2px_10px_-6px_rgba(15,30,33,0.06)] sm:will-change-transform lg:p-10"
              >
                <div className="grid gap-6 sm:min-h-80 sm:grid-cols-[1.15fr_1fr] sm:gap-10 lg:min-h-100 lg:gap-14">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                      <span className="text-brass font-mono text-xs tracking-[0.2em]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="bg-brass/45 h-px w-6"
                        aria-hidden="true"
                      />
                      <span className="text-text-muted text-label-xs tracking-[0.24em] uppercase">
                        {item.eyebrow}
                      </span>
                    </div>

                    <h3 className="text-charcoal-deep text-display-sm mt-5 font-serif font-semibold text-balance">
                      {item.title}
                    </h3>

                    <ul className="mt-6 space-y-3">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="text-text-secondary flex items-start gap-3 text-sm leading-relaxed lg:text-base"
                        >
                          <span
                            className="bg-brass/70 mt-[0.5em] h-1 w-1 shrink-0 rotate-45"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        onClick={() => openQuotation()}
                        size="md"
                        variant="primary"
                        className="rounded-full"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>

                  <div className="relative aspect-16/10 overflow-hidden rounded-2xl sm:aspect-auto">
                    <img
                      src={IMAGES[item.image]}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div
                  className="bg-text-primary pointer-events-none absolute inset-0 opacity-(--recede,0)"
                  aria-hidden="true"
                />
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
