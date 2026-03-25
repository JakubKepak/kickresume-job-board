import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App'
import { ErrorFallback } from './components/ErrorFallback'
import { DEFAULT_LOCALE, messages } from './i18n/messages'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={DEFAULT_LOCALE} messages={messages[DEFAULT_LOCALE]}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
    </IntlProvider>
  </StrictMode>,
)
