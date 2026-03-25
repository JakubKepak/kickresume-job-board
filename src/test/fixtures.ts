import type { JobPostSummary, JobPostDetail, PaginatedJobPosts } from '../schemas/api'

export function createJobSummary(overrides?: Partial<JobPostSummary>): JobPostSummary {
  return {
    id: '1',
    title: 'Frontend Developer',
    organization: 'Acme Corp',
    organization_logo: 'https://example.com/logo.png',
    date_posted: new Date().toISOString(),
    locations_derived: ['New York, NY, United States'],
    ai_work_arrangement: 'remote',
    ai_salary_minvalue: '80000.00',
    ai_salary_maxvalue: '120000.00',
    ai_salary_currency: 'USD',
    ai_salary_unittext: 'year',
    url: 'https://example.com/apply',
    ...overrides,
  }
}

export function createJobDetail(overrides?: Partial<JobPostDetail>): JobPostDetail {
  return {
    ...createJobSummary(),
    description_html: '<p>We are looking for a talented developer to join our team.</p>',
    ...overrides,
  }
}

export function createPaginatedResponse(
  jobs: JobPostSummary[],
  overrides?: Partial<PaginatedJobPosts>,
): PaginatedJobPosts {
  return {
    count: jobs.length,
    max_results: 10000,
    next: null,
    previous: null,
    results: jobs,
    ...overrides,
  }
}
