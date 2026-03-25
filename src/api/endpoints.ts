import { apiGet } from './client'
import {
  countriesResponseSchema,
  jobPostDetailSchema,
  paginatedJobPostsSchema,
  type CountriesResponse,
  type JobPostDetail,
  type PaginatedJobPosts,
} from '../schemas/api'

export async function fetchCountries(): Promise<CountriesResponse> {
  const data = await apiGet<unknown>('/job-post-countries/')
  return countriesResponseSchema.parse(data)
}

interface FetchJobPostsParams {
  q?: string
  countries?: string[]
  limit?: number
  offset?: number
}

export async function fetchJobPosts({
  q,
  countries,
  limit = 20,
  offset = 0,
}: FetchJobPostsParams = {}): Promise<PaginatedJobPosts> {
  const params: Record<string, string | string[]> = {
    limit: String(limit),
    offset: String(offset),
  }

  if (q) params.q = q
  if (countries && countries.length > 0) params.country = countries

  const data = await apiGet<unknown>('/job-posts/', params)
  return paginatedJobPostsSchema.parse(data)
}

export async function fetchJobDetail(id: string): Promise<JobPostDetail> {
  const data = await apiGet<unknown>(`/job-posts/${id}/`)
  return jobPostDetailSchema.parse(data)
}
