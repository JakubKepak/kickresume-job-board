interface IconProps {
  className?: string
  size?: number
}

export function LocationIcon({ className = '', size = 14 }: IconProps) {
  return (
    <img
      src="/pointer.svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      alt=""
    />
  )
}
