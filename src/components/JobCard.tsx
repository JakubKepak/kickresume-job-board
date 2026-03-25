import { useIntl } from 'react-intl'
import type { JobPostSummary } from '../schemas/api'
import { formatRelativeDate, formatWorkArrangement } from '../utils/format'
import { JobCardHeader } from './JobCardHeader'
import { Pill } from './Pill'
import { LocationIcon } from './icons/LocationIcon'
import { BriefcaseIcon } from './icons/BriefcaseIcon'

interface JobCardProps {
  job: JobPostSummary
  isSelected: boolean
  onSelect: (id: string) => void
}

export function JobCard({ job, isSelected, onSelect }: JobCardProps) {
  const intl = useIntl()
  const workArrangement = formatWorkArrangement(intl, job.ai_work_arrangement)
  const location = job.locations_derived?.[0] ?? null

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(job.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(job.id)
        }
      }}
      className={`rounded-3xl border-2 bg-card-bg cursor-pointer transition-colors ${
        isSelected
          ? 'border-coral'
          : 'border-card-border hover:border-gray-300'
      }`}
    >
      <JobCardHeader
        title={job.title}
        organization={job.organization}
        logoUrl={job.organization_logo}
        className="rounded-t-3xl"
      />

      <div className="px-8 pt-3 pb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {location && (
            <Pill icon={<LocationIcon />}>{location}</Pill>
          )}
          {workArrangement && (
            <Pill icon={<BriefcaseIcon />}>{workArrangement}</Pill>
          )}
        </div>

        <p className="text-xs text-text-muted">
          {formatRelativeDate(intl, job.date_posted)}
        </p>
      </div>
    </article>
  )
}
