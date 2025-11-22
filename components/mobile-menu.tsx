'use client'

import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'

interface MobileMenuProps {
  selectedApp: string
  onBack: () => void
  getAppContent: (type: string, windowId: string) => React.ReactNode
}

export function MobileMenu({ selectedApp, onBack, getAppContent }: MobileMenuProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const appTitles: Record<string, string> = {
    about: 'About Me',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
  }

  return (
    <div className="w-screen h-screen bg-background flex flex-col overflow-hidden">
      {/* Mobile app header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-3 shadow-lg flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/20 rounded transition-colors"
        >
          ←
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">{appTitles[selectedApp]}</h2>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 hover:bg-white/20 rounded transition-colors"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* App content */}
      <div className="flex-1 overflow-y-auto bg-window-bg dark:bg-slate-900 p-4">
        {getAppContent(selectedApp, `mobile-${selectedApp}`)}
      </div>
    </div>
  )
}
