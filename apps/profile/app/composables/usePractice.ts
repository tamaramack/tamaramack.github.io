import type { PracticeArea } from '#shared/practice'

export function usePractice() {
  return useFetch<PracticeArea[]>('/api/practice', {
    default: () => []
  })
}
