export type ProjectSlug = 'colors' | 'substring' | 'rover' | 'playground'

export type ProjectStatus = 'live' | 'in-progress' | 'archive'

export interface Project {
  slug: ProjectSlug
  title: string
  href: string
  summary: string
  status: ProjectStatus
}

export const PROJECTS: readonly Project[] = [
  {
    slug: 'colors',
    title: 'Colors',
    href: '/colors',
    summary: 'Studio study: color models, conversions, and interactive swatches.',
    status: 'in-progress'
  },
  {
    slug: 'substring',
    title: 'Substring',
    href: '/substring',
    summary: 'Studio study: string algorithms, mapping, and large-input readers.',
    status: 'in-progress'
  },
  {
    slug: 'rover',
    title: 'Search',
    href: '/rover',
    summary: 'Studio study: faceted search UI and live listing filters.',
    status: 'archive'
  },
  {
    slug: 'playground',
    title: 'Playground',
    href: '/playground',
    summary: 'Studio study: layout, justification, and pattern experiments.',
    status: 'live'
  }
] as const
