import { useState, useCallback } from 'react'
import { SearchBar } from './components/SearchBar'
import { JobList } from './components/JobList'
import { JobDetail } from './components/JobDetail'
import { JobDetailModal } from './components/JobDetailModal'
import { useIsDesktop } from './hooks/useMediaQuery'
import { useJobPosts } from './hooks/useJobPosts'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
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
  } = useJobPosts(searchQuery, selectedCountry)

  const allJobs = data?.pages.flatMap((page) => page.results) ?? []
  const totalCount = data?.pages[0]?.count ?? 0

  const handleSearch = useCallback((query: string, country: string) => {
    setSearchQuery(query)
    setSelectedCountry(country)
    setSelectedJobId(null)
  }, [])

  const handleSelectJob = useCallback((id: string) => {
    setSelectedJobId(id)
  }, [])

  const pageTitle = searchQuery
    ? `Results for ${searchQuery} jobs`
    : 'Job Search'

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
        <header className="pt-6 pb-4 md:pt-8 md:pb-6">
          <h1 className="font-display text-2xl md:text-4xl font-normal text-text-primary">
            {pageTitle}
          </h1>
        </header>

        <div className="sticky top-0 z-20 pt-4 pb-4 md:pt-6 md:pb-6">
          <SearchBar
            initialQuery={searchQuery}
            initialCountry={selectedCountry}
            onSearch={handleSearch}
          />
        </div>

        {isDesktop ? (
          <div className="flex gap-6 items-start">
            <div className="w-job-list shrink-0">
              <JobList {...jobListProps} />
            </div>
            <div className="flex-1 min-w-0 sticky top-sticky-top">
              {selectedJobId ? (
                <JobDetail jobId={selectedJobId} />
              ) : (
                <p className="text-sm text-text-muted text-center py-12">
                  Select a job to view details
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

export default App
