import type { ComponentProps } from 'react'

interface SearchInputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  onClear?: () => void
  clearLabel?: string
  icon?: React.ReactNode
}

export function SearchInput({
  value,
  onChange,
  onClear,
  clearLabel,
  icon,
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted">
          {icon}
        </span>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-1 text-sm font-medium bg-transparent border-none focus:outline-none text-text-primary placeholder:text-text-muted placeholder:font-normal ${icon ? 'pl-8 pr-3' : 'pl-3 pr-10'}`}
        {...props}
      />
      {onClear && value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-secondary"
          aria-label={clearLabel}
        >
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
