import { useState, useCallback } from 'react'
import { SearchBar } from './components/SearchBar'
import { JobList } from './components/JobList'
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

        <SearchBar
          initialQuery={searchQuery}
          initialCountry={selectedCountry}
          onSearch={handleSearch}
        />

        <div className="mt-4 md:mt-6">
          {isDesktop ? (
            <div className="flex gap-6">
              <div className="w-job-list shrink-0 overflow-y-auto h-[calc(100vh-220px)]">
                <JobList {...jobListProps} />
              </div>
              <div className="flex-1 overflow-y-auto h-[calc(100vh-220px)]">
                <p className="text-text-secondary">
                  {selectedJobId
                    ? `Detail for ${selectedJobId}`
                    : 'Select a job to view details'}
                </p>
              </div>
            </div>
          ) : (
            <JobList {...jobListProps} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
