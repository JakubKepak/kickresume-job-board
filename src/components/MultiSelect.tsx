import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useDropdown } from '../hooks/useDropdown'

// --- Types ---

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  overflowLabel?: (count: number) => string
  maxVisiblePills?: number
  closeOnSelect?: boolean
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

// --- Icons ---

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
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
  )
}

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={visible ? 'opacity-100' : 'opacity-0'}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

// --- Sub-components ---

function Pill({ label, onRemove }: { label: string; onRemove: (e: React.MouseEvent) => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-coral-light text-coral text-xs font-medium rounded-full pl-2.5 pr-1 py-0.5 whitespace-nowrap shrink-0">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-coral/10 cursor-pointer"
        aria-label={`Remove ${label}`}
        tabIndex={-1}
      >
        <CloseIcon />
      </button>
    </span>
  )
}

function OptionItem({
  option,
  index,
  isSelected,
  isHighlighted,
  onSelect,
  onHighlight,
}: {
  option: Option
  index: number
  isSelected: boolean
  isHighlighted: boolean
  onSelect: (value: string, e: React.MouseEvent) => void
  onHighlight: (index: number) => void
}) {
  return (
    <li
      role="option"
      aria-selected={isSelected}
      className={`flex items-center gap-2.5 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
        isHighlighted ? 'bg-coral-light' : ''
      } ${isSelected ? 'text-coral font-medium' : 'text-text-primary'}`}
      onMouseEnter={() => onHighlight(index)}
      onMouseDown={(e) => onSelect(option.value, e)}
    >
      <CheckIcon visible={isSelected} />
      {option.label}
    </li>
  )
}

// --- Main component ---

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  overflowLabel = (n) => `+${n} more`,
  maxVisiblePills = 2,
  closeOnSelect = false,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: MultiSelectProps) {
  const intl = useIntl()

  const {
    isOpen,
    search,
    highlightedIndex,
    setHighlightedIndex,
    toggleOpen,
    selectAndMaybeClose,
    updateSearch,
    getKeyAction,
    refs,
  } = useDropdown(closeOnSelect)

  const selectedSet = useMemo(() => new Set(value), [value])

  const filteredOptions = useMemo(() => {
    if (!search) return options
    const lower = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(lower))
  }, [options, search])

  const selectedLabels = useMemo(() => {
    const labelMap = new Map(options.map((o) => [o.value, o.label]))
    return value.map((v) => ({ value: v, label: labelMap.get(v) ?? v }))
  }, [value, options])

  function toggle(optionValue: string) {
    const next = selectedSet.has(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue]
    onChange(next)
    selectAndMaybeClose()
  }

  function handleOptionSelect(optionValue: string, e: React.MouseEvent) {
    e.preventDefault()
    toggle(optionValue)
  }

  function removePill(optionValue: string, e: React.MouseEvent) {
    e.stopPropagation()
    onChange(value.filter((v) => v !== optionValue))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const action = getKeyAction(e, filteredOptions.length)
    if (action === 'select' && filteredOptions[highlightedIndex]) {
      toggle(filteredOptions[highlightedIndex].value)
    }
  }

  const visiblePills = selectedLabels.slice(0, maxVisiblePills)
  const overflowCount = value.length - maxVisiblePills

  return (
    <div ref={refs.containerRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      {/* Trigger */}
      <div
        ref={refs.triggerRef}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        onClick={() => { if (!disabled) toggleOpen() }}
        className={`flex items-center gap-1.5 w-full bg-white text-text-primary text-sm font-medium py-2 pl-3 pr-9 rounded-lg border border-card-border focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral cursor-pointer min-h-10.5 text-left ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        {value.length === 0 ? (
          <span className="text-text-muted font-normal truncate">{placeholder}</span>
        ) : (
          <div className="flex items-center gap-1 overflow-hidden min-w-0">
            {visiblePills.map((item) => (
              <Pill key={item.value} label={item.label} onRemove={(e) => removePill(item.value, e)} />
            ))}
            {overflowCount > 0 && (
              <span className="text-xs text-text-secondary font-medium whitespace-nowrap shrink-0">
                {overflowLabel(overflowCount)}
              </span>
            )}
          </div>
        )}
      </div>

      <ChevronIcon open={isOpen} />

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-50 bg-white border border-card-border rounded-lg shadow-search overflow-hidden">
          <div className="px-3 py-2 border-b border-card-border">
            <input
              ref={refs.searchInputRef}
              type="text"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full text-sm bg-transparent border-none focus:outline-none text-text-primary placeholder:text-text-muted placeholder:font-normal"
              aria-label={searchPlaceholder}
            />
          </div>

          <ul
            ref={refs.listRef}
            role="listbox"
            aria-multiselectable="true"
            className="max-h-60 overflow-y-auto py-1"
          >
            {filteredOptions.length === 0 ? (
              <li role="presentation" className="px-4 py-2.5 text-sm text-text-muted text-center">
                {intl.formatMessage({ id: 'multiSelect.noResults' })}
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <OptionItem
                  key={option.value}
                  option={option}
                  index={index}
                  isSelected={selectedSet.has(option.value)}
                  isHighlighted={index === highlightedIndex}
                  onSelect={handleOptionSelect}
                  onHighlight={setHighlightedIndex}
                />
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
