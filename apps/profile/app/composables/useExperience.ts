import type { Role } from '#shared/experience'

export function useExperience() {
  return useFetch<Role[]>('/api/experience', {
    default: () => []
  })
}
