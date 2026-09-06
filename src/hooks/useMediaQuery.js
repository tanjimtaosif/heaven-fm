import { useCallback, useSyncExternalStore } from 'react'

/**
 * The Tailwind breakpoints, mirrored for JS.
 *
 * Tailwind v4 tree-shakes unused theme variables out of the stylesheet, so
 * `--breakpoint-*` is not readable at runtime. These values are the one JS
 * copy -- previously each call site inlined its own literal, including a
 * stray `767.98px` in the navbar that matched no breakpoint at all.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1400,
}

export const above = (key) => `(min-width: ${BREAKPOINTS[key]}px)`
export const below = (key) => `(max-width: ${BREAKPOINTS[key] - 0.02}px)`

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      if (typeof window === 'undefined') return () => {}
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

/** True at `lg` and up -- matches the `lg:` variant. */
export function useIsDesktop() {
  return useMediaQuery(above('lg'))
}

/** True below `md` -- matches the `max-md:` variant. */
export function useIsMobile() {
  return useMediaQuery(below('md'))
}

/** True below `sm` -- matches the `max-sm:` variant. */
export function useIsCompact() {
  return useMediaQuery(below('sm'))
}

/** True when the visitor has asked for reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
