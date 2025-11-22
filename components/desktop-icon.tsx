'use client'

export interface DesktopIconProps {
  label: string
  icon: string
  onClick: () => void
}

export function DesktopIcon({ label, icon, onClick }: DesktopIconProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors duration-200 group cursor-pointer icon-hover"
    >
      <div className="text-5xl select-none group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-xs text-center text-foreground max-w-[80px] leading-tight group-hover:font-semibold transition-all">
        {label}
      </span>
    </button>
  )
}
