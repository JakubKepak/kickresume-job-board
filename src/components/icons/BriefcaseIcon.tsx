interface IconProps {
  className?: string
  size?: number
}

export function BriefcaseIcon({ className = '', size = 14 }: IconProps) {
  return (
    <img
      src="/bagIcon.svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      alt=""
    />
  )
}
