interface SkeletonProps {
  width?: string
  height?: string
  className?: string
}

export function Skeleton({ width, height, className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      style={{ width, height }}
    />
  )
}
