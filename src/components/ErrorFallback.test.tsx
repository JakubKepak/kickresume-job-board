import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorFallback from './ErrorFallback'
import { ApiError } from '../api/client'

describe('ErrorFallback', () => {
  it('shows "Not found" for 404 ApiError', () => {
    render(
      <ErrorFallback
        error={new ApiError('Not found', 404)}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Not found')).toBeInTheDocument()
  })

  it('shows "Server error" for 500+ ApiError', () => {
    render(
      <ErrorFallback
        error={new ApiError('Internal Server Error', 500)}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Server error')).toBeInTheDocument()
  })

  it('shows "Connection error" for network TypeError', () => {
    render(
      <ErrorFallback
        error={new TypeError('Failed to fetch')}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Connection error')).toBeInTheDocument()
  })

  it('shows generic message for unknown errors', () => {
    render(
      <ErrorFallback
        error={new Error('Something unexpected')}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Something unexpected')).toBeInTheDocument()
  })

  it('calls resetErrorBoundary on "Try again" click', async () => {
    const reset = vi.fn()
    render(
      <ErrorFallback
        error={new Error('fail')}
        resetErrorBoundary={reset}
      />,
    )
    await userEvent.click(screen.getByText('Try again'))
    expect(reset).toHaveBeenCalledOnce()
  })
})
