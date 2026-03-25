import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JobList } from './JobList'
import { createJobSummary } from '../test/fixtures'

const defaultProps = {
  jobs: [
    createJobSummary({ id: '1', title: 'Frontend Developer' }),
    createJobSummary({ id: '2', title: 'Backend Developer' }),
  ],
  totalCount: 1732,
  isPending: false,
  isError: false,
  error: null,
  hasNextPage: true,
  isFetchingNextPage: false,
  fetchNextPage: vi.fn(),
  refetch: vi.fn(),
  selectedJobId: null,
  onSelectJob: vi.fn(),
}

describe('JobList', () => {
  it('renders job cards', () => {
    render(<JobList {...defaultProps} />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
  })

  it('renders formatted total count', () => {
    render(<JobList {...defaultProps} />)
    expect(screen.getByText('1,732 search results')).toBeInTheDocument()
  })

  it('shows loading spinner when isPending', () => {
    render(<JobList {...defaultProps} isPending={true} />)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('shows error fallback when isError', () => {
    render(
      <JobList
        {...defaultProps}
        isError={true}
        error={new Error('Network error')}
      />,
    )
    expect(screen.getByText("Well, that wasn't supposed to happen")).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('shows empty state when no jobs and not loading', () => {
    render(<JobList {...defaultProps} jobs={[]} totalCount={0} />)
    expect(screen.getByText('No jobs found. Try a different search.')).toBeInTheDocument()
  })

  it('shows "No more results" when hasNextPage is false', () => {
    render(<JobList {...defaultProps} hasNextPage={false} />)
    expect(screen.getByText('No more results')).toBeInTheDocument()
  })

  it('shows loading spinner when fetching next page', () => {
    render(<JobList {...defaultProps} isFetchingNextPage={true} />)
    const spinners = screen.getAllByLabelText('Loading')
    expect(spinners.length).toBeGreaterThanOrEqual(1)
  })
})
