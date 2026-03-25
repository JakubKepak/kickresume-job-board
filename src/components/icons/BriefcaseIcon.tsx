interface IconProps {
  className?: string
  size?: number
}

export function BriefcaseIcon({ className = '', size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
      <path d="M9 6v14" />
      <path d="M15 6v14" />
    </svg>
  )
}
