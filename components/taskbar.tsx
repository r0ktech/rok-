'use client'

import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'
import type { OpenWindow } from './desktop'

interface TaskbarProps {
  windows: OpenWindow[]
  onWindowClick: (windowId: string) => void
  onOpenWindow: (type: string) => void
}

export function Taskbar({ windows, onWindowClick, onOpenWindow }: TaskbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-16 bg-taskbar-bg border-t border-taskbar-border flex items-center px-4 gap-2 backdrop-blur-sm shadow-lg">
      {/* Start button simulation */}
      <button
        onClick={() => onOpenWindow('about')}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary/20 transition-colors text-sm font-semibold text-foreground"
      >
        <span>🪟</span>
        Portfolio OS
      </button>

      {/* Divider */}
      <div className="w-px h-8 bg-border opacity-30" />

      {/* Open windows in taskbar */}
      <div className="flex gap-1">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`px-3 py-2 rounded text-sm transition-colors ${
              window.isMinimized
                ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                : 'bg-primary/30 text-foreground hover:bg-primary/50'
            }`}
          >
            <span className="truncate max-w-[150px]">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Right side - System tray */}
      <div className="flex-1" />
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="px-3 py-2 rounded hover:bg-primary/20 transition-colors"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <div className="text-xs text-muted-foreground">
        {time}
      </div>
    </div>
  )
}
