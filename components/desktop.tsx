'use client'

import { useState } from 'react'
import { Taskbar } from './taskbar'
import { DesktopIcon } from './desktop-icon'
import { Window } from './window'
import { ContextMenu } from './context-menu'
import { MobileMenu } from './mobile-menu'
import { AboutApp } from './apps/about-app'
import { ProjectsApp } from './apps/projects-app'
import { SkillsApp } from './apps/skills-app'
import { ExperienceApp } from './apps/experience-app'
import { ContactApp } from './apps/contact-app'
import { useMediaQuery } from '@/hooks/use-media-query'

export interface OpenWindow {
  id: string
  type: string
  title: string
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface ContextMenuPosition {
  x: number
  y: number
}

export function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([])
  const [zIndexCounter, setZIndexCounter] = useState(1000)
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null)
  const [selectedMobileApp, setSelectedMobileApp] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const desktopIcons = [
    { id: 'about', label: 'About Me.txt', icon: '📄', type: 'about' },
    { id: 'projects', label: 'Projects/', icon: '📁', type: 'projects' },
    { id: 'skills', label: 'Skills/', icon: '⚙️', type: 'skills' },
    { id: 'experience', label: 'Experience/', icon: '📈', type: 'experience' },
    { id: 'contact', label: 'Contact.exe', icon: '💌', type: 'contact' },
  ]

  const openWindow = (type: string) => {
    if (isMobile) {
      setSelectedMobileApp(type)
      return
    }

    const existingWindow = windows.find(w => w.type === type)
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w => w.type === type ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 } : w))
      } else {
        bringToFront(type)
      }
      return
    }

    const newZIndex = zIndexCounter + 1
    setZIndexCounter(newZIndex)

    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: desktopIcons.find(icon => icon.type === type)?.label || 'Window',
      isMinimized: false,
      position: { x: 100 + windows.length * 20, y: 100 + windows.length * 20 },
      size: { width: 600, height: 400 },
      zIndex: newZIndex,
    }
    setWindows([...windows, newWindow])
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w))
  }

  const bringToFront = (type: string) => {
    const newZIndex = zIndexCounter + 1
    setZIndexCounter(newZIndex)
    setWindows(windows.map(w => w.type === type ? { ...w, zIndex: newZIndex } : w))
  }

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(windows.map(w => w.id === id ? { ...w, position } : w))
  }

  const updateWindowSize = (id: string, size: { width: number; height: number }) => {
    setWindows(windows.map(w => w.id === id ? { ...w, size } : w))
  }

  const getAppContent = (type: string, windowId: string) => {
    switch (type) {
      case 'about':
        return <AboutApp />
      case 'projects':
        return <ProjectsApp />
      case 'skills':
        return <SkillsApp />
      case 'experience':
        return <ExperienceApp />
      case 'contact':
        return <ContactApp />
      default:
        return null
    }
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isMobile) return
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  // Mobile layout
  if (isMobile) {
    if (selectedMobileApp) {
      return (
        <MobileMenu
          selectedApp={selectedMobileApp}
          onBack={() => setSelectedMobileApp(null)}
          getAppContent={getAppContent}
        />
      )
    }

    return (
      <div className="w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-3 shadow-lg">
          <h1 className="text-lg font-bold">Portfolio OS</h1>
        </div>

        {/* Mobile app grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {desktopIcons.map(icon => (
              <button
                key={icon.id}
                onClick={() => openWindow(icon.type)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 transition-colors duration-200 shadow-md active:scale-95"
              >
                <div className="text-4xl">{icon.icon}</div>
                <span className="text-xs text-center text-foreground font-medium">{icon.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile footer */}
        <div className="h-14 bg-taskbar-bg border-t border-taskbar-border flex items-center justify-between px-4">
          <span className="text-xs text-muted-foreground font-semibold">Portfolio OS</span>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    )
  }

  // Desktop layout
  return (
    <div
      className="w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex flex-col overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={handleCloseContextMenu}
    >
      {/* Desktop background with icons */}
      <div className="flex-1 overflow-hidden relative">
        {/* Grid of desktop icons */}
        <div className="p-8 flex gap-12 flex-wrap content-start">
          {desktopIcons.map(icon => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              onClick={() => openWindow(icon.type)}
            />
          ))}
        </div>

        {/* Floating windows */}
        <div className="absolute inset-0 pointer-events-none">
          {windows.map(window => (
            <div key={window.id} className="pointer-events-auto">
              <Window
                window={window}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onBringToFront={() => bringToFront(window.type)}
                onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
                onSizeChange={(size) => updateWindowSize(window.id, size)}
              >
                {getAppContent(window.type, window.id)}
              </Window>
            </div>
          ))}
        </div>

        {/* Context menu */}
        {contextMenu && (
          <ContextMenu position={contextMenu} onClose={handleCloseContextMenu} />
        )}
      </div>

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={(windowId) => {
          const window = windows.find(w => w.id === windowId)
          if (window) {
            if (window.isMinimized) {
              minimizeWindow(windowId)
            } else {
              bringToFront(window.type)
            }
          }
        }}
        onOpenWindow={openWindow}
      />
    </div>
  )
}
