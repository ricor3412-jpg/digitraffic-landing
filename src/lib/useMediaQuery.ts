import { useEffect, useState } from 'react'

/**
 * Reacciona a una media query desde React.
 * Se usa para cambiar de composición (no solo de tamaño) entre móvil y
 * escritorio: hay animaciones que no se arreglan escalando, hay que
 * replantearlas.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
