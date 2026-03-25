import { useIntl } from 'react-intl'
import { useJobDetail } from './useJobDetail'
import { formatSalary, formatRelativeDate, formatWorkArrangement } from '../utils/format'

export function useFormattedJobDetail(jobId: string | null) {
  const intl = useIntl()
  const query = useJobDetail(jobId)
  const { data: job } = query

  const formatted = job
    ? {
        salary: formatSalary(
          intl,
          job.ai_salary_minvalue,
          job.ai_salary_maxvalue,
          job.ai_salary_currency,
          job.ai_salary_unittext,
        ),
        workArrangement: formatWorkArrangement(intl, job.ai_work_arrangement),
        location: job.locations_derived?.[0] ?? null,
        postedDate: formatRelativeDate(intl, job.date_posted),
      }
    : null

  return { ...query, formatted }
}
