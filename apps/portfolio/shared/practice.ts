import { assertNever } from './assert-never'

export type PracticeSlug = 'architecture' | 'agentic' | 'immersive' | 'modernization' | 'guild'

export interface PracticeArea {
  slug: PracticeSlug
  title: string
  summary: string
}

export const PRACTICE_AREAS: readonly PracticeArea[] = [
  {
    slug: 'architecture',
    title: 'Software and UI architecture',
    summary: 'Requirements, scope, delivery strategy, staffing, milestones, and engineering standards for client work — before a line of product code hardens the wrong shape.'
  },
  {
    slug: 'agentic',
    title: 'Human-centered agentic systems',
    summary: 'Interfaces for automation that expose system state, keep approval in the loop, and treat user control as a design requirement, not a disclaimer.'
  },
  {
    slug: 'immersive',
    title: 'Immersive and spatial frontend',
    summary: 'Browser media, real-time visualization, 3D, WebXR, and spatial computing — the same discipline as product UI, with a different surface.'
  },
  {
    slug: 'modernization',
    title: 'Frontend modernization',
    summary: 'Interactive applications and design systems brought onto current architecture without discarding the product knowledge already in the code.'
  },
  {
    slug: 'guild',
    title: 'Independent specialist teams',
    summary: 'Project-specific groups of senior technologists, assembled without asking anyone to give up professional autonomy — the seed of HyperActivity’s guild model.'
  }
] as const

export function practiceLabel(slug: PracticeSlug): string {
  switch (slug) {
    case 'architecture':
      return '01'
    case 'agentic':
      return '02'
    case 'immersive':
      return '03'
    case 'modernization':
      return '04'
    case 'guild':
      return '05'
    default:
      return assertNever(slug)
  }
}
