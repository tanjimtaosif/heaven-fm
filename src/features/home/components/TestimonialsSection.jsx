import { useState, useEffect, useRef, useCallback, useId } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, Button } from '@/components/ui'
import { TESTIMONIALS } from '@/constants/reviewsData'

const TOTAL = TESTIMONIALS.length
const TRANSITION_MS = 520
const AUTOPLAY_MS = 6500
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const ALL_CARDS = [
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set0-${t.id}-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set1-${t.id}-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set2-${t.id}-${i}` })),
]

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

const ReviewCard = ({ testimonial, textAnimStyle }) => {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col justify-between overflow-hidden rounded-3xl',
        'border-border-warm bg-surface bg-paper-grain border',
        'p-6 sm:p-8 lg:p-9 xl:p-10',
        'shadow-[0_22px_50px_-26px_rgba(15,30,33,0.18),0_2px_10px_-6px_rgba(15,30,33,0.05)]',
        'hover:border-brass/40 transition-colors duration-300'
      )}
    >
      <span
        className="from-brass via-brass/70 absolute top-0 left-8 h-[2.5px] w-16 rounded-full bg-linear-to-r to-transparent sm:left-10"
        aria-hidden="true"
      />

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center" aria-hidden="true">
            <svg
              width="34"
              height="24"
              viewBox="0 0 38 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-brass/35 shrink-0"
            >
              <path
                d="M0 28V17.0667C0 13.9556 0.644444 11.0667 1.93333 8.4C3.28889 5.66667 5.15556 3.42222 7.53333 1.66667C9.97778 -0.0888889 12.7778 -0.444444 15.9333 0.666667L14.4667 4.26667C12.8444 3.73333 11.2 3.82222 9.53333 4.53333C7.86667 5.24444 6.46667 6.37778 5.33333 7.93333C4.26667 9.42222 3.73333 11.1556 3.73333 13.1333V14.6667H14V28H0ZM22.6667 28V17.0667C22.6667 13.9556 23.3111 11.0667 24.6 8.4C25.9556 5.66667 27.8222 3.42222 30.2 1.66667C32.6444 -0.0888889 35.4444 -0.444444 38.6 0.666667L37.1333 4.26667C35.5111 3.73333 33.8667 3.82222 32.2 4.53333C30.5333 5.24444 29.1333 6.37778 28 7.93333C26.9333 9.42222 26.4 11.1556 26.4 13.1333V14.6667H36.6667V28H22.6667Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <span className="border-brass/30 bg-brass-light/80 text-wood-walnut inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-semibold tracking-wider uppercase">
            <Sparkles className="text-brass h-3 w-3" />
            {testimonial.reviewer.category}
          </span>
        </div>

        <div className="mt-5 overflow-hidden sm:mt-6">
          <div
            style={textAnimStyle}
            aria-live="polite"
            className="flex min-h-28.75 items-center sm:min-h-32.5 lg:min-h-35"
          >
            <blockquote>
              <p className="text-text-primary font-serif text-[17px] leading-[1.68] font-normal tracking-tight text-pretty sm:text-[18.5px] lg:text-[19.5px]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>

      <div
        className="border-border-subtle mt-6 border-t pt-5 sm:mt-7 sm:pt-6"
        style={textAnimStyle}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-brass-light ring-brass/45 ring-offset-surface relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-offset-2">
              <span className="text-wood-walnut font-serif text-sm font-semibold">
                {testimonial.reviewer.initials}
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="text-charcoal-deep font-serif text-[15px] leading-snug font-semibold">
                {testimonial.reviewer.name}
              </h3>
              <p className="text-text-muted mt-0.5 text-xs">
                {testimonial.reviewer.location}
              </p>
              <p className="text-brass mt-1 line-clamp-1 text-[11px] font-medium">
                {testimonial.reviewer.project}
              </p>
            </div>
          </div>

          <div className="border-brass-border bg-brass-light text-wood-walnut hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-widest uppercase sm:inline-flex">
            <CheckCircle2 className="text-brass h-3 w-3" />
            Verified
          </div>
        </div>
      </div>
    </div>
  )
}

const ImageGallery = ({ currentIndex, isTransitioning, onSelectCard }) => {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-3xl',
        '[--active-w:76%] [--gap:10px] [--inactive-w:20%]',
        'sm:[--active-w:64%] sm:[--gap:12px] sm:[--inactive-w:16%]',
        'lg:[--active-w:58%] lg:[--gap:12px] lg:[--inactive-w:14%]'
      )}
    >
      <div
        className="flex h-full items-stretch"
        style={{
          gap: 'var(--gap)',
          transform: `translateX(calc(-${currentIndex} * (var(--inactive-w) - var(--gap) * 0.5 + var(--gap))))`,
          transition: isTransitioning
            ? `transform ${TRANSITION_MS}ms ${EASE}`
            : 'none',
        }}
      >
        {ALL_CARDS.map((card, idx) => {
          const isActive = idx === currentIndex
          const isClickable = !isActive

          return (
            <div
              key={card.trackKey}
              onClick={isClickable ? () => onSelectCard(idx) : undefined}
              role={isClickable ? 'button' : undefined}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={
                isClickable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onSelectCard(idx)
                      }
                    }
                  : undefined
              }
              aria-label={
                isClickable
                  ? `View review: ${card.reviewer.name} — ${card.image.title}`
                  : undefined
              }
              className={cn(
                'group relative shrink-0 overflow-hidden rounded-2xl ring-1 transition-all',
                isActive
                  ? 'ring-brass/40 cursor-default'
                  : 'hover:ring-brass/30 cursor-pointer ring-transparent hover:opacity-95',
                'focus-visible:ring-brass focus-visible:ring-2 focus-visible:outline-none'
              )}
              style={{
                width: isActive
                  ? 'calc(var(--active-w) - var(--gap) * 0.5)'
                  : 'calc(var(--inactive-w) - var(--gap) * 0.5)',
                opacity: isActive ? 1 : 0.85,
                transition: isTransitioning
                  ? `width ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS * 0.85}ms ${EASE}`
                  : 'none',
              }}
            >
              <img
                src={card.image.src}
                alt={card.image.alt}
                className={cn(
                  'h-full w-full object-cover transition-transform duration-700 ease-out',
                  isActive
                    ? 'group-hover:scale-[1.02]'
                    : 'group-hover:scale-105'
                )}
              />

              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-300',
                  isActive
                    ? 'from-charcoal-deep/85 via-charcoal-deep/25 bg-linear-to-t to-transparent opacity-100'
                    : 'bg-charcoal-deep/35 group-hover:bg-charcoal-deep/15'
                )}
              />

              {isActive && (
                <div className="absolute right-5 bottom-5 left-5 sm:right-6 sm:bottom-6 sm:left-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-brass text-charcoal-deep inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase shadow-xs">
                      <Sparkles className="h-2.5 w-2.5" />
                      Active Project
                    </span>
                    <span className="text-canvas/80 line-clamp-1 text-[11px] font-medium tracking-wide">
                      {card.reviewer.location}
                    </span>
                  </div>
                  <h4 className="text-canvas mt-2 font-serif text-lg font-medium tracking-tight sm:text-xl lg:text-[1.3rem]">
                    {card.image.title}
                  </h4>
                </div>
              )}

              {!isActive && (
                <div className="absolute inset-x-0 bottom-3 flex flex-col items-center justify-end px-1 sm:bottom-4">
                  <span className="bg-charcoal-deep/80 text-canvas rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-widest uppercase backdrop-blur-xs">
                    Next
                  </span>
                  <span className="text-canvas/90 mt-1 line-clamp-1 hidden text-center text-[10px] font-medium sm:block">
                    {card.reviewer.initials}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const TestimonialsSection = () => {
  const [trackIndex, setTrackIndex] = useState(TOTAL)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [textAnimStyle, setTextAnimStyle] = useState({
    opacity: 1,
    transform: 'translateX(0)',
    filter: 'blur(0px)',
  })
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const sectionRef = useRef(null)
  const isLockedRef = useRef(false)
  const labelId = useId()

  const prefersReducedMotion = useReducedMotion()

  const activeReviewIndex = trackIndex % TOTAL
  const currentTestimonial = TESTIMONIALS[activeReviewIndex]

  const checkBoundaryWrap = useCallback((idx) => {
    if (idx >= TOTAL * 2) {
      setIsTransitioning(false)
      const wrapped = idx - TOTAL
      setTrackIndex(wrapped)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          isLockedRef.current = false
        })
      })
    } else if (idx < TOTAL) {
      setIsTransitioning(false)
      const wrapped = idx + TOTAL
      setTrackIndex(wrapped)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          isLockedRef.current = false
        })
      })
    } else {
      isLockedRef.current = false
    }
  }, [])

  const stepForward = useCallback(
    (stepCount = 1) => {
      if (isLockedRef.current) return
      isLockedRef.current = true

      const nextTrack = trackIndex + stepCount

      if (prefersReducedMotion) {
        setTrackIndex(nextTrack)
        checkBoundaryWrap(nextTrack)
        return
      }

      setIsTransitioning(true)

      setTextAnimStyle({
        opacity: 0,
        transform: 'translateX(-22px)',
        filter: 'blur(2px)',
        transition:
          'opacity 190ms ease-in, transform 190ms ease-in, filter 190ms ease-in',
      })

      setTrackIndex(nextTrack)

      setTimeout(() => {
        setTextAnimStyle({
          opacity: 0,
          transform: 'translateX(22px)',
          filter: 'blur(2px)',
          transition: 'none',
        })

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTextAnimStyle({
              opacity: 1,
              transform: 'translateX(0)',
              filter: 'blur(0px)',
              transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}, filter 300ms ${EASE}`,
            })
          })
        })
      }, 200)

      setTimeout(() => {
        checkBoundaryWrap(nextTrack)
      }, TRANSITION_MS + 20)
    },
    [checkBoundaryWrap, prefersReducedMotion, trackIndex]
  )

  const stepBackward = useCallback(() => {
    if (isLockedRef.current) return
    isLockedRef.current = true

    const prevTrack = trackIndex - 1

    if (prefersReducedMotion) {
      setTrackIndex(prevTrack)
      checkBoundaryWrap(prevTrack)
      return
    }

    setIsTransitioning(true)

    setTextAnimStyle({
      opacity: 0,
      transform: 'translateX(22px)',
      filter: 'blur(2px)',
      transition:
        'opacity 190ms ease-in, transform 190ms ease-in, filter 190ms ease-in',
    })

    setTrackIndex(prevTrack)

    setTimeout(() => {
      setTextAnimStyle({
        opacity: 0,
        transform: 'translateX(-22px)',
        filter: 'blur(2px)',
        transition: 'none',
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTextAnimStyle({
            opacity: 1,
            transform: 'translateX(0)',
            filter: 'blur(0px)',
            transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}, filter 300ms ${EASE}`,
          })
        })
      })
    }, 200)

    setTimeout(() => {
      checkBoundaryWrap(prevTrack)
    }, TRANSITION_MS + 20)
  }, [checkBoundaryWrap, prefersReducedMotion, trackIndex])

  const handleSelectCard = useCallback(
    (targetTrackIdx) => {
      if (isLockedRef.current || targetTrackIdx === trackIndex) return
      const diff = targetTrackIdx - trackIndex
      if (diff > 0) {
        stepForward(diff)
      } else {
        stepBackward()
      }
    },
    [stepBackward, stepForward, trackIndex]
  )

  const handleDotClick = useCallback(
    (targetDotIdx) => {
      if (isLockedRef.current) return
      const currentMod = trackIndex % TOTAL
      if (targetDotIdx === currentMod) return
      const forwardDiff = (targetDotIdx - currentMod + TOTAL) % TOTAL
      stepForward(forwardDiff)
    },
    [stepForward, trackIndex]
  )

  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isInView) return
    const timer = setInterval(() => {
      stepForward(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, isPaused, isInView, stepForward])

  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        stepForward(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        stepBackward()
      }
    }
    el.addEventListener('keydown', onKey)
    return () => el.removeEventListener('keydown', onKey)
  }, [stepForward, stepBackward])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-canvas relative py-20 sm:py-24 lg:py-28"
      aria-labelledby={labelId}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#faf8f5_0%,#f4ede4_40%,#ebe3d7_100%)]" />
        <div className="bg-atelier-rules absolute inset-0 mask-[linear-gradient(180deg,transparent_0%,#000_11%,#000_84%,transparent_100%)] opacity-40" />
        <div className="animate-aurora absolute top-[6%] right-[-8%] h-160 w-160 rounded-full bg-[radial-gradient(circle,rgba(196,159,102,0.15)_0%,rgba(196,159,102,0.05)_45%,transparent_70%)]" />
        <div className="absolute bottom-[4%] left-[-6%] h-128 w-lg rounded-full bg-[radial-gradient(circle,rgba(23,44,48,0.06)_0%,rgba(23,44,48,0.02)_45%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,26,23,0.04)_0%,transparent_13%,transparent_87%,rgba(31,26,23,0.04)_100%)] mask-[linear-gradient(180deg,transparent_0%,#000_5%,#000_94%,transparent_100%)]" />
        <div className="bg-grain absolute inset-0 mask-[linear-gradient(180deg,transparent_0%,#000_5%,#000_94%,transparent_100%)] opacity-[0.05] mix-blend-multiply" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
        <Badge variant="brass">Client Stories & Portfolios</Badge>
        <h2
          id={labelId}
          className="text-charcoal-deep font-serif text-3xl font-bold sm:text-4xl lg:text-[2.65rem]"
        >
          Crafted With Purpose,{' '}
          <span className="text-brass italic">Loved in Every Home</span>
        </h2>
        <p className="text-text-secondary mx-auto max-w-2xl text-sm leading-relaxed text-pretty sm:text-base">
          Each testimonial is directly connected to a real finished commission
          in Chattogram. Explore client experiences alongside the bespoke pieces
          crafted for their living spaces.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="h-107.5 sm:h-117.5 lg:col-span-5 lg:h-127.5">
            <ReviewCard
              testimonial={currentTestimonial}
              textAnimStyle={textAnimStyle}
            />
          </div>

          <div className="h-107.5 sm:h-117.5 lg:col-span-7 lg:h-127.5">
            <ImageGallery
              currentIndex={trackIndex}
              isTransitioning={isTransitioning}
              onSelectCard={handleSelectCard}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 sm:mt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={stepBackward}
            aria-label="Previous client review"
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div
            className="flex items-center gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {TESTIMONIALS.map((t, idx) => {
              const isActive = idx === activeReviewIndex
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to review ${idx + 1} of ${TOTAL}: ${t.reviewer.name}`}
                  onClick={() => handleDotClick(idx)}
                  className={cn(
                    'cursor-pointer rounded-full transition-all duration-300 ease-out',
                    'focus-visible:ring-brass focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
                    isActive
                      ? 'bg-brass h-1.5 w-6 sm:w-7'
                      : 'bg-border-warm hover:bg-brass/50 h-1.5 w-1.5'
                  )}
                />
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => stepForward(1)}
            aria-label="Next client review"
            className="rounded-full"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 -right-6 hidden min-[1400px]:block"
          aria-hidden="true"
        >
          <div className="sticky top-[24vh] flex h-[52vh] flex-col items-center gap-6">
            <span className="text-text-muted text-[10px] tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              Client Reviews
            </span>
            <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-0.5 overflow-hidden"
        aria-hidden="true"
      >
        <div
          key={trackIndex}
          className="from-brass/50 to-brass/20 h-full w-full origin-left bg-linear-to-r"
          style={{
            animation:
              prefersReducedMotion || !isInView
                ? 'none'
                : `testimonial-progress ${AUTOPLAY_MS}ms linear forwards`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        />
      </div>
    </section>
  )
}
