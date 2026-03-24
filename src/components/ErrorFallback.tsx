import type { FallbackProps } from 'react-error-boundary'
import { ApiError } from '../api/client'
import { Button } from './Button'

function getErrorMessage(error: unknown): { title: string; description: string } {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return {
        title: 'Not found',
        description: 'The job you are looking for may have been removed or is no longer available.',
      }
    }
    if (error.status >= 500) {
      return {
        title: 'Server error',
        description: 'The server is having issues right now. Please try again in a moment.',
      }
    }
    return {
      title: 'Request failed',
      description: 'We could not load the data. Please check your connection and try again.',
    }
  }

  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return {
      title: 'Connection error',
      description: 'Unable to reach the server. Please check your internet connection.',
    }
  }

  return {
    title: 'Something went wrong',
    description: error instanceof Error ? error.message : 'An unexpected error occurred.',
  }
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { title, description } = getErrorMessage(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-50 p-8 text-center">
      <h2 className="text-lg font-semibold text-text-primary mb-2">
        {title}
      </h2>
      <p className="text-sm text-text-secondary mb-4 max-w-md">
        {description}
      </p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}

export default ErrorFallback
