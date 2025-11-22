'use client'

import { useState, useEffect } from 'react'
import { Desktop } from '@/components/desktop'
import { BootScreen } from '@/components/boot-screen'

export default function Home() {
  const [showBoot, setShowBoot] = useState(true)
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    if (showBoot) {
      const timer = setTimeout(() => {
        setShowBoot(false)
        setBootComplete(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showBoot])

  if (showBoot) {
    return <BootScreen />
  }

  return <Desktop />
}
