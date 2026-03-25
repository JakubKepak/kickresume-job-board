import { describe, it, expect, vi } from 'vitest'
import { within } from '@testing-library/react'
import { renderWithProviders, screen, userEvent, waitFor } from '../test/utils'
import { SearchBar } from './SearchBar'

// SearchBar renders both desktop and mobile layouts (CSS-hidden in real browser).
// JSDOM doesn't apply CSS, so both are in the DOM. Scope to desktop container.
function getDesktopContainer() {
  const el = document.querySelector('[class*="md:flex"]') as HTMLElement
  return within(el)
}

describe('SearchBar', () => {
  it('renders input, country select, and search button', async () => {
    renderWithProviders(
      <SearchBar initialQuery="" initialCountries={[]} onSearch={() => {}} />,
    )
    const desktop = getDesktopContainer()
    expect(desktop.getByPlaceholderText('Job title, keyword, or company')).toBeInTheDocument()
    expect(desktop.getByRole('button', { name: /search/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(desktop.getByLabelText('Filter by country')).toBeInTheDocument()
    })
  })

  it('populates country dropdown from API', async () => {
    renderWithProviders(
      <SearchBar initialQuery="" initialCountries={[]} onSearch={() => {}} />,
    )
    const desktop = getDesktopContainer()

    // Wait for countries to load, then open the dropdown
    await waitFor(() => {
      expect(desktop.getByLabelText('Filter by country')).toBeInTheDocument()
    })
    await userEvent.click(desktop.getByLabelText('Filter by country'))

    await waitFor(() => {
      expect(desktop.getByText('United States')).toBeInTheDocument()
      expect(desktop.getByText('Canada')).toBeInTheDocument()
      expect(desktop.getByText('Germany')).toBeInTheDocument()
    })
  })

  it('calls onSearch with query and country on submit', async () => {
    const onSearch = vi.fn()
    renderWithProviders(
      <SearchBar initialQuery="" initialCountries={[]} onSearch={onSearch} />,
    )
    const desktop = getDesktopContainer()

    await userEvent.type(
      desktop.getByPlaceholderText('Job title, keyword, or company'),
      'React Developer',
    )
    await userEvent.click(desktop.getByRole('button', { name: /search/i }))

    expect(onSearch).toHaveBeenCalledWith('React Developer', [])
  })

  it('trims whitespace from query', async () => {
    const onSearch = vi.fn()
    renderWithProviders(
      <SearchBar initialQuery="" initialCountries={[]} onSearch={onSearch} />,
    )
    const desktop = getDesktopContainer()

    await userEvent.type(
      desktop.getByPlaceholderText('Job title, keyword, or company'),
      '  React  ',
    )
    await userEvent.click(desktop.getByRole('button', { name: /search/i }))

    expect(onSearch).toHaveBeenCalledWith('React', [])
  })

  it('renders with initial values', () => {
    renderWithProviders(
      <SearchBar initialQuery="Developer" initialCountries={['Canada']} onSearch={() => {}} />,
    )
    const desktop = getDesktopContainer()
    expect(desktop.getByPlaceholderText('Job title, keyword, or company')).toHaveValue('Developer')
  })

  it('mobile layout shows clear button when input has value', () => {
    renderWithProviders(
      <SearchBar initialQuery="test" initialCountries={[]} onSearch={() => {}} />,
    )
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  it('mobile clear button empties input', async () => {
    renderWithProviders(
      <SearchBar initialQuery="test" initialCountries={[]} onSearch={() => {}} />,
    )
    await userEvent.click(screen.getByLabelText('Clear search'))

    const inputs = screen.getAllByPlaceholderText('Job title, keyword, or company')
    // Both inputs should be empty after clear (state is shared)
    inputs.forEach((input) => expect(input).toHaveValue(''))
  })
})
