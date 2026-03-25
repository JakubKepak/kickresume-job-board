import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { renderWithProviders, screen, waitFor } from '../test/utils'
import { server } from '../test/server'
import { JobDetail } from './JobDetail'

describe('JobDetail', () => {
  it('renders job detail after fetching', async () => {
    renderWithProviders(<JobDetail jobId="1" />)

    await waitFor(() => {
      expect(screen.getByText('Job 1')).toBeInTheDocument()
      expect(screen.getByText('Test Org')).toBeInTheDocument()
    })
  })

  it('shows loading spinner while fetching', () => {
    renderWithProviders(<JobDetail jobId="1" />)
    expect(screen.getByLabelText('Loading')).toBeInTheDocument()
  })

  it('renders description HTML', async () => {
    renderWithProviders(<JobDetail jobId="1" />)

    await waitFor(() => {
      expect(
        screen.getByText('We are looking for a talented developer to join our team.'),
      ).toBeInTheDocument()
    })
  })

  it('renders Apply button', async () => {
    renderWithProviders(<JobDetail jobId="1" />)

    await waitFor(() => {
      expect(screen.getByText('Apply')).toBeInTheDocument()
    })
  })

  it('renders salary when available', async () => {
    renderWithProviders(<JobDetail jobId="1" />)

    await waitFor(() => {
      expect(screen.getByText('$80,000 - $120,000')).toBeInTheDocument()
    })
  })

  it('shows error fallback on server error', async () => {
    server.use(
      http.get('https://test1.kickresume.com/api/job-posts/:id/', () => {
        return HttpResponse.json({ error: 'Server error' }, { status: 500 })
      }),
    )

    renderWithProviders(<JobDetail jobId="1" />)

    await waitFor(() => {
      expect(screen.getByText('Our servers are taking a coffee break')).toBeInTheDocument()
      expect(screen.getByText('Try again')).toBeInTheDocument()
    })
  })
})
