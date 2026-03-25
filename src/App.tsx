import { useState, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { SearchBar } from './components/SearchBar'
import { JobList } from './components/JobList'
import { JobDetail } from './components/JobDetail'
import { JobDetailModal } from './components/JobDetailModal'
import { useIsDesktop } from './hooks/useMediaQuery'
import { useJobPosts } from './hooks/useJobPosts'

export function App() {
  const intl = useIntl()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const isDesktop = useIsDesktop()

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useJobPosts(searchQuery, selectedCountries)

  const allJobs = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data])
  const totalCount = data?.pages[0]?.count ?? 0

  const handleSearch = useCallback((query: string, countries: string[]) => {
    setSearchQuery(query)
    setSelectedCountries(countries)
    setSelectedJobId(null)
  }, [])

  const handleSelectJob = useCallback((id: string) => {
    setSelectedJobId(id)
  }, [])

  const pageTitle = searchQuery
    ? intl.formatMessage({ id: 'app.pageTitle.withQuery' }, { query: searchQuery })
    : intl.formatMessage({ id: 'app.pageTitle.default' })

  const jobListProps = {
    jobs: allJobs,
    totalCount,
    isPending,
    isError,
    error,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    selectedJobId,
    onSelectJob: handleSelectJob,
  }

  return (
    <div className="min-h-screen bg-page-bg">
      <div className="mx-auto max-w-container px-4 md:px-6">
        <header className="pt-6 md:pt-8">
          <h1 className="font-display text-2xl md:text-4xl font-normal text-text-primary">
            {pageTitle}
          </h1>
        </header>

        <div className="sticky top-0 z-20 pt-6 pb-4 md:pb-6">
          <SearchBar
            initialQuery={searchQuery}
            initialCountries={selectedCountries}
            onSearch={handleSearch}
          />
        </div>

        {isDesktop ? (
          <div className="flex gap-6 items-start">
            <div className="w-job-list shrink-0">
              <JobList {...jobListProps} />
            </div>
            <div className="flex-1 min-w-0 sticky top-sticky-top pb-4 h-[calc(100dvh-var(--spacing-sticky-top)-var(--spacing-detail-offset))]">
              {selectedJobId ? (
                <JobDetail jobId={selectedJobId} />
              ) : (
                <p className="text-sm text-text-muted text-center py-12">
                  {intl.formatMessage({ id: 'app.detail.placeholder' })}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <JobList {...jobListProps} />
            {selectedJobId && (
              <JobDetailModal
                jobId={selectedJobId}
                onClose={() => setSelectedJobId(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

