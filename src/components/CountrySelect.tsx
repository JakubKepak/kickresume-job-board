import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useCountries } from '../hooks/useCountries'
import { MultiSelect } from './MultiSelect'

const formatOverflow = (n: number) => `+${n}`

interface CountrySelectProps {
  value: string[]
  onChange: (countries: string[]) => void
  closeOnSelect?: boolean
  className?: string
}

export function CountrySelect({ value, onChange, closeOnSelect, className = '' }: CountrySelectProps) {
  const intl = useIntl()
  const { data: countries, isPending } = useCountries()

  const options = useMemo(
    () => (countries ?? []).map((country) => ({ value: country, label: country })),
    [countries],
  )

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={onChange}
      placeholder={intl.formatMessage({ id: 'country.all' })}
      searchPlaceholder={intl.formatMessage({ id: 'country.filterLabel' })}
      closeOnSelect={closeOnSelect}
      overflowLabel={formatOverflow}
      disabled={isPending}
      className={className}
      aria-label={intl.formatMessage({ id: 'country.filterLabel' })}
    />
  )
}
