import { ErrorBoundary } from 'react-error-boundary'
import { useFormattedJobDetail } from '../hooks/useFormattedJobDetail'
import { JobCardHeader } from './JobCardHeader'
import { Pill } from './Pill'
import { Button } from './Button'
import { LocationIcon } from './icons/LocationIcon'
import { BuildingIcon } from './icons/BuildingIcon'
import ErrorFallback from './ErrorFallback'
import LoadingSpinner from './LoadingSpinner'

interface JobDetailProps {
  jobId: string
}

function JobDetailContent({ jobId }: JobDetailProps) {
  const { data: job, formatted, isPending, isError, error, refetch } = useFormattedJobDetail(jobId)

  if (isPending) {
    return <LoadingSpinner size="lg" className="py-12" />
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
            Apply
          </Button>
        }
      />

      <div className="px-8 pb-6 pt-4 flex flex-col gap-4 rounded-b-3xl overflow-y-auto">
        <div className="flex flex-col gap-2">
          {formatted.salary && (
            <p className="text-sm font-medium text-text-primary">{formatted.salary}</p>
          )}
          <div className="flex flex-wrap gap-2">
            {formatted.location && (
              <Pill icon={<LocationIcon />}>{formatted.location}</Pill>
            )}
            {formatted.workArrangement && (
              <Pill icon={<BuildingIcon />}>{formatted.workArrangement}</Pill>
            )}
          </div>
        </div>

        <div
          className="text-sm text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description_html }}
        />

        <p className="text-xs text-text-muted">
          {formatted.postedDate}
        </p>
      </div>
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
