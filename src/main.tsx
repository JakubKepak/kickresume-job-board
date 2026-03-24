import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App'
import ErrorFallback from './components/ErrorFallback'
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
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)
