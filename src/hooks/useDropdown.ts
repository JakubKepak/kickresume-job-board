import { useState, useRef, useEffect, useCallback } from 'react'

export function useDropdown(closeOnSelect = false) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const open = useCallback(() => setIsOpen(true), [])

  const close = useCallback(() => {
    setIsOpen(false)
    setSearch('')
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) setSearch('')
      return !prev
    })
  }, [])

  const updateSearch = useCallback((value: string) => {
    setSearch(value)
    setHighlightedIndex(0)
  }, [])

  const selectAndMaybeClose = useCallback(() => {
    if (closeOnSelect) {
      setIsOpen(false)
      setSearch('')
    }
  }, [closeOnSelect])

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus()
  }, [isOpen])

  // Scroll highlighted option into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return
    const item = listRef.current.children[highlightedIndex] as HTMLElement | undefined
    item?.scrollIntoView?.({ block: 'nearest' })
  }, [highlightedIndex, isOpen])

  // Returns 'select' when the consumer should toggle the highlighted option, null otherwise
  const getKeyAction = useCallback(
    (e: React.KeyboardEvent, filteredCount: number): 'select' | null => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault()
          open()
        }
        return null
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((i) => (i + 1) % filteredCount)
          return null
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((i) => (i - 1 + filteredCount) % filteredCount)
          return null
        case 'Enter':
          e.preventDefault()
          return 'select'
        case ' ':
          if (e.target === searchInputRef.current) return null
          e.preventDefault()
          return 'select'
        case 'Escape':
          e.preventDefault()
          close()
          triggerRef.current?.focus()
          return null
        default:
          return null
      }
    },
    [isOpen, open, close],
  )

  return {
    isOpen,
    search,
    highlightedIndex,
    setHighlightedIndex,
    toggleOpen,
    updateSearch,
    selectAndMaybeClose,
    getKeyAction,
    refs: { containerRef, searchInputRef, triggerRef, listRef },
  }
}
