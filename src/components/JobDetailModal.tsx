import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useFormattedJobDetail } from '../hooks/useFormattedJobDetail'
import { JobCardHeader } from './JobCardHeader'
import { Button } from './Button'
import { LocationIcon } from './icons/LocationIcon'
import { BuildingIcon } from './icons/BuildingIcon'
import ErrorFallback from './ErrorFallback'
import LoadingSpinner from './LoadingSpinner'

interface JobDetailModalProps {
  jobId: string
  onClose: () => void
}

function ModalContent({ jobId, onClose }: JobDetailModalProps) {
  const { data: job, formatted, isPending, isError, error, refetch } = useFormattedJobDetail(jobId)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (isPending) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !job || !formatted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
        <ErrorFallback error={error ?? new Error('Unknown error')} resetErrorBoundary={() => refetch()} />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <JobCardHeader
          title={job.title}
          organization={job.organization}
          logoUrl={job.organization_logo}
        />

        <div className="px-6 py-5 flex flex-col gap-4">
          {formatted.salary && (
            <p className="text-sm font-medium text-text-primary">{formatted.salary}</p>
          )}

          <div className="flex flex-col gap-1.5">
            {formatted.location && (
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <LocationIcon size={14} />
                {formatted.location}
              </div>
            )}
            {formatted.workArrangement && (
              <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                <BuildingIcon size={14} />
                {formatted.workArrangement}
              </div>
            )}
          </div>

          <div
            className="text-sm text-text-secondary leading-relaxed"
            dangerouslySetInnerHTML={{ __html: job.description_html }}
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-card-border px-6 py-4 flex gap-3">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => window.open(job.url, '_blank', 'noopener,noreferrer')}
          className="flex-1"
        >
          Apply Now
        </Button>
      </div>
    </div>
  )
}

export function JobDetailModal({ jobId, onClose }: JobDetailModalProps) {
  return createPortal(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ModalContent jobId={jobId} onClose={onClose} />
    </ErrorBoundary>,
    document.body,
  )
}
