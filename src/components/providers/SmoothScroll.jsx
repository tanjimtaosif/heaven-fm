import { useEffect, useSyncExternalStore } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

/**
 * External store subscription for prefers-reduced-motion
 */
function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => {}
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

/**
 * Bespoke easeOutExpo easing curve for cinematic anchor transitions
 */
const easeOutExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

/**
 * Global anchor link smooth scroll handler.
 * Automatically intercepts clicks on links with hash hrefs (#collections, #why-us, etc.)
 * and scrolls smoothly to the target with navbar offset compensation.
 */
function LenisAnchorHandler() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleAnchorClick = (e) => {
      // Find closest anchor element
      const target = e.target
      if (!target || typeof target.closest !== 'function') return

      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      // Handle top / home anchor
      if (href === '#' || href === '#top') {
        e.preventDefault()
        lenis.scrollTo(0, {
          duration: 1.5,
          easing: easeOutExpo,
        })
        return
      }

      // Handle section anchor
      const targetId = href.slice(1)
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        // Offset 90px accounts for the floating navbar and comfortable breathing room
        lenis.scrollTo(targetEl, {
          offset: -90,
          duration: 1.5,
          easing: easeOutExpo,
        })

        // Update URL hash without browser jump
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [lenis])

  return null
}

/**
 * High-performance smooth scrolling provider powered by Lenis.
 * Features:
 * - True physics-based Rory Driscoll exponential damping (damp):
 *   Omitting duration lets wheel impulses continuously compound into velocity,
 *   delivering an unbroken, buttery velvet gliding sensation.
 * - lerp: 0.065 provides high-end luxury atelier inertia and momentum.
 * - Reduced-motion accessibility detection.
 * - Global hash navigation routing with floating navbar offset and easeOutExpo easing.
 * - Native touch handling with synced momentum (syncTouch: true).
 */
export function SmoothScrollProvider({ children }) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  const lenisOptions = {
    // Pure physics damping factor (lower = silkier, longer glide tail)
    lerp: isReducedMotion ? 1 : 0.065,
    smoothWheel: !isReducedMotion,
    wheelMultiplier: 0.95, // Softens harsh mouse wheel detent steps
    touchMultiplier: 1.4,
    syncTouch: true, // Enables smooth momentum on touch screens & touchpads
    syncTouchLerp: isReducedMotion ? 1 : 0.075,
    touchInertiaExponent: 1.8,
    infinite: false,
    autoRaf: true,
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
