import { useRef, useEffect, useState } from 'react'
import { useCountries } from '../hooks/useCountries'

interface CountrySelectProps {
  value: string
  onChange: (country: string) => void
  className?: string
}

export function CountrySelect({ value, onChange, className = '' }: CountrySelectProps) {
  const { data: countries, isPending } = useCountries()
  const measureRef = useRef<HTMLSpanElement>(null)
  const [selectWidth, setSelectWidth] = useState<number | undefined>(undefined)

  const displayText = value || 'All countries'

  useEffect(() => {
    if (measureRef.current) {
      setSelectWidth(measureRef.current.offsetWidth + 68)
    }
  }, [displayText])

  return (
    <div className={`relative inline-block ${className}`}>
      <span
        ref={measureRef}
        className="invisible absolute whitespace-nowrap text-sm font-medium"
        aria-hidden="true"
      >
        {displayText}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
        style={selectWidth ? { width: selectWidth } : undefined}
        className="appearance-none bg-white text-text-primary text-sm font-medium py-2.5 pl-4 pr-10 rounded-lg border border-card-border focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral cursor-pointer"
        aria-label="Filter by country"
      >
        <option value="">All countries</option>
        {countries?.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
        width={12}
        height={12}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
