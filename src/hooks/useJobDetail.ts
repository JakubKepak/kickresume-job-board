import { useQuery, skipToken } from '@tanstack/react-query'
import { fetchJobDetail } from '../api/endpoints'

const jobDetailKeys = {
  all: ['job-detail'] as const,
  detail: (id: string) => [...jobDetailKeys.all, id] as const,
}

export function useJobDetail(id: string | null) {
  return useQuery({
    queryKey: id ? jobDetailKeys.detail(id) : jobDetailKeys.all,
    queryFn: id ? () => fetchJobDetail(id) : skipToken,
  })
}
