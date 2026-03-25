import type { ReactNode } from 'react'
import { Pill } from './Pill'
import { LocationIcon } from './icons/LocationIcon'
import { BriefcaseIcon } from './icons/BriefcaseIcon'

interface JobDetailBodyProps {
  salary: string | null
  location: string | null
  workArrangement: string | null
  descriptionHtml: string
  postedDate?: string
  className?: string
  children?: ReactNode
}

export function JobDetailBody({
  salary,
  location,
  workArrangement,
  descriptionHtml,
  postedDate,
  className = '',
  children,
}: JobDetailBodyProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-col gap-2">
        {salary && (
          <p className="text-sm font-medium text-text-primary">{salary}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {location && (
            <Pill icon={<LocationIcon />}>{location}</Pill>
          )}
          {workArrangement && (
            <Pill icon={<BriefcaseIcon />}>{workArrangement}</Pill>
          )}
        </div>
      </div>

      <div
        className="text-sm text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {postedDate && (
        <p className="text-xs text-text-muted">{postedDate}</p>
      )}

      {children}
    </div>
  )
}
