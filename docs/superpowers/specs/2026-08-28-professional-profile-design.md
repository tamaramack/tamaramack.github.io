# Professional profile — design spec

Date: 2026-08-28
Site: `apps/portfolio` on https://tamaramack.github.io/

## Intent

This site is Tamara Mack’s public professional profile: **Founder & Principal Architect of HyperActivity LLC** and **Creative Technologist**. It is not a catalog of coding kata. Visitors should leave knowing who she is, what HyperActivity is, and how to reach her.

## Constraints (from public record only)

Do not invent clients, product claims, degree titles, or employment dates that are not public. Do not publish home or mailing addresses from business filings.

Grounded facts:

- Portland, Oregon
- Founder & Principal Architect, HyperActivity LLC (Jul 2026–present)
- HyperActivity is an independent AI-first consultancy: software architecture, intelligent UIs, agentic systems, frontend modernization, specialized engineering delivery
- Practice includes human-centered agentic interfaces (transparency, control, system state, approval, responsible automation), advanced frontend (interactive apps, design systems, browser media, real-time visualization, 3D, WebXR, spatial computing), and a longer-term professional guild of independent specialists
- Senior Full-Stack Innovation Engineer, Nike Technology Innovations Office / Sport Moment Experiences: V/A/XR, prototypes, demos, data and design visualization
- Senior Software Engineer, Big Fish Games (web services and frontend for online games)
- Senior Software Development Engineer, Bittrex
- Comcast TechWomen, Seattle Chapter, lead role, Jun 2015–May 2018
- University of North Texas
- LinkedIn: https://www.linkedin.com/in/likwidmack

## Approaches considered

1. **Brochure only (chosen)** — professional profile only; experiments and studies live at [likwidmack.com](https://likwidmack.com).
2. **Keep experiments as the homepage** — fails the new brief.
3. ~~**Professional primary, studio secondary**~~ — superseded; studio removed Aug 2026.

## Information architecture

| Path | Role |
| --- | --- |
| `/` | Positioning: founder + creative technologist |
| `/practice` | Capabilities |
| `/hyperactivity` | The firm |
| `/about` | Biography |
| `/about/resume` | Experience |

Primary nav: Practice, HyperActivity, About, Resume. External: likwidmack.com, LinkedIn.

## Voice

Precise, first person where it is a profile, firm “we/I” only when it is HyperActivity. No “works completed and explored.” No Vue CLI rebuild language on public pages.

## Visual direction

Nocturnal atelier: near-black field, copper/red activity accent, oversized athletic display type (Big Shoulders Display) with Newsreader body. Technical hairlines. Motion limited to a slow activity pulse on the mark. Not a purple SaaS landing page.

## Architecture (unchanged)

Nuxt 4 SSR, Nitro, TypeScript, Pug, SCSS. Content lives in `shared/` and is served through Nitro GET routes so GitHub Pages prerender and the Node server stay in sync.
