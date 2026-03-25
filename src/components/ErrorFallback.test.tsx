import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorFallback from './ErrorFallback'
import { ApiError } from '../api/client'

describe('ErrorFallback', () => {
  it('shows vanished message for 404 ApiError', () => {
    render(
      <ErrorFallback
        error={new ApiError('Not found', 404)}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Job vanished into thin air')).toBeInTheDocument()
  })

  it('shows coffee break message for 500+ ApiError', () => {
    render(
      <ErrorFallback
        error={new ApiError('Internal Server Error', 500)}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Our servers are taking a coffee break')).toBeInTheDocument()
  })

  it('shows internet wilderness message for network TypeError', () => {
    render(
      <ErrorFallback
        error={new TypeError('Failed to fetch')}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText('Lost in the internet wilderness')).toBeInTheDocument()
  })

  it('shows generic message for unknown errors', () => {
    render(
      <ErrorFallback
        error={new Error('Something unexpected')}
        resetErrorBoundary={() => {}}
      />,
    )
    expect(screen.getByText("Well, that wasn't supposed to happen")).toBeInTheDocument()
  })

  it('calls resetErrorBoundary on button click', async () => {
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
