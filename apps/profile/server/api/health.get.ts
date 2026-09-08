export default defineEventHandler(() => {
  return {
    ok: true as const,
    service: 'portfolio',
    rendering: 'nitro'
  }
})
