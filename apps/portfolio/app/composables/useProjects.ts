import type { Project } from '#shared/projects'

export function useProjects() {
  return useFetch<Project[]>('/api/projects', {
    default: () => []
  })
}
