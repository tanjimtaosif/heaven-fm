import { useState, useRef, useEffect, useCallback } from 'react'
import promoVideo from '@/assets/promo/promo.mp4'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * The atelier film as it appears on phones and tablets: a plain, honest
 * video frame sitting directly under the hero copy inside the hero section.
 *
 * No pinning, no scroll-driven clip-path — small screens have too little
 * vertical room for a 180vh reveal, and a sticky section there reads as a
 * stall rather than a flourish. Same chrome, same tone, natural flow.
 *
 * The frame adopts the file's own aspect ratio once metadata arrives, so the
 * whole composed shot is visible — nothing cropped away to fill a fixed box.
 */
export const HeroInlineFilm = () => {
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)

  // 16/9 is only the placeholder that reserves space before metadata lands;
  // the real ratio replaces it, so the frame never letterboxes or jumps.
  const [aspectRatio, setAspectRatio] = useState('16 / 9')

  const applyRatio = useCallback((video) => {
    if (video?.videoWidth && video?.videoHeight) {
      setAspectRatio(`${video.videoWidth} / ${video.videoHeight}`)
    }
  }, [])

  /**
   * Tap anywhere on the frame to toggle sound.
   *
   * Unmuting has to happen inside the user gesture or mobile browsers refuse
   * it, and some of them pause a muted autoplaying video the moment its audio
   * track becomes active — hence the explicit play() nudge afterwards.
   */
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

  // Match the desktop reel's cadence, and pick up the ratio if metadata was
  // already parsed before this effect ran.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = 1.5
    applyRatio(video)
  }, [applyRatio])

  // Keep the label honest if the browser mutes/unmutes the element itself.
  const syncMuted = (e) => setIsMuted(e.currentTarget.muted)

  return (
    <div className="relative mx-auto mt-10 w-full max-w-2xl px-4 sm:mt-12 sm:px-6">
      {/* Atmospheric warm glow behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="from-brass/25 via-brass/[0.04] h-[80%] w-[92%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] to-transparent blur-3xl" />
      </div>

      {/* Section marker above the frame */}
      <div className="relative mb-4 flex items-center justify-center gap-3">
        <span
          className="to-brass/40 h-px w-8 bg-linear-to-r from-transparent"
          aria-hidden="true"
        />
        <span className="text-text-muted text-[10px] tracking-[0.32em] uppercase">
          Atelier Showcase · Motion
        </span>
        <span
          className="to-brass/40 h-px w-8 bg-linear-to-l from-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Video card — tapping anywhere toggles sound */}
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
        {/* Top & bottom vignettes keep the overlay chrome readable */}
        <div
          aria-hidden="true"
          className="from-charcoal-deep/70 pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b to-transparent"
        />
        <div
          aria-hidden="true"
          className="from-charcoal-deep/70 pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t to-transparent"
        />

        {/* Architectural viewfinder corner accents */}
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

        {/* Live status pill */}
        <div className="pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2">
          <div className="bg-charcoal-deep/75 text-canvas inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-[9px] font-medium tracking-[0.25em] uppercase shadow-lg backdrop-blur-md">
            <span className="bg-brass h-1.5 w-1.5 animate-pulse rounded-full" />
            <span>Atelier Reel</span>
          </div>
        </div>

        {/* Sound toggle — the only chrome inside the frame's lower band, so a
            short 16:9 shot on a phone stays mostly picture. */}
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
                <span className="text-[10px] font-medium tracking-wide uppercase">
                  Tap to Unmute
                </span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-emerald-400 transition-colors" />
                <span className="text-[10px] font-medium tracking-wide text-emerald-300 uppercase">
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

      {/* Editorial caption sits below the frame so nothing covers the shot */}
      <div className="relative mt-4 text-center">
        <p className="text-charcoal-deep font-serif text-lg font-medium tracking-tight">
          Crafted Around You
        </p>
        <p className="text-text-secondary mx-auto mt-1 max-w-sm text-[13px] leading-relaxed">
          Tangible luxury, seasoned timber joinery, and tailored spatial
          proportions.
        </p>
      </div>
    </div>
  )
}
