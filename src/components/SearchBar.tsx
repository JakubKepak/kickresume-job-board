import { useState } from 'react'
import { Button } from './Button'
import { CountrySelect } from './CountrySelect'
import { SearchInput } from './SearchInput'
import { SearchIcon } from './icons/SearchIcon'

interface SearchBarProps {
  initialQuery: string
  initialCountry: string
  onSearch: (query: string, country: string) => void
}

export function SearchBar({ initialQuery, initialCountry, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialQuery)
  const [country, setCountry] = useState(initialCountry)

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(inputValue.trim(), country)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card-bg rounded-2xl border border-card-border shadow-search px-5.75 py-4.5"
    >
      {/* Desktop: horizontal row */}
      <div className="hidden md:flex items-center gap-2.5">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          icon={<SearchIcon />}
          placeholder="Job title, keyword, or company"
          className="flex-1"
        />

        <CountrySelect
          value={country}
          onChange={setCountry}
          className="min-w-40"
        />

        <Button type="submit">Search</Button>
      </div>

      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-2.5 md:hidden">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          onClear={handleClear}
          placeholder="Job title, keyword, or company"
        />

        <CountrySelect value={country} onChange={setCountry} className="w-full" />

        <Button type="submit" className="w-full">Search</Button>
      </div>
    </form>
  )
}
