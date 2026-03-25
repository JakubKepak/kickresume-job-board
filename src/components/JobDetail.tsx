import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { useFormattedJobDetail } from '../hooks/useFormattedJobDetail'
import { JobCardHeader } from './JobCardHeader'
import { JobDetailBody } from './JobDetailBody'
import { Button } from './Button'
import { JobDetailSkeleton } from './JobDetailSkeleton'
import { ErrorFallback } from './ErrorFallback'

interface JobDetailProps {
  jobId: string
}

function JobDetailContent({ jobId }: JobDetailProps) {
  const intl = useIntl()
  const { data: job, formatted, isPending, isError, error, refetch } = useFormattedJobDetail(jobId)

  if (isPending) {
    return <JobDetailSkeleton />
  }

  if (isError || !job || !formatted) {
    return (
      <div className="py-8">
        <ErrorFallback error={error ?? new Error('Unknown error')} resetErrorBoundary={() => refetch()} />
      </div>
    )
  }

  return (
    <div className="rounded-3xl border-2 border-card-border bg-card-bg drop-shadow-[var(--drop-shadow-card)] flex flex-col max-h-full">
      <JobCardHeader
        title={job.title}
        organization={job.organization}
        logoUrl={job.organization_logo}
        className="rounded-t-3xl shrink-0"
        action={
          <Button
            variant="secondary"
            onClick={() => window.open(job.url, '_blank', 'noopener,noreferrer')}
          >
            {intl.formatMessage({ id: 'jobDetail.apply' })}
          </Button>
        }
      />

      <JobDetailBody
        salary={formatted.salary}
        location={formatted.location}
        workArrangement={formatted.workArrangement}
        descriptionHtml={job.description_html}
        postedDate={formatted.postedDate}
        className="px-8 pb-6 pt-4 rounded-b-3xl overflow-y-auto"
      />
    </div>
  )
}

export function JobDetail({ jobId }: JobDetailProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <JobDetailContent jobId={jobId} />
    </ErrorBoundary>
  )
}
