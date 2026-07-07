import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const DEFAULT_AUDIT_LEVEL = 'moderate'

export function findWorkspaceRoot(startDir) {
  let currentDir = path.resolve(startDir)

  while (true) {
    if (fs.existsSync(path.join(currentDir, 'pnpm-lock.yaml'))) {
      return currentDir
    }

    const parentDir = path.dirname(currentDir)

    if (parentDir === currentDir) {
      return null
    }

    currentDir = parentDir
  }
}

export function toAuditProjectPath(projectDir, workspaceRoot) {
  return path.relative(workspaceRoot, projectDir).split(path.sep).join('\\')
}

export function advisoryAffectsProject(advisory, auditProjectPath) {
  return advisory.findings?.some((finding) =>
    finding.paths?.some(
      (findingPath) =>
        findingPath.startsWith(`${auditProjectPath} >`) || findingPath === auditProjectPath,
    ),
  )
}

export function collectRelevantAdvisories(report, auditProjectPath) {
  return Object.values(report.advisories ?? {}).filter((advisory) =>
    advisoryAffectsProject(advisory, auditProjectPath),
  )
}

function summarizeBySeverity(advisories) {
  return advisories.reduce((summary, advisory) => {
    const severity = advisory.severity ?? 'unknown'
    summary[severity] = (summary[severity] ?? 0) + 1
    return summary
  }, {})
}

function formatSummary(summary) {
  return Object.entries(summary)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([severity, count]) => `${severity}:${count}`)
    .join(', ')
}

function run() {
  const workspaceRoot = findWorkspaceRoot(process.cwd())

  if (!workspaceRoot) {
    console.error(
      'Unable to find pnpm-lock.yaml in this project ancestry. security:deps requires a pnpm workspace root.',
    )
    process.exit(1)
  }

  const auditLevelArg =
    process.argv.slice(2).find((arg) => arg.startsWith('--audit-level=')) ??
    `--audit-level=${DEFAULT_AUDIT_LEVEL}`
  const auditResult = spawnSync('pnpm', ['audit', '--json', '--ignore-workspace', auditLevelArg], {
    cwd: workspaceRoot,
    encoding: 'utf8',
    shell: true,
  })

  if (!auditResult.stdout?.trim()) {
    console.error(auditResult.stderr?.trim() || 'pnpm audit did not return JSON output.')
    process.exit(auditResult.status ?? 1)
  }

  let report

  try {
    report = JSON.parse(auditResult.stdout)
  } catch (error) {
    console.error('Failed to parse pnpm audit JSON output.')
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }

  const auditProjectPath = toAuditProjectPath(process.cwd(), workspaceRoot)
  const relevantAdvisories = collectRelevantAdvisories(report, auditProjectPath)

  if (relevantAdvisories.length === 0) {
    console.log(
      `No pnpm audit advisories at or above ${auditLevelArg.split('=')[1]} affect ${auditProjectPath}.`,
    )
    process.exit(0)
  }

  console.error(`Found ${relevantAdvisories.length} advisories affecting ${auditProjectPath}.`)
  console.error(`Severity summary: ${formatSummary(summarizeBySeverity(relevantAdvisories))}`)

  for (const advisory of relevantAdvisories) {
    const affectedPaths = advisory.findings.flatMap((finding) =>
      finding.paths.filter(
        (findingPath) =>
          findingPath.startsWith(`${auditProjectPath} >`) || findingPath === auditProjectPath,
      ),
    )

    console.error('')
    console.error(`[${advisory.severity}] ${advisory.module_name}: ${advisory.title}`)
    console.error(`Patched: ${advisory.patched_versions}`)
    console.error(`More info: ${advisory.url}`)
    console.error(`Affected paths: ${affectedPaths.join('; ')}`)
  }

  process.exit(1)
}

const entryUrl = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null

if (entryUrl === import.meta.url) {
  run()
}
