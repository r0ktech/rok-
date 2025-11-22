'use client'

import { useTheme } from '@/components/theme-provider'
import { useState, useEffect } from 'react'

interface ContextMenuProps {
  position: { x: number; y: number }
  onClose: () => void
}

export function ContextMenu({ position, onClose }: ContextMenuProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const menuItems = [
    {
      label: 'Refresh',
      icon: '🔄',
      action: () => window.location.reload(),
    },
    {
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      icon: theme === 'dark' ? '☀️' : '🌙',
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
  ]

  return (
    <div
      className="fixed z-50 bg-window-bg dark:bg-slate-800 border border-border rounded-lg shadow-2xl overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            item.action()
            onClose()
          }}
          className="w-full px-4 py-2.5 text-left hover:bg-primary/20 transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm font-medium text-foreground">{item.label}</span>
        </button>
      ))}
    </div>
  )
}
