import { useJobDetail } from './useJobDetail'
import { formatSalary, formatRelativeDate, formatWorkArrangement } from '../utils/format'

export function useFormattedJobDetail(jobId: string | null) {
  const query = useJobDetail(jobId)
  const { data: job } = query

  const formatted = job
    ? {
        salary: formatSalary(
          job.ai_salary_minvalue,
          job.ai_salary_maxvalue,
          job.ai_salary_currency,
          job.ai_salary_unittext,
        ),
        workArrangement: formatWorkArrangement(job.ai_work_arrangement),
        location: job.locations_derived[0] ?? null,
        postedDate: formatRelativeDate(job.date_posted),
      }
    : null

  return { ...query, formatted }
}
