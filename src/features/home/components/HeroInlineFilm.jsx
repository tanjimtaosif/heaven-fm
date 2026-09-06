import { useState, useRef, useEffect, useCallback } from 'react'
import promoVideo from '@/assets/promo/promo.mp4'
import { Volume2, VolumeX } from 'lucide-react'

export const HeroInlineFilm = () => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  const [aspectRatio, setAspectRatio] = useState('16 / 9')

  const applyRatio = useCallback((video) => {
    if (video?.videoWidth && video?.videoHeight) {
      setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    if (!nextMuted) video.volume = 1
    setIsMuted(nextMuted)

    if (video.paused) {
      const played = video.play()
      if (played?.catch) played.catch(() => {})
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = 1.5
    applyRatio(video)
  }, [applyRatio])

  const syncMuted = (e) => setIsMuted(e.currentTarget.muted)

  return (
    <div className="relative mx-auto mt-10 w-full max-w-2xl px-4 sm:mt-12 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="from-brass/25 via-brass/[0.04] h-[80%] w-[92%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-transparent blur-3xl" />
      </div>

      <div className="relative mb-4 flex items-center justify-center gap-3">
        <span
          className="to-brass/40 h-px w-8 bg-linear-to-r from-transparent"
          aria-hidden="true"
        />
        <span className="text-text-muted text-label-xs tracking-[0.32em] uppercase">
          Atelier Showcase · Motion
        </span>
        <span
          className="to-brass/40 h-px w-8 bg-linear-to-l from-transparent"
          aria-hidden="true"
        />
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={
          isMuted ? 'Unmute the atelier film' : 'Mute the atelier film'
        }
        onClick={toggleMute}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleMute()
          }
        }}
        style={{ aspectRatio }}
        className="bg-charcoal-deep focus-visible:ring-brass relative w-full cursor-pointer overflow-hidden rounded-2xl shadow-[0_24px_55px_-22px_rgba(15,30,33,0.45),0_0_0_1px_rgba(196,159,102,0.35)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div
          aria-hidden="true"
          className="from-charcoal-deep/70 pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-charcoal-deep/70 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t to-transparent"
        />

        <div
          aria-hidden="true"
          className="border-brass/70 pointer-events-none absolute top-3 left-3 z-20 h-3.5 w-3.5 border-t-2 border-l-2"
        />
        <div
          aria-hidden="true"
          className="border-brass/70 pointer-events-none absolute top-3 right-3 z-20 h-3.5 w-3.5 border-t-2 border-r-2"
        />
        <div
          aria-hidden="true"
          className="border-brass/70 pointer-events-none absolute bottom-3 left-3 z-20 h-3.5 w-3.5 border-b-2 border-l-2"
        />
        <div
          aria-hidden="true"
          className="border-brass/70 pointer-events-none absolute right-3 bottom-3 z-20 h-3.5 w-3.5 border-r-2 border-b-2"
        />

        <div className="pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2">
          <div className="bg-charcoal-deep/75 text-canvas text-label-xs inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 font-medium tracking-[0.25em] uppercase shadow-lg backdrop-blur-md">
            <span className="bg-brass h-1.5 w-1.5 animate-pulse rounded-full" />
            <span>Atelier Reel</span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              toggleMute()
            }}
            className="bg-charcoal-deep/80 text-canvas hover:border-brass/70 hover:bg-brass hover:text-charcoal-deep focus-visible:ring-brass flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 focus-visible:ring-2 focus-visible:outline-none"
            aria-label={isMuted ? 'Tap to unmute' : 'Tap to mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="text-brass h-3.5 w-3.5 transition-colors" />
                <span className="text-label-xs font-medium tracking-wide uppercase">
                  Tap to Unmute
                </span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400 transition-colors" />
                <span className="text-label-xs font-medium tracking-wide text-emerald-300 uppercase">
                  Sound On
                </span>
              </>
            )}
          </button>
        </div>

        <video
          ref={videoRef}
          src={promoVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 1.5
            applyRatio(e.currentTarget)
          }}
          onPlay={(e) => {
            e.currentTarget.playbackRate = 1.5
          }}
          onVolumeChange={syncMuted}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="relative mt-4 text-center">
        <p className="text-charcoal-deep font-serif text-lg font-medium tracking-tight">
          Crafted Around You
        </p>
        <p className="text-text-secondary text-label-md mx-auto mt-1 max-w-sm leading-relaxed">
          Tangible luxury, seasoned timber joinery, and tailored spatial
          proportions.
        </p>
      </div>
    </div>
  )
}
