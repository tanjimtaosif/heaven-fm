import { useState, useRef, useEffect, useCallback } from 'react'
import { useLenis } from '@/components/providers'
import promoVideo from '@/assets/promo/promo.mp4'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Clamp a value between min and max.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Scroll-driven video reveal that peeks at the bottom of the hero
 * and expands into a refined, cinematic luxury atelier frame as the user scrolls.
 *
 * Uses direct DOM ref updating on clip-path: inset() —
 * fully GPU-composited, zero React re-render overhead, 120fps silkiness.
 */
export const ScrollVideoRevealSection = () => {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const videoRef = useRef(null)

  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !videoRef.current.muted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  // Enforce 1.5x playback speed
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5
    }
  }, [])

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
      aria-label="Heaven Atelier Film Showcase"
    >
      {/* Sticky container — pins to viewport */}
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Atmospheric warm radial glow behind the video frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="from-brass/25 via-brass/[0.04] h-[70vh] w-[85vw] max-w-6xl rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-transparent blur-3xl" />
        </div>

        {/* Subtle Vertical Flank Guides (Editorial touches on wide viewports) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-6 hidden items-center 2xl:flex"
        >
          <div className="flex h-[45vh] flex-col items-center gap-5">
            <span className="text-text-muted/60 text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl]">
              Atelier Showcase · Motion
            </span>
            <span className="from-brass/30 h-16 w-px bg-gradient-to-b to-transparent" />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-6 hidden items-center 2xl:flex"
        >
          <div className="flex h-[45vh] flex-col items-center gap-5">
            <span className="text-text-muted/60 text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl]">
              Agrabad Access Road · Chattogram
            </span>
            <span className="from-brass/30 h-16 w-px bg-gradient-to-b to-transparent" />
          </div>
        </div>

        {/* Centered max-width container */}
        <div className="relative h-[88vh] w-full max-w-7xl">
          {/* Video with clip-path card effect — clicking anywhere toggles mute/unmute */}
          <div
            ref={cardRef}
            onClick={toggleMute}
            className="group relative h-full w-full cursor-pointer overflow-hidden shadow-[0_30px_70px_-20px_rgba(15,30,33,0.4),0_0_0_1px_rgba(196,159,102,0.35)] will-change-[clip-path]"
            style={{
              clipPath: 'inset(8% 10% 8% 10% round 20px)',
            }}
          >
            {/* Top Vignette Overlay */}
            <div
              aria-hidden="true"
              className="from-charcoal-deep/75 via-charcoal-deep/20 pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b to-transparent"
            />

            {/* Bottom Vignette Overlay */}
            <div
              aria-hidden="true"
              className="from-charcoal-deep/85 via-charcoal-deep/25 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t to-transparent"
            />

            {/* Architectural Viewfinder Corner Accents */}
            <div
              aria-hidden="true"
              className="border-brass/70 pointer-events-none absolute top-4 left-4 z-20 h-4 w-4 border-t-2 border-l-2 sm:top-6 sm:left-6 sm:h-5 sm:w-5"
            />
            <div
              aria-hidden="true"
              className="border-brass/70 pointer-events-none absolute top-4 right-4 z-20 h-4 w-4 border-t-2 border-r-2 sm:top-6 sm:right-6 sm:h-5 sm:w-5"
            />
            <div
              aria-hidden="true"
              className="border-brass/70 pointer-events-none absolute bottom-4 left-4 z-20 h-4 w-4 border-b-2 border-l-2 sm:bottom-6 sm:left-6 sm:h-5 sm:w-5"
            />
            <div
              aria-hidden="true"
              className="border-brass/70 pointer-events-none absolute right-4 bottom-4 z-20 h-4 w-4 border-r-2 border-b-2 sm:right-6 sm:bottom-6 sm:h-5 sm:w-5"
            />

            {/* Top Bar: Live Status Pill */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:p-7">
              <div className="bg-charcoal-deep/75 text-canvas inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.25em] uppercase shadow-lg backdrop-blur-md sm:text-[11px]">
                <span className="bg-brass h-2 w-2 animate-pulse rounded-full" />
                <span>Atelier Reel</span>
              </div>
            </div>

            {/* Bottom Bar: Editorial Caption & Audio Toggle Status */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-end sm:p-7">
              {/* Left: Editorial Narrative */}
              <div className="space-y-1">
                <p className="font-serif text-lg font-medium tracking-tight text-white drop-shadow-md sm:text-2xl">
                  Crafted Around You
                </p>
                <p className="max-w-sm text-xs text-white/80 drop-shadow-sm sm:max-w-md sm:text-sm">
                  Tangible luxury, seasoned timber joinery, and tailored spatial
                  proportions.
                </p>
              </div>

              {/* Right: Sound Toggle Button */}
              <div className="pointer-events-auto self-start sm:self-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                  className="bg-charcoal-deep/80 text-canvas hover:border-brass/70 hover:bg-brass hover:text-charcoal-deep focus-visible:ring-brass flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none"
                  aria-label={isMuted ? 'Click to Unmute' : 'Click to Mute'}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="text-brass h-3.5 w-3.5 transition-colors" />
                      <span className="text-[11px] font-medium tracking-wide uppercase">
                        Click to Unmute
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-3.5 w-3.5 text-emerald-400 transition-colors" />
                      <span className="text-[11px] font-medium tracking-wide text-emerald-300 uppercase">
                        Sound On
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Video element — seamless autoplay, loop, playsInline at 1.5x speed */}
            <video
              ref={videoRef}
              src={promoVideo}
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 1.5
              }}
              onPlay={(e) => {
                e.currentTarget.playbackRate = 1.5
              }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
