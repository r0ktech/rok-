'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    window.addEventListener('change', listener)
    media.addEventListener('change', listener)

    return () => {
      window.removeEventListener('change', listener)
      media.removeEventListener('change', listener)
    }
  }, [matches, query])

  return mounted ? matches : false
}
