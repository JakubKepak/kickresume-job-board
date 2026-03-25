import type { FallbackProps } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { ApiError } from '../api/client'
import { Button } from './Button'

interface ErrorInfo {
  emoji: string
  titleId: string
  descriptionId: string
  buttonId: string
}

function getErrorInfo(error: unknown): ErrorInfo {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      return { emoji: '🕵️', titleId: 'error.404.title', descriptionId: 'error.404.description', buttonId: 'error.404.button' }
    }
    if (error.status >= 500) {
      return { emoji: '🔧', titleId: 'error.5xx.title', descriptionId: 'error.5xx.description', buttonId: 'error.5xx.button' }
    }
    return { emoji: '📡', titleId: 'error.api.title', descriptionId: 'error.api.description', buttonId: 'error.api.button' }
  }

  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return { emoji: '🌐', titleId: 'error.network.title', descriptionId: 'error.network.description', buttonId: 'error.network.button' }
  }

  return { emoji: '🤔', titleId: 'error.unknown.title', descriptionId: 'error.unknown.description', buttonId: 'error.unknown.button' }
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const intl = useIntl()
  const { emoji, titleId, descriptionId, buttonId } = getErrorInfo(error)

  return (
    <div className="flex flex-col items-center justify-center min-h-50 p-8 text-center">
      <span className="text-4xl mb-3" role="img" aria-hidden="true">
        {emoji}
      </span>
      <h2 className="text-lg font-semibold text-text-primary mb-1">
        {intl.formatMessage({ id: titleId })}
      </h2>
      <p className="text-sm text-text-secondary mb-5 max-w-sm leading-relaxed">
        {intl.formatMessage({ id: descriptionId })}
      </p>
      <Button variant="primary" onClick={resetErrorBoundary}>
        {intl.formatMessage({ id: buttonId })}
      </Button>
    </div>
  )
}

