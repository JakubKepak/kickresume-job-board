import type { ReactNode } from 'react'

interface PillProps {
  icon?: ReactNode
  children: ReactNode
}

export function Pill({ icon, children }: PillProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs text-pill-text bg-pill-bg rounded-full">
      {icon}
      {children}
    </span>
  )
}
