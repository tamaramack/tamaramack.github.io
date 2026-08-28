import type { Profile } from '#shared/profile'

export function useProfile() {
  return useFetch<Profile>('/api/profile')
}
