import { describe, expect, it } from 'vitest'

async function expectActiveLockBlocked(mode: 'build' | 'dev', expectedMessage: RegExp) {
  const { evaluateExistingLock } = await import('../../scripts/next-runtime-guard.mjs')

  const result = evaluateExistingLock(
    mode,
    { mode: 'dev', pid: 4242, startedAt: '2026-05-05T17:00:00.000Z' },
    () => true,
  )

  expect(result.status).toBe('blocked')
  expect(result.message).toMatch(expectedMessage)
}

describe('next runtime guard', () => {
  it('flags a tampered next cli file before spawning the process', async () => {
    const { inspectNextCliScript } = await import('../../scripts/next-runtime-guard.mjs')

    const result = inspectNextCliScript(
      'dev',
      "/* branded */\n#!/usr/bin/env node\nconsole.log('broken')\n",
      'V:/class-sentra/class-prototype/ferdiiskandar/node_modules/next/dist/cli/next-dev.js',
    )

    expect(result.status).toBe('invalid')
    expect(result.message).toMatch(/reinstall dependencies/i)
    expect(result.message).toMatch(/next-dev\.js/i)
  })

  it('blocks build when a dev lock is active', async () => {
    await expectActiveLockBlocked('build', /cannot run next build while next dev is active/i)
  })

  it('treats stale locks as removable', async () => {
    const { evaluateExistingLock } = await import('../../scripts/next-runtime-guard.mjs')

    const result = evaluateExistingLock(
      'dev',
      { mode: 'build', pid: 4242, startedAt: '2026-05-05T17:00:00.000Z' },
      () => false,
    )

    expect(result.status).toBe('stale')
  })

  it('blocks a second dev process against the same .next workspace', async () => {
    await expectActiveLockBlocked('dev', /next dev is already active/i)
  })

  it('resolves a cross-platform next invocation without spawning next.cmd directly', async () => {
    const { resolveNextInvocation } = await import('../../scripts/next-runtime-guard.mjs')

    const result = resolveNextInvocation()

    expect(result.command).toBe(process.execPath)
    expect(result.args[0]).toMatch(/next[\\/]dist[\\/]bin[\\/]next$/)
  })
})
