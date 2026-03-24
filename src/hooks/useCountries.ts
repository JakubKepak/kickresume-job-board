import { useQuery } from '@tanstack/react-query'
import { fetchCountries } from '../api/endpoints'

const countryKeys = {
  all: ['countries'] as const,
}

export function useCountries() {
  return useQuery({
    queryKey: countryKeys.all,
    queryFn: fetchCountries,
    staleTime: Infinity,
    select: (data) => data.countries,
  })
}
