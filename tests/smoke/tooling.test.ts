import { describe, expect, it } from 'vitest'

describe('tooling baseline', () => {
  it('runs vitest in a browser-like environment', () => {
    const main = document.createElement('main')

    expect(main.tagName).toBe('MAIN')
  })
})
