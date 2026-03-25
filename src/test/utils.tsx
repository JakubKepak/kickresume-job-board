import { type ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '../components/ErrorFallback'
import { DEFAULT_LOCALE, messages } from '../i18n/messages'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const queryClient = createTestQueryClient()

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <IntlProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </QueryClientProvider>
      </IntlProvider>
    )
  }

  return { ...render(ui, { wrapper: Wrapper, ...options }), queryClient }
}

export { screen, waitFor, within } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
