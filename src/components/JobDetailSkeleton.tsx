import { Skeleton } from './Skeleton'

export function JobDetailSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-card-border bg-card-bg drop-shadow-[var(--drop-shadow-card)] flex flex-col max-h-full">
      {/* Header area */}
      <div className="flex items-center gap-2.5 bg-card-header-bg px-8 pt-5 pb-5 rounded-t-3xl shrink-0">
        <Skeleton width="48px" height="48px" className="rounded-lg shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton height="14px" width="55%" />
          <Skeleton height="12px" width="35%" />
        </div>
        <Skeleton height="40px" width="90px" className="rounded-xl shrink-0" />
      </div>

      {/* Content area */}
      <div className="px-8 pb-6 pt-4 flex flex-col gap-4 rounded-b-3xl">
        {/* Salary */}
        <Skeleton height="16px" width="160px" />

        {/* Pills */}
        <div className="flex gap-2">
          <Skeleton height="26px" width="200px" className="rounded-full" />
          <Skeleton height="26px" width="80px" className="rounded-full" />
        </div>

        {/* Description lines */}
        <div className="flex flex-col gap-2.5">
          <Skeleton height="12px" width="100%" />
          <Skeleton height="12px" width="95%" />
          <Skeleton height="12px" width="88%" />
          <Skeleton height="12px" width="92%" />
          <Skeleton height="12px" width="70%" />
          <Skeleton height="12px" className="mt-2" width="100%" />
          <Skeleton height="12px" width="96%" />
          <Skeleton height="12px" width="85%" />
          <Skeleton height="12px" width="90%" />
          <Skeleton height="12px" width="60%" />
        </div>

        {/* Posted date */}
        <Skeleton height="10px" width="100px" className="mt-2" />
      </div>
    </div>
  )
}
