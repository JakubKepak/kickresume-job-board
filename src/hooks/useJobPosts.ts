import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchJobPosts } from '../api/endpoints'

const LIMIT = 20

const jobPostKeys = {
  all: ['job-posts'] as const,
  list: (q: string, country: string) =>
    [...jobPostKeys.all, 'list', { q, country }] as const,
}

function parseOffsetFromUrl(url: string | null): number | null {
  if (!url) return null
  const parsed = new URL(url)
  const offset = parsed.searchParams.get('offset')
  return offset ? Number(offset) : null
}

export function useJobPosts(q: string, country: string) {
  return useInfiniteQuery({
    queryKey: jobPostKeys.list(q, country),
    queryFn: ({ pageParam }) =>
      fetchJobPosts({ q: q || undefined, country: country || undefined, limit: LIMIT, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => parseOffsetFromUrl(lastPage.next),
  })
}
