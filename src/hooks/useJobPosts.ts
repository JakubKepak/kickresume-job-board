import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchJobPosts } from '../api/endpoints'

const LIMIT = 20

const jobPostKeys = {
  all: ['job-posts'] as const,
  list: (q: string, countries: string[]) =>
    [...jobPostKeys.all, 'list', { q, countries }] as const,
}

function parseOffsetFromUrl(url: string | null): number | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    const offset = Number(parsed.searchParams.get('offset'))
    return Number.isFinite(offset) ? offset : null
  } catch {
    return null
  }
}

export function useJobPosts(q: string, countries: string[]) {
  return useInfiniteQuery({
    queryKey: jobPostKeys.list(q, countries),
    queryFn: ({ pageParam }) =>
      fetchJobPosts({ q: q || undefined, countries: countries.length > 0 ? countries : undefined, limit: LIMIT, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => parseOffsetFromUrl(lastPage.next),
  })
}
