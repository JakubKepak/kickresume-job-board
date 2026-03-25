import { useRef, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { ErrorBoundary } from 'react-error-boundary'
import type { JobPostSummary } from '../schemas/api'
import { JobCard } from './JobCard'
import { JobListSkeleton } from './JobCardSkeleton'
import ErrorFallback from './ErrorFallback'
import LoadingSpinner from './LoadingSpinner'

interface JobListProps {
  jobs: JobPostSummary[]
  totalCount: number
  isPending: boolean
  isError: boolean
  error: Error | null
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  refetch: () => void
  selectedJobId: string | null
  onSelectJob: (id: string) => void
}

export function JobList({
  jobs,
  totalCount,
  isPending,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  refetch,
  selectedJobId,
  onSelectJob,
}: JobListProps) {
  const intl = useIntl()
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isPending) {
    return <JobListSkeleton />
  }

  if (isError) {
    return (
      <div className="py-8">
        <ErrorFallback error={error ?? new Error('Unknown error')} resetErrorBoundary={refetch} />
      </div>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <p className="text-sm text-text-secondary mb-4">
        {intl.formatMessage({ id: 'jobList.resultCount' }, { count: totalCount })}
      </p>

      <div className="flex flex-col gap-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={job.id === selectedJobId}
            onSelect={onSelectJob}
          />
        ))}
      </div>

      <div ref={sentinelRef} className="h-4" />

      {isFetchingNextPage && (
        <LoadingSpinner size="sm" className="py-4" />
      )}

      {!hasNextPage && jobs.length > 0 && (
        <p className="text-xs text-text-muted text-center py-4">
          {intl.formatMessage({ id: 'jobList.noMore' })}
        </p>
      )}

      {jobs.length === 0 && (
        <p className="text-sm text-text-secondary text-center py-12">
          {intl.formatMessage({ id: 'jobList.empty' })}
        </p>
      )}
    </ErrorBoundary>
  )
}
