import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useFormattedJobDetail } from '../hooks/useFormattedJobDetail'
import { JobCardHeader } from './JobCardHeader'
import { Button } from './Button'
import { LocationIcon } from './icons/LocationIcon'
import { BriefcaseIcon } from './icons/BriefcaseIcon'
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
    <div className="fixed inset-0 z-50">
      <div className="h-full overflow-y-auto bg-white">
        <JobCardHeader
          title={job.title}
          organization={job.organization}
          logoUrl={job.organization_logo}
        />

        <div className="px-6 py-5 flex flex-col gap-4 pb-24">
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
                <BriefcaseIcon size={14} />
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

      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 flex gap-2.5 backdrop-blur-lg"
        style={{ background: 'linear-gradient(to bottom, rgba(244, 247, 248, 0.7), rgba(255, 255, 255, 0.85))' }}
      >
        <Button variant="outline" onClick={onClose} className="w-1/3">
          Back
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.open(job.url, '_blank', 'noopener,noreferrer')}
          className="w-2/3"
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
