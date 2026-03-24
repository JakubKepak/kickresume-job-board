import { useCountries } from '../hooks/useCountries'

interface CountrySelectProps {
  value: string
  onChange: (country: string) => void
  className?: string
}

export function CountrySelect({ value, onChange, className = '' }: CountrySelectProps) {
  const { data: countries, isPending } = useCountries()

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isPending}
      className={`appearance-none bg-white text-text-primary text-sm py-2.5 px-3 pr-8 rounded-lg border border-card-border focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral ${className}`}
      aria-label="Filter by country"
    >
      <option value="">All countries</option>
      {countries?.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  )
}
