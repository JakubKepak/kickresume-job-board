import { useState } from 'react'

interface JobCardHeaderProps {
  title: string
  organization: string
  logoUrl: string | null
  className?: string
}

export function JobCardHeader({
  title,
  organization,
  logoUrl,
  className = '',
}: JobCardHeaderProps) {
  const [logoError, setLogoError] = useState(false)

  return (
    <div
      className={`flex items-center gap-2.5 bg-card-header-bg px-8 pt-5 pb-5 ${className}`}
    >
      <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
        {logoUrl && !logoError ? (
          <img
            src={logoUrl}
            alt={`${organization} logo`}
            className="h-full w-full object-cover"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="text-white text-lg font-semibold">
            {organization.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-text-primary truncate">
          {title}
        </h3>
        <p className="text-sm text-text-secondary truncate">{organization}</p>
      </div>
    </div>
  )
}
