import { useEffect, useSyncExternalStore } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

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

const easeOutExpo = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

function LenisAnchorHandler() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleAnchorClick = (e) => {
      const target = e.target
      if (!target || typeof target.closest !== 'function') return

      const anchor = target.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#')) return

      if (href === '#' || href === '#top') {
        e.preventDefault()
        lenis.scrollTo(0, {
          duration: 1.5,
          easing: easeOutExpo,
        })
        return
      }

      const targetId = href.slice(1)
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        lenis.scrollTo(targetEl, {
          offset: -90,
          duration: 1.5,
          easing: easeOutExpo,
        })

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

export function SmoothScrollProvider({ children }) {
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  const lenisOptions = {
    lerp: isReducedMotion ? 1 : 0.08,
    smoothWheel: !isReducedMotion,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
    syncTouch: false,
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
