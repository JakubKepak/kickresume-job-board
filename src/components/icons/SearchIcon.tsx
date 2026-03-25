interface IconProps {
  className?: string
  size?: number
}

export function SearchIcon({ className = '', size = 18 }: IconProps) {
  return (
    <img
      src="/searchIcon.svg"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      alt=""
    />
  )
}
