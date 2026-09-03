import { useRef, useEffect, useState, useCallback } from 'react'
import promoVideo from '@/assets/promo/promo.mp4'

/**
 * Clamp a value between min and max.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Scroll-driven video reveal that peeks at the bottom of the hero
 * and expands into a refined, contained frame as the user scrolls.
 *
 * Uses clip-path: inset() for the card transition —
 * fully GPU-composited, zero layout repaints, no black blink artifacts.
 *
 * The video never goes full device screen — it stays inside a centered
 * container with side spacing for a minimal, premium look.
 */
export const ScrollVideoRevealSection = () => {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionHeight = sectionRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const scrollableDistance = sectionHeight - windowHeight

    if (scrollableDistance <= 0) return

    const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1)
    setProgress(rawProgress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /**
   * Eased progress for smooth cinematic feel.
   * easeOutCubic — fast initial reveal that settles gently.
   */
  const ease = 1 - Math.pow(1 - progress, 3)

  /**
   * clip-path: inset() values:
   *  - At progress 0: inset(8% 10% round 20px)   → smaller peek card
   *  - At progress 1: inset(0.5% 0% round 12px)  → refined contained frame (not full bleed)
   *
   * The video is ALWAYS rendered at full container size behind the clip,
   * so there is no layout shift and no black blink.
   */
  const insetY = 0.5 + 7.5 * (1 - ease)
  const insetX = 10 * (1 - ease)
  const borderRadius = Math.round(12 + 8 * (1 - ease))

  return (
    <section
      ref={sectionRef}
      className="relative mt-[-25vh]"
      style={{ height: '180vh' }}
      aria-label="Promo Video"
    >
      {/* Sticky container — pins to viewport */}
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Centered max-width container — video never goes full device screen */}
        <div className="relative h-[88vh] w-full max-w-7xl">
          {/* Video with clip-path card effect — GPU composited, no repaints */}
          <div
            className="h-full w-full will-change-[clip-path]"
            style={{
              clipPath: `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${borderRadius}px)`,
            }}
          >
            <video
              src={promoVideo}
              autoPlay
              muted
              loop
              playsInline
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
