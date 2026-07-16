import fs from 'node:fs'
import path from 'node:path'

import { criticalStaticAssets } from '@/lib/asset-manifest'

describe('critical static asset manifest', () => {
  it('points only to files that exist under public with exact casing', () => {
    for (const assetPath of criticalStaticAssets) {
      expect(assetPath.startsWith('/')).toBe(true)
      expect(assetPath.includes('..')).toBe(false)
      const segments = assetPath.slice(1).split('/')
      let current = path.join(process.cwd(), 'public')
      for (const segment of segments) {
        const entries = fs.readdirSync(current)
        expect(entries, `${assetPath} segment ${segment} must match exact case`).toContain(segment)
        current = path.join(current, segment)
      }
      expect(fs.statSync(current).isFile()).toBe(true)
    }
  })
})
