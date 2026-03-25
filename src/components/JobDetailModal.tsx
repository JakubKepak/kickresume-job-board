import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useIntl } from 'react-intl'
import { ErrorBoundary } from 'react-error-boundary'
import { useFormattedJobDetail } from '../hooks/useFormattedJobDetail'
import { JobCardHeader } from './JobCardHeader'
import { JobDetailBody } from './JobDetailBody'
import { Button } from './Button'
import ErrorFallback from './ErrorFallback'
import LoadingSpinner from './LoadingSpinner'

interface JobDetailModalProps {
  jobId: string
  onClose: () => void
}

function ModalContent({ jobId, onClose }: JobDetailModalProps) {
  const intl = useIntl()
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

        <JobDetailBody
          salary={formatted.salary}
          location={formatted.location}
          workArrangement={formatted.workArrangement}
          descriptionHtml={job.description_html}
          className="px-6 py-5 pb-24"
        />
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex gap-2.5 backdrop-blur-lg [background:var(--gradient-bottom-bar)]"
      >
        <Button variant="outline" onClick={onClose} className="w-1/3">
          {intl.formatMessage({ id: 'jobDetail.back' })}
        </Button>
        <Button
          variant="secondary"
          onClick={() => window.open(job.url, '_blank', 'noopener,noreferrer')}
          className="w-2/3"
        >
          {intl.formatMessage({ id: 'jobDetail.applyNow' })}
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
