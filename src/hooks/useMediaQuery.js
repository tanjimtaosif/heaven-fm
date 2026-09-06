import { useCallback, useSyncExternalStore } from 'react'

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

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}
