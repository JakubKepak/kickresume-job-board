import { z } from 'zod/v4'

// --- Countries ---

export const countriesResponseSchema = z.object({
  countries: z.array(z.string()),
})

export type CountriesResponse = z.infer<typeof countriesResponseSchema>

// --- Job Post (list item) ---

const workArrangement = z.enum(['on-site', 'hybrid', 'remote']).nullable()

export const jobPostSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  organization_logo: z.string().nullable(),
  date_posted: z.string(),
  locations_derived: z.array(z.string()).nullable(),
  ai_work_arrangement: workArrangement,
  ai_salary_minvalue: z.string().nullable(),
  ai_salary_maxvalue: z.string().nullable(),
  ai_salary_currency: z.string().nullable(),
  ai_salary_unittext: z.string().nullable(),
  url: z.string(),
})

export type JobPostSummary = z.infer<typeof jobPostSummarySchema>

// --- Job Post Detail ---

export const jobPostDetailSchema = jobPostSummarySchema.extend({
  description_html: z.string(),
})

export type JobPostDetail = z.infer<typeof jobPostDetailSchema>

// --- Paginated Response ---

export const paginatedJobPostsSchema = z.object({
  count: z.number(),
  max_results: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(jobPostSummarySchema),
})

export type PaginatedJobPosts = z.infer<typeof paginatedJobPostsSchema>
