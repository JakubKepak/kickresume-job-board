import type { FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 mb-4 max-w-md">
        {error instanceof Error ? error.message : 'An unexpected error occurred'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral-dark transition-colors"
      >
        Try again
      </button>
    </div>
  )
}

export default ErrorFallback
