export function assertNever(value: never, message = 'Unhandled union member'): never {
  throw new Error(`${message}: ${String(value)}`)
}
