import { http, HttpResponse } from 'msw'
import { createJobSummary, createJobDetail, createPaginatedResponse } from './fixtures'

const BASE_URL = 'https://test1.kickresume.com/api'

const defaultJobs = [
  createJobSummary({ id: '1', title: 'Frontend Developer', organization: 'Acme Corp' }),
  createJobSummary({ id: '2', title: 'Backend Developer', organization: 'Beta Inc' }),
  createJobSummary({ id: '3', title: 'DevOps Engineer', organization: 'Gamma Ltd' }),
]

export const handlers = [
  http.get(`${BASE_URL}/job-post-countries/`, () => {
    return HttpResponse.json({
      countries: ['Canada', 'Germany', 'United States'],
    })
  }),

  http.get(`${BASE_URL}/job-posts/`, ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    const country = url.searchParams.get('country')

    let results = defaultJobs

    if (q) {
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(q.toLowerCase()) ||
          job.organization.toLowerCase().includes(q.toLowerCase()),
      )
    }

    if (country) {
      results = results.filter((job) =>
        job.locations_derived?.some((loc) => loc.includes(country)),
      )
    }

    return HttpResponse.json(createPaginatedResponse(results))
  }),

  http.get(`${BASE_URL}/job-posts/:id/`, ({ params }) => {
    const { id } = params
    if (id === 'not-found') {
      return HttpResponse.json({ detail: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(
      createJobDetail({ id: id as string, title: `Job ${id}`, organization: 'Test Org' }),
    )
  }),
]
