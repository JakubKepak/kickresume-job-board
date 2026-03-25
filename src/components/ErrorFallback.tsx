import type { FallbackProps } from 'react-error-boundary'
import { ApiError } from '../api/client'
import { Button } from './Button'

function getErrorMessage(error: unknown): { emoji: string; title: string; description: string; buttonText: string } {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return {
        emoji: '🕵️',
        title: 'Job vanished into thin air',
        description: 'This job listing pulled a disappearing act. It may have been filled or removed.',
        buttonText: 'Back to search',
      }
    }
    if (error.status >= 500) {
      return {
        emoji: '🔧',
        title: 'Our servers are taking a coffee break',
        description: 'They should be back shortly. In the meantime, maybe perfect your resume?',
        buttonText: 'Try again',
      }
    }
    return {
      emoji: '📡',
      title: 'Houston, we have a problem',
      description: 'Something went wrong fetching the data. Check your connection and give it another shot.',
      buttonText: 'Retry',
    }
  }

  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return {
      emoji: '🌐',
      title: 'Lost in the internet wilderness',
      description: 'We can\'t reach the server. Make sure you\'re connected to the internet and try again.',
      buttonText: 'Reconnect',
    }
  }

  return {
    emoji: '🤔',
    title: 'Well, that wasn\'t supposed to happen',
    description: 'Something unexpected went wrong. Our bad — give it another try.',
    buttonText: 'Try again',
  }
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { emoji, title, description, buttonText } = getErrorMessage(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-50 p-8 text-center">
      <span className="text-4xl mb-3" role="img" aria-hidden="true">
        {emoji}
      </span>
      <h2 className="text-lg font-semibold text-text-primary mb-1">
        {title}
      </h2>
      <p className="text-sm text-text-secondary mb-5 max-w-sm leading-relaxed">
        {description}
      </p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        {buttonText}
      </Button>
    </div>
  )
}

export default ErrorFallback
