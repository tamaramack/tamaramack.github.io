export interface Organization {
  name: string
  legalName: string
  founded: string
  summary: string
}

export interface Profile {
  name: string
  shortName: string
  location: string
  headline: string
  lede: string
  linkedIn: string
  personalSite: string
  site: string
  repository: string
  portfolioSource: string
  portfolioRepo: string
  organization: Organization
}

export const PROFILE: Profile = {
  name: 'Tamara Mack',
  shortName: 'Tamara Mack',
  location: 'Portland, Oregon',
  headline: 'Founder of HyperActivity. Creative Technologist.',
  lede: 'I founded and lead HyperActivity, an independent practice for software architecture, intelligent interfaces, and technical delivery. The through-line is craft: systems that stay legible to the people who use them, even when the stack is agentic, immersive, or both.',
  linkedIn: 'https://www.linkedin.com/in/likwidmack',
  personalSite: 'https://likwidmack.com',
  site: 'https://tamaramack.github.io/',
  repository: 'https://github.com/tamaramack/tamaramack.github.io',
  portfolioSource: 'https://github.com/tamaramack/tamaramack.github.io/tree/development/apps/portfolio',
  portfolioRepo: 'https://github.com/likwidmack/portfolio',
  organization: {
    name: 'HyperActivity',
    legalName: 'HyperActivity LLC',
    founded: '2026',
    summary: 'An AI-first technology consultancy for software architecture, intelligent user interfaces, agentic systems, frontend modernization, and specialized engineering delivery.'
  }
}
