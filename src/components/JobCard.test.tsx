import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JobCard } from './JobCard'
import { createJobSummary } from '../test/fixtures'

describe('JobCard', () => {
  const defaultJob = createJobSummary()

  it('renders title and organization', () => {
    render(<JobCard job={defaultJob} isSelected={false} onSelect={() => {}} />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
  })

  it('renders location pill', () => {
    render(<JobCard job={defaultJob} isSelected={false} onSelect={() => {}} />)
    expect(screen.getByText('New York, NY, United States')).toBeInTheDocument()
  })

  it('renders work arrangement pill', () => {
    render(<JobCard job={defaultJob} isSelected={false} onSelect={() => {}} />)
    expect(screen.getByText('Remote')).toBeInTheDocument()
  })

  it('calls onSelect with job id on click', async () => {
    const onSelect = vi.fn()
    render(<JobCard job={defaultJob} isSelected={false} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onSelect).toHaveBeenCalledWith('1')
  })

  it('calls onSelect on Enter key press', async () => {
    const onSelect = vi.fn()
    render(<JobCard job={defaultJob} isSelected={false} onSelect={onSelect} />)
    screen.getByRole('button').focus()
    await userEvent.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith('1')
  })

  it('calls onSelect on Space key press', async () => {
    const onSelect = vi.fn()
    render(<JobCard job={defaultJob} isSelected={false} onSelect={onSelect} />)
    screen.getByRole('button').focus()
    await userEvent.keyboard(' ')
    expect(onSelect).toHaveBeenCalledWith('1')
  })

  it('applies selected border when isSelected is true', () => {
    render(<JobCard job={defaultJob} isSelected={true} onSelect={() => {}} />)
    const card = screen.getByRole('button')
    expect(card.className).toContain('border-coral')
  })

  it('does not render location pill when locations_derived is null', () => {
    const job = createJobSummary({ locations_derived: null })
    render(<JobCard job={job} isSelected={false} onSelect={() => {}} />)
    expect(screen.queryByText('New York, NY, United States')).not.toBeInTheDocument()
  })

  it('does not render work arrangement pill when null', () => {
    const job = createJobSummary({ ai_work_arrangement: null })
    render(<JobCard job={job} isSelected={false} onSelect={() => {}} />)
    expect(screen.queryByText('Remote')).not.toBeInTheDocument()
  })
})
