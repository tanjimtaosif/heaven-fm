import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribe to a CSS media query from React.
 *
 * Returns a live boolean so components can *mount* different trees per
 * breakpoint instead of hiding one with CSS — a hidden <video> would still
 * download and decode, which is exactly what we want to avoid on phones.
 */
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

/**
 * Tailwind's `lg` breakpoint — the line where the pinned, scroll-driven
 * film reveal is worth its cost. Below it we play the film inline.
 */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
