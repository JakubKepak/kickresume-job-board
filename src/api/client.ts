const BASE_URL = 'https://test1.kickresume.com/api'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | string[]>,
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          url.searchParams.append(key, v)
        }
      } else if (value) {
        url.searchParams.set(key, value)
      }
    }
  }

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new ApiError(
      `API request failed: ${response.statusText}`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}
