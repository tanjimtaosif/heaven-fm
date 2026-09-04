import { useRef, useEffect, useCallback } from 'react'
import { useLenis } from '@/components/providers'
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
 * Uses direct DOM ref updating on clip-path: inset() —
 * fully GPU-composited, zero React re-render overhead, 120fps silkiness.
 *
 * The video never goes full device screen — it stays inside a centered
 * container with side spacing for a minimal, premium look.
 */
export const ScrollVideoRevealSection = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  const updateClipPath = useCallback(() => {
    if (!sectionRef.current || !cardRef.current) return

    const rect = sectionRef.current.getBoundingClientRect()
    const sectionHeight = sectionRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const scrollableDistance = sectionHeight - windowHeight

    if (scrollableDistance <= 0) return

    const rawProgress = clamp(-rect.top / scrollableDistance, 0, 1)
    const ease = 1 - Math.pow(1 - rawProgress, 3)

    const insetY = (0.5 + 7.5 * (1 - ease)).toFixed(2)
    const insetX = (10 * (1 - ease)).toFixed(2)
    const borderRadius = Math.round(12 + 8 * (1 - ease))

    cardRef.current.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${borderRadius}px)`
  }, [])

  // Sync directly with Lenis RAF loop for 120Hz micro-jank-free interpolation
  useLenis(updateClipPath)

  useEffect(() => {
    updateClipPath()
    window.addEventListener('resize', updateClipPath, { passive: true })
    return () => window.removeEventListener('resize', updateClipPath)
  }, [updateClipPath])

  return (
    <section
      ref={sectionRef}
      className="relative mt-0"
      style={{ height: '180vh' }}
      aria-label="Promo Video"
    >
      {/* Sticky container — pins to viewport */}
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Centered max-width container — video never goes full device screen */}
        <div className="relative h-[88vh] w-full max-w-7xl">
          {/* Video with clip-path card effect — GPU composited, zero repaints */}
          <div
            ref={cardRef}
            className="h-full w-full will-change-[clip-path]"
            style={{
              clipPath: 'inset(8% 10% 8% 10% round 20px)',
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
