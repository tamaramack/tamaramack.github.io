export type RoleKind = 'founder' | 'engineering' | 'community' | 'education'

export interface Role {
  kind: RoleKind
  organization: string
  title: string
  location?: string
  start?: string
  end?: string
  context?: string
  bullets: readonly string[]
}

export const EXPERIENCE: readonly Role[] = [
  {
    kind: 'founder',
    organization: 'HyperActivity LLC',
    title: 'Founder & Principal Architect',
    location: 'Portland, Oregon',
    start: 'Jul 2026',
    end: 'Present',
    bullets: [
      'Founded and lead an independent consultancy for architecture, engineering strategy, and delivery on modern software and AI-enabled products.',
      'Design agentic and human-centered AI interfaces with emphasis on transparency, user control, system state, approval workflows, and responsible automation.',
      'Lead advanced frontend architecture across interactive applications, design systems, browser-based media, real-time visualization, 3D, WebXR, and spatial computing.',
      'Build reusable engineering standards, delivery methods, and governance for AI-first work, and evaluate emerging tools for practical use rather than spectacle.'
    ]
  },
  {
    kind: 'engineering',
    organization: 'Nike',
    title: 'Senior Full-Stack Innovation Engineer',
    context: 'Technology Innovations Office — Sport Moment Experiences',
    bullets: [
      'Full-stack engineer, frontend and web services, for Global Technology’s Technology Innovations Office.',
      'Sport Moment Experiences: research, prototypes, demos, and first launches around events, promotional, and marketing releases.',
      'Immersive work across V/A/XR, dynamic 3D, and new approaches to data and design visualization.'
    ]
  },
  {
    kind: 'engineering',
    organization: 'Big Fish Games',
    title: 'Senior Software Engineer',
    bullets: [
      'Frontend and web services for the infrastructure that supports online gaming experiences.'
    ]
  },
  {
    kind: 'engineering',
    organization: 'Bittrex',
    title: 'Senior Software Development Engineer',
    bullets: [
      'Senior engineering on exchange product software.'
    ]
  },
  {
    kind: 'community',
    organization: 'Comcast TechWomen, Seattle Chapter',
    title: 'Lead',
    start: 'Jun 2015',
    end: 'May 2018',
    bullets: [
      'Chapter leadership for a community of technologists in Seattle.'
    ]
  },
  {
    kind: 'education',
    organization: 'University of North Texas',
    title: 'Undergraduate studies',
    bullets: []
  }
] as const
