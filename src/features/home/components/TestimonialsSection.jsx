import { useState, useEffect, useRef, useCallback, useId } from 'react'
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge, Button } from '@/components/ui'
import { TESTIMONIALS } from '@/constants/reviewsData'
import { usePrefersReducedMotion } from '@/hooks'

const TOTAL = TESTIMONIALS.length
const TRANSITION_MS = 360
const AUTOPLAY_MS = 6000
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

const ALL_CARDS = [
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set0-${t.id}-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set1-${t.id}-${i}` })),
  ...TESTIMONIALS.map((t, i) => ({ ...t, trackKey: `set2-${t.id}-${i}` })),
]

/* ─── Desktop Review Card (5-column layout) ─────────────────────────── */
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

          <span className="border-brass/30 bg-brass-light/80 text-wood-walnut text-label-xs inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-semibold tracking-wider uppercase">
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
              <p className="text-text-primary font-serif text-lg leading-[1.68] font-normal tracking-tight text-pretty sm:text-lg lg:text-xl">
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
              <h3 className="text-charcoal-deep font-serif text-base leading-snug font-semibold">
                {testimonial.reviewer.name}
              </h3>
              <p className="text-text-muted mt-0.5 text-xs">
                {testimonial.reviewer.location}
              </p>
              <p className="text-brass text-label-sm mt-1 line-clamp-1 font-medium">
                {testimonial.reviewer.project}
              </p>
            </div>
          </div>

          <div className="border-brass-border bg-brass-light text-wood-walnut text-label-xs hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold tracking-widest uppercase sm:inline-flex">
            <CheckCircle2 className="text-brass h-3 w-3" />
            Verified
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Desktop Image Gallery (7-column layout) ───────────────────────── */
const ImageGallery = ({ currentIndex, isTransitioning, onSelectCard }) => {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-3xl',
        'lg:[--active-w:58%] lg:[--gap:12px] lg:[--inactive-w:14%]',
        'xl:[--active-w:60%] xl:[--gap:14px] xl:[--inactive-w:13%]'
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
                    <span className="bg-brass text-charcoal-deep text-label-xs inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold tracking-wider uppercase shadow-xs">
                      <Sparkles className="h-2.5 w-2.5" />
                      Active Project
                    </span>
                    <span className="text-canvas/80 text-label-sm line-clamp-1 font-medium tracking-wide">
                      {card.reviewer.location}
                    </span>
                  </div>
                  <h4 className="text-canvas mt-2 font-serif text-lg font-medium tracking-tight sm:text-xl">
                    {card.image.title}
                  </h4>
                </div>
              )}

              {!isActive && (
                <div className="absolute inset-x-0 bottom-3 flex flex-col items-center justify-end px-1 sm:bottom-4">
                  <span className="bg-charcoal-deep/80 text-canvas text-label-xs rounded-full px-2 py-0.5 font-semibold tracking-widest uppercase backdrop-blur-xs">
                    Next
                  </span>
                  <span className="text-canvas/90 text-label-xs mt-1 line-clamp-1 hidden text-center font-medium sm:block">
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

/* ─── Mobile Unified Showcase Card (< lg view) ───────────────────────── */
const MobileTestimonialCard = ({
  testimonial,
  textAnimStyle,
  imageAnimStyle,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  currentIndex,
  total,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'border-border-warm bg-surface bg-paper-grain border',
        'shadow-[0_20px_45px_-20px_rgba(15,30,33,0.18),0_2px_10px_-6px_rgba(15,30,33,0.05)]'
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Project Image Header */}
      <div className="bg-charcoal-deep relative aspect-16/10 w-full overflow-hidden sm:aspect-video">
        <img
          src={testimonial.image.src}
          alt={testimonial.image.alt}
          className="h-full w-full object-cover"
          style={imageAnimStyle}
        />
        <div className="from-charcoal-deep/90 via-charcoal-deep/35 absolute inset-0 bg-linear-to-t to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between">
          <span className="bg-charcoal-deep/75 text-canvas text-label-xs inline-flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 font-semibold backdrop-blur-md">
            <Sparkles className="text-brass h-3 w-3" />
            {testimonial.reviewer.category}
          </span>
          <span className="text-canvas/90 bg-charcoal-deep/65 text-label-xs rounded-full border border-white/15 px-2.5 py-0.5 font-mono font-medium tracking-widest backdrop-blur-xs">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Image Caption: Project Title & Location */}
        <div
          className="text-canvas absolute right-4 bottom-3.5 left-4"
          style={textAnimStyle}
        >
          <div className="flex items-center gap-2">
            <span className="bg-brass text-charcoal-deep text-label-xs inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold tracking-wider uppercase">
              Commission
            </span>
            <span className="text-canvas/80 text-label-xs line-clamp-1 font-medium tracking-wide">
              {testimonial.reviewer.location}
            </span>
          </div>
          <h4 className="text-canvas mt-1 line-clamp-1 font-serif text-base leading-snug font-medium tracking-tight sm:text-lg">
            {testimonial.image.title}
          </h4>
        </div>
      </div>

      {/* Review Content */}
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <svg
            width="28"
            height="20"
            viewBox="0 0 38 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brass/40 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M0 28V17.0667C0 13.9556 0.644444 11.0667 1.93333 8.4C3.28889 5.66667 5.15556 3.42222 7.53333 1.66667C9.97778 -0.0888889 12.7778 -0.444444 15.9333 0.666667L14.4667 4.26667C12.8444 3.73333 11.2 3.82222 9.53333 4.53333C7.86667 5.24444 6.46667 6.37778 5.33333 7.93333C4.26667 9.42222 3.73333 11.1556 3.73333 13.1333V14.6667H14V28H0ZM22.6667 28V17.0667C22.6667 13.9556 23.3111 11.0667 24.6 8.4C25.9556 5.66667 27.8222 3.42222 30.2 1.66667C32.6444 -0.0888889 35.4444 -0.444444 38.6 0.666667L37.1333 4.26667C35.5111 3.73333 33.8667 3.82222 32.2 4.53333C30.5333 5.24444 29.1333 6.37778 28 7.93333C26.9333 9.42222 26.4 11.1556 26.4 13.1333V14.6667H36.6667V28H22.6667Z"
              fill="currentColor"
            />
          </svg>
          <div className="border-brass-border bg-brass-light text-wood-walnut text-label-xs inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold tracking-widest uppercase">
            <CheckCircle2 className="text-brass h-3 w-3" />
            Verified Client
          </div>
        </div>

        <div className="mt-3.5 overflow-hidden">
          <div
            style={textAnimStyle}
            aria-live="polite"
            className="flex min-h-[96px] items-center sm:min-h-27.5"
          >
            <blockquote>
              <p className="text-text-primary font-serif text-base leading-[1.62] font-normal tracking-tight text-pretty sm:text-lg">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <div
          className="border-border-subtle mt-4 border-t pt-4 sm:mt-5 sm:pt-5"
          style={textAnimStyle}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-brass-light ring-brass/45 ring-offset-surface relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-offset-2">
                <span className="text-wood-walnut font-serif text-xs font-semibold">
                  {testimonial.reviewer.initials}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-charcoal-deep truncate font-serif text-sm leading-snug font-semibold sm:text-base">
                  {testimonial.reviewer.name}
                </h3>
                <p className="text-brass text-label-sm line-clamp-1 font-medium">
                  {testimonial.reviewer.project}
                </p>
              </div>
            </div>

            <span className="text-text-muted text-label-xs font-medium tracking-wider uppercase">
              Swipe &larr;&rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main TestimonialsSection Component ────────────────────────────── */
export const TestimonialsSection = () => {
  const [trackIndex, setTrackIndex] = useState(TOTAL)
  const [displayedReviewIndex, setDisplayedReviewIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [textAnimStyle, setTextAnimStyle] = useState({
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  })
  const [imageAnimStyle, setImageAnimStyle] = useState({
    opacity: 1,
    transform: 'scale(1)',
  })
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const sectionRef = useRef(null)
  const isLockedRef = useRef(false)
  const resumeTimerRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const touchDeltaRef = useRef({ x: 0, y: 0 })
  const labelId = useId()

  const prefersReducedMotion = usePrefersReducedMotion()
  const currentTestimonial = TESTIMONIALS[displayedReviewIndex]

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

  /* Snappy, seamless forward transition */
  const stepForward = useCallback(
    (stepCount = 1) => {
      if (isLockedRef.current) return
      isLockedRef.current = true

      const nextTrack = trackIndex + stepCount
      const nextReviewIndex = ((nextTrack % TOTAL) + TOTAL) % TOTAL

      if (prefersReducedMotion) {
        setTrackIndex(nextTrack)
        setDisplayedReviewIndex(nextReviewIndex)
        checkBoundaryWrap(nextTrack)
        isLockedRef.current = false
        return
      }

      // 1. Move desktop track immediately (360ms)
      setIsTransitioning(true)
      setTrackIndex(nextTrack)

      // 2. Fast exit: quick 80ms fade & micro-drift
      setTextAnimStyle({
        opacity: 0,
        transform: 'translate3d(-10px, 0, 0)',
        transition: 'opacity 80ms ease-out, transform 80ms ease-out',
      })
      setImageAnimStyle({
        opacity: 0.88,
        transform: 'scale(0.99)',
        transition: 'opacity 80ms ease-out, transform 80ms ease-out',
      })

      // 3. Seamless swap: instant reposition while invisible
      setTimeout(() => {
        setDisplayedReviewIndex(nextReviewIndex)

        setTextAnimStyle({
          opacity: 0,
          transform: 'translate3d(10px, 0, 0)',
          transition: 'none',
        })
        setImageAnimStyle({
          opacity: 0.88,
          transform: 'scale(1.01)',
          transition: 'none',
        })

        // 4. Smooth, fast glide-in (200ms)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTextAnimStyle({
              opacity: 1,
              transform: 'translate3d(0, 0, 0)',
              transition: `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
            })
            setImageAnimStyle({
              opacity: 1,
              transform: 'scale(1)',
              transition: `opacity 220ms ${EASE}, transform 240ms ${EASE}`,
            })
          })
        })
      }, 80)

      // 5. Wrap infinite boundaries and release lock
      setTimeout(() => {
        checkBoundaryWrap(nextTrack)
      }, TRANSITION_MS + 20)
    },
    [checkBoundaryWrap, prefersReducedMotion, trackIndex]
  )

  /* Snappy, seamless backward transition */
  const stepBackward = useCallback(() => {
    if (isLockedRef.current) return
    isLockedRef.current = true

    const prevTrack = trackIndex - 1
    const prevReviewIndex = ((prevTrack % TOTAL) + TOTAL) % TOTAL

    if (prefersReducedMotion) {
      setTrackIndex(prevTrack)
      setDisplayedReviewIndex(prevReviewIndex)
      checkBoundaryWrap(prevTrack)
      isLockedRef.current = false
      return
    }

    setIsTransitioning(true)
    setTrackIndex(prevTrack)

    setTextAnimStyle({
      opacity: 0,
      transform: 'translate3d(10px, 0, 0)',
      transition: 'opacity 80ms ease-out, transform 80ms ease-out',
    })
    setImageAnimStyle({
      opacity: 0.88,
      transform: 'scale(0.99)',
      transition: 'opacity 80ms ease-out, transform 80ms ease-out',
    })

    setTimeout(() => {
      setDisplayedReviewIndex(prevReviewIndex)

      setTextAnimStyle({
        opacity: 0,
        transform: 'translate3d(-10px, 0, 0)',
        transition: 'none',
      })
      setImageAnimStyle({
        opacity: 0.88,
        transform: 'scale(1.01)',
        transition: 'none',
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTextAnimStyle({
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            transition: `opacity 200ms ${EASE}, transform 200ms ${EASE}`,
          })
          setImageAnimStyle({
            opacity: 1,
            transform: 'scale(1)',
            transition: `opacity 220ms ${EASE}, transform 240ms ${EASE}`,
          })
        })
      })
    }, 80)

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
      const currentMod = displayedReviewIndex
      if (targetDotIdx === currentMod) return
      const forwardDiff = (targetDotIdx - currentMod + TOTAL) % TOTAL
      stepForward(forwardDiff)
    },
    [displayedReviewIndex, stepForward]
  )

  /* Autoplay timer with configured delay */
  useEffect(() => {
    if (prefersReducedMotion || isPaused || !isInView) return
    const timer = setInterval(() => {
      stepForward(1)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [prefersReducedMotion, isPaused, isInView, stepForward])

  /* Viewport visibility observer */
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* Keyboard arrows navigation */
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

  /* Cleanup timeout on unmount */
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  /* Mobile touch swipe handlers with auto-resume */
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
    touchDeltaRef.current = { x: 0, y: 0 }
    setIsPaused(true)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return
    touchDeltaRef.current = {
      x: e.touches[0].clientX - touchStartRef.current.x,
      y: e.touches[0].clientY - touchStartRef.current.y,
    }
  }

  const handleTouchEnd = () => {
    const { x: dx, y: dy } = touchDeltaRef.current
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    // Trigger swipe if horizontal displacement exceeds 40px and is primary direction
    if (absX > 40 && absX > absY * 1.2) {
      if (dx < 0) {
        stepForward(1)
      } else {
        stepBackward()
      }
    }

    // Auto-resume autoplay after 4 seconds of idle time
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 4000)
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-canvas section-y relative"
      aria-labelledby={labelId}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Ambient background atmosphere */}
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

      {/* Section Header */}
      <div className="container-page relative space-y-3 text-center sm:space-y-4">
        <Badge variant="brass">Client Stories & Portfolios</Badge>
        <h2
          id={labelId}
          className="text-charcoal-deep text-display-sm font-serif font-bold"
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

      {/* Testimonials Showcase */}
      <div className="container-page relative mt-8 sm:mt-12 lg:mt-16">
        {/* Mobile / Tablet (< lg): Unified Luxury Showcase Card */}
        <div className="block lg:hidden">
          <MobileTestimonialCard
            testimonial={currentTestimonial}
            textAnimStyle={textAnimStyle}
            imageAnimStyle={imageAnimStyle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            currentIndex={displayedReviewIndex}
            total={TOTAL}
          />
        </div>

        {/* Desktop (>= lg): Dual-Column Interactive Gallery */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8 xl:gap-10">
          <div className="h-127.5 lg:col-span-5">
            <ReviewCard
              testimonial={currentTestimonial}
              textAnimStyle={textAnimStyle}
            />
          </div>

          <div className="h-127.5 lg:col-span-7">
            <ImageGallery
              currentIndex={trackIndex}
              isTransitioning={isTransitioning}
              onSelectCard={handleSelectCard}
            />
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="mt-6 flex items-center justify-between gap-3 sm:mt-8 sm:gap-4 lg:mt-10">
          <Button
            variant="outline"
            size="sm"
            onClick={stepBackward}
            aria-label="Previous client review"
            className="h-9.5 rounded-full px-3.5 sm:h-10 sm:px-4"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Center Indicators */}
          <div className="flex items-center gap-2">
            {/* Mobile counter pill */}
            <span className="border-brass/30 bg-brass-light text-wood-walnut text-label-xs inline-flex rounded-full border px-3 py-1 font-mono font-semibold tracking-wider sm:hidden">
              {String(displayedReviewIndex + 1).padStart(2, '0')} /{' '}
              {String(TOTAL).padStart(2, '0')}
            </span>

            {/* Tablet & Desktop dot indicators */}
            <div
              className="hidden items-center gap-1.5 sm:flex sm:gap-2"
              role="tablist"
              aria-label="Testimonial slides"
            >
              {TESTIMONIALS.map((t, idx) => {
                const isActive = idx === displayedReviewIndex
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
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => stepForward(1)}
            aria-label="Next client review"
            className="h-9.5 rounded-full px-3.5 sm:h-10 sm:px-4"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Decorative Desktop Vertical Label */}
        <div
          className="3xl:block pointer-events-none absolute inset-y-0 -right-6 hidden"
          aria-hidden="true"
        >
          <div className="sticky top-[24vh] flex h-[52vh] flex-col items-center gap-6">
            <span className="text-text-muted text-label-xs tracking-[0.42em] uppercase [writing-mode:vertical-rl]">
              Client Reviews
            </span>
            <span className="via-brass/35 w-px grow bg-linear-to-b from-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Auto-delay Reading Progress Bar */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-0.5 overflow-hidden"
        aria-hidden="true"
      >
        <div
          key={`${displayedReviewIndex}-${isPaused}`}
          className="from-brass/60 via-brass/40 to-brass/10 h-full w-full origin-left bg-linear-to-r"
          style={{
            animationName:
              prefersReducedMotion || !isInView
                ? 'none'
                : 'testimonial-progress',
            animationDuration: `${AUTOPLAY_MS}ms`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        />
      </div>
    </section>
  )
}
