import { Skeleton } from './Skeleton'

export function JobCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-card-border bg-card-bg">
      {/* Header area */}
      <div className="flex items-center gap-2.5 bg-card-header-bg px-8 pt-5 pb-5 rounded-t-3xl">
        <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton height="14px" width="60%" />
          <Skeleton height="12px" width="40%" />
        </div>
      </div>

      {/* Content area */}
      <div className="px-8 pt-3 pb-4">
        <div className="flex gap-2 mb-3">
          <Skeleton height="26px" width="180px" className="rounded-full" />
          <Skeleton height="26px" width="80px" className="rounded-full" />
        </div>
        <Skeleton height="12px" width="120px" />
      </div>
    </div>
  )
}

export function JobListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
    </div>
  )
}
