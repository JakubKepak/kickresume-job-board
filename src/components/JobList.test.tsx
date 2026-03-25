import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders, screen } from '../test/utils'
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
    renderWithProviders(<JobList {...defaultProps} />)
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument()
    expect(screen.getByText('Backend Developer')).toBeInTheDocument()
  })

  it('renders formatted total count', () => {
    renderWithProviders(<JobList {...defaultProps} />)
    expect(screen.getByText('1,732 search results')).toBeInTheDocument()
  })

  it('shows skeleton when isPending', () => {
    renderWithProviders(<JobList {...defaultProps} isPending={true} />)
    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('shows error fallback when isError', () => {
    renderWithProviders(
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
    renderWithProviders(<JobList {...defaultProps} jobs={[]} totalCount={0} />)
    expect(screen.getByText('No jobs found. Try a different search.')).toBeInTheDocument()
  })

  it('shows "No more results" when hasNextPage is false', () => {
    renderWithProviders(<JobList {...defaultProps} hasNextPage={false} />)
    expect(screen.getByText('No more results')).toBeInTheDocument()
  })

  it('shows loading spinner when fetching next page', () => {
    renderWithProviders(<JobList {...defaultProps} isFetchingNextPage={true} />)
    const spinners = screen.getAllByLabelText('Loading')
    expect(spinners.length).toBeGreaterThanOrEqual(1)
  })
})
