import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const LOCK_FILE = path.join(process.cwd(), '.next-runtime-lock.json')
const NEXT_CLI_SCRIPT_BY_MODE = {
  dev: 'next-dev.js',
  build: 'next-build.js',
}

export function evaluateExistingLock(requestedMode, existingLock, isProcessRunning) {
  if (!existingLock || typeof existingLock !== 'object') {
    return { status: 'clear' }
  }

  if (typeof existingLock.pid !== 'number' || !Number.isInteger(existingLock.pid)) {
    return { status: 'stale' }
  }

  if (!isProcessRunning(existingLock.pid)) {
    return { status: 'stale' }
  }

  if (existingLock.mode === requestedMode) {
    return {
      status: 'blocked',
      message: `next ${requestedMode} is already active on PID ${existingLock.pid}. Stop the existing process before starting another one because both would write into the same .next workspace.`,
    }
  }

  return {
    status: 'blocked',
    message: `Cannot run next ${requestedMode} while next ${existingLock.mode} is active on PID ${existingLock.pid}. Both commands share the same .next artifacts and can corrupt the runtime output.`,
  }
}

function isProcessRunning(pid) {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function readLock() {
  if (!fs.existsSync(LOCK_FILE)) {
    return null
  }

  try {
    return JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'))
  } catch {
    return null
  }
}

function writeLock(mode) {
  fs.writeFileSync(
    LOCK_FILE,
    JSON.stringify(
      {
        mode,
        pid: process.pid,
        startedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf8',
  )
}

function removeLockIfOwned() {
  const lock = readLock()

  if (lock?.pid === process.pid && fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE)
  }
}

export function resolveNextInvocation() {
  return {
    command: process.execPath,
    args: [path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')],
  }
}

export function resolveNextCliScriptPath(mode, cwd = process.cwd()) {
  return path.join(cwd, 'node_modules', 'next', 'dist', 'cli', NEXT_CLI_SCRIPT_BY_MODE[mode])
}

export function inspectNextCliScript(mode, sourceText, filePath) {
  const expectedShebang = '#!/usr/bin/env node'

  if (typeof sourceText !== 'string' || !sourceText.startsWith(expectedShebang)) {
    return {
      status: 'invalid',
      message: `Detected a modified Next.js CLI file at ${filePath}. Reinstall dependencies because the file must start with "${expectedShebang}" and should not contain custom content before the shebang.`,
    }
  }

  return { status: 'ok' }
}

function ensureHealthyNextCli(mode) {
  const cliScriptPath = resolveNextCliScriptPath(mode)

  if (!fs.existsSync(cliScriptPath)) {
    console.error(
      `Missing Next.js CLI file at ${cliScriptPath}. Reinstall dependencies and try again.`,
    )
    process.exit(1)
  }

  const inspection = inspectNextCliScript(
    mode,
    fs.readFileSync(cliScriptPath, 'utf8'),
    cliScriptPath,
  )

  if (inspection.status === 'invalid') {
    console.error(inspection.message)
    process.exit(1)
  }
}

function run() {
  const mode = process.argv[2]
  const extraArgs = process.argv.slice(3)

  if (mode !== 'dev' && mode !== 'build') {
    console.error('Usage: node scripts/next-runtime-guard.mjs <dev|build> [...args]')
    process.exit(1)
  }

  ensureHealthyNextCli(mode)

  const currentLock = readLock()
  const evaluation = evaluateExistingLock(mode, currentLock, isProcessRunning)

  if (evaluation.status === 'stale' && fs.existsSync(LOCK_FILE)) {
    fs.unlinkSync(LOCK_FILE)
  }

  if (evaluation.status === 'blocked') {
    console.error(evaluation.message)
    process.exit(1)
  }

  writeLock(mode)

  const invocation = resolveNextInvocation()
  const child = spawn(invocation.command, [...invocation.args, mode, ...extraArgs], {
    stdio: 'inherit',
  })

  const cleanup = () => {
    removeLockIfOwned()
  }

  process.on('SIGINT', () => {
    child.kill('SIGINT')
    cleanup()
    process.exit(130)
  })

  process.on('SIGTERM', () => {
    child.kill('SIGTERM')
    cleanup()
    process.exit(143)
  })

  child.on('exit', (code, signal) => {
    cleanup()

    if (signal) {
      process.kill(process.pid, signal)
      return
    }

    process.exit(code ?? 0)
  })
}

const entryUrl = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null

if (entryUrl === import.meta.url) {
  run()
}
