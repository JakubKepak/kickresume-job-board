import { useState } from 'react'
import { useIntl } from 'react-intl'
import { Button } from './Button'
import { CountrySelect } from './CountrySelect'
import { SearchInput } from './SearchInput'
import { SearchIcon } from './icons/SearchIcon'

interface SearchBarProps {
  initialQuery: string
  initialCountries: string[]
  onSearch: (query: string, countries: string[]) => void
}

export function SearchBar({ initialQuery, initialCountries, onSearch }: SearchBarProps) {
  const intl = useIntl()
  const [inputValue, setInputValue] = useState(initialQuery)
  const [countries, setCountries] = useState(initialCountries)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(inputValue.trim(), countries)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card-bg rounded-2xl border border-search-border shadow-search px-5.75 py-4.5"
    >
      {/* Desktop: horizontal row */}
      <div className="hidden md:flex items-center gap-2.5">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          icon={<SearchIcon />}
          placeholder={intl.formatMessage({ id: 'search.placeholder' })}
          className="flex-1"
        />

        <CountrySelect
          value={countries}
          onChange={setCountries}
          className="shrink-0"
        />

        <Button type="submit">{intl.formatMessage({ id: 'search.submit' })}</Button>
      </div>

      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-2.5 md:hidden">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          onClear={handleClear}
          clearLabel={intl.formatMessage({ id: 'search.clear' })}
          placeholder={intl.formatMessage({ id: 'search.placeholder' })}
        />

        <CountrySelect value={countries} onChange={setCountries} closeOnSelect className="w-full" />

        <Button type="submit" className="w-full">{intl.formatMessage({ id: 'search.submit' })}</Button>
      </div>
    </form>
  )
}
