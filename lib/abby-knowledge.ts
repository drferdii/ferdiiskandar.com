import 'server-only'
import fs from 'node:fs'
import path from 'node:path'

import knowledgeIndex from '@/src/config/abby.knowledge-index.json'

const cwd = process.cwd()
const CONTENT_ROOT = path.join(cwd, 'content', 'abby')
const PRIORITY_WEIGHT = { critical: 4, high: 3, medium: 2, low: 1 } as const
const MAX_CHARS_PER_CHUNK = 1800
const DEFAULT_MAX_CONTEXT_CHARS = 20000

export type KnowledgePriority = keyof typeof PRIORITY_WEIGHT

type RawEntry = {
  id: string
  path: string
  priority: KnowledgePriority
  always_include?: boolean
  tags?: string[]
  aliases?: string[]
  medical_safe_only?: boolean
}

export type RetrievalMetadata = {
  selectedDocumentIds: string[]
  chunkCount: number
  contextSize: number
}

type Chunk = {
  id: string
  documentId: string
  title: string
  heading: string
  content: string
  priority: KnowledgePriority
  alwaysInclude: boolean
  aliases: string[]
  tags: string[]
  terms: Map<string, number>
}

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

export const ABBY_SYSTEM_PROMPT = readFile(path.join(cwd, 'src', 'prompts', 'abby.system-prompt.md'))

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length >= 2)
}

function termMap(value: string): Map<string, number> {
  const map = new Map<string, number>()
  for (const term of tokenize(value)) map.set(term, (map.get(term) ?? 0) + 1)
  return map
}

function resolveSafePath(relativePath: string): string {
  const normalized = relativePath.replace(/^\/+/, '').replace(/^content[\\/]abby[\\/]/, '')
  const resolved = path.resolve(CONTENT_ROOT, normalized)
  const root = path.resolve(CONTENT_ROOT)
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error(`Unsafe Abby knowledge path: ${relativePath}`)
  }
  if (!fs.existsSync(resolved)) throw new Error(`Missing Abby knowledge file: ${relativePath}`)
  return resolved
}

function validateEntries(): RawEntry[] {
  const seen = new Set<string>()
  const entries = (knowledgeIndex.knowledge_files as RawEntry[]).map((entry) => {
    if (seen.has(entry.id)) throw new Error(`Duplicate Abby knowledge id: ${entry.id}`)
    seen.add(entry.id)
    if (!(entry.priority in PRIORITY_WEIGHT)) throw new Error(`Invalid Abby knowledge priority: ${entry.priority}`)
    resolveSafePath(entry.path)
    return entry
  })
  return entries
}

function splitMarkdown(content: string): Array<{ heading: string; content: string }> {
  const sections: Array<{ heading: string; content: string }> = []
  const lines = content.split(/\r?\n/)
  let heading = 'Overview'
  let buffer: string[] = []

  function flush() {
    const text = buffer.join('\n').trim()
    if (!text) return
    for (let i = 0; i < text.length; i += MAX_CHARS_PER_CHUNK) {
      sections.push({ heading, content: text.slice(i, i + MAX_CHARS_PER_CHUNK).trim() })
    }
  }

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.+)$/.exec(line)
    if (match) {
      flush()
      heading = match[2]?.trim() ?? 'Section'
      buffer = [line]
    } else {
      buffer.push(line)
    }
  }
  flush()
  return sections
}

const entries = validateEntries()
const chunks: Chunk[] = entries.flatMap((entry) => {
  const filePath = resolveSafePath(entry.path)
  const content = readFile(filePath)
  const title = path.basename(entry.path)
  return splitMarkdown(content).map((section, index) => {
    const weightedText = `${title} ${section.heading} ${(entry.aliases ?? []).join(' ')} ${(entry.tags ?? []).join(' ')} ${section.content}`
    return {
      id: `${entry.id}:${index}`,
      documentId: entry.id,
      title,
      heading: section.heading,
      content: section.content,
      priority: entry.priority,
      alwaysInclude: entry.always_include === true,
      aliases: entry.aliases ?? [],
      tags: entry.tags ?? [],
      terms: termMap(weightedText),
    }
  })
})

const documentFrequency = new Map<string, number>()
for (const chunk of chunks) {
  for (const term of chunk.terms.keys()) documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1)
}

function scoreChunk(chunk: Chunk, query: string, queryTerms: string[]): number {
  let score = chunk.alwaysInclude ? 100 : 0
  const priorityBoost = PRIORITY_WEIGHT[chunk.priority]
  const corpusSize = chunks.length || 1
  for (const term of queryTerms) {
    const tf = chunk.terms.get(term) ?? 0
    if (!tf) continue
    const df = documentFrequency.get(term) ?? 1
    score += (tf * Math.log(1 + corpusSize / df)) * priorityBoost
  }
  const lower = query.toLowerCase()
  for (const alias of chunk.aliases) {
    if (alias && lower.includes(alias.toLowerCase())) score += 8 * priorityBoost
  }
  if (lower.includes(chunk.heading.toLowerCase())) score += 6
  return score
}

export function buildAbbyKnowledgeContext({
  message,
  visitorMode,
  history = [],
  maxContextChars = DEFAULT_MAX_CONTEXT_CHARS,
}: {
  message: string
  visitorMode?: string
  history?: Array<{ role: string; content: string }>
  maxContextChars?: number
}): { context: string; metadata: RetrievalMetadata } {
  const query = [visitorMode, ...history.slice(-4).map((h) => h.content), message].filter(Boolean).join('\n')
  const terms = tokenize(query)
  const scored = chunks.map((chunk) => ({ chunk, score: scoreChunk(chunk, query, terms) }))

  const renderChunk = (chunk: Chunk) => `=== ${chunk.documentId} / ${chunk.heading} ===\n${chunk.content}`

  const selected: Chunk[] = []
  const seen = new Set<string>()
  let total = 0

  // Always-include chunks are added in FULL regardless of budget so that
  // safety/governance documents are never partially dropped.
  for (const { chunk, score } of scored
    .filter((item) => item.chunk.alwaysInclude)
    .sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id))) {
    if (seen.has(chunk.id)) continue
    seen.add(chunk.id)
    selected.push(chunk)
    total += renderChunk(chunk).length
  }

  // Ranked non-always-include chunks fill the remaining budget.
  for (const { chunk } of scored
    .filter((item) => !item.chunk.alwaysInclude && item.score > 0)
    .sort((a, b) => b.score - a.score || a.chunk.id.localeCompare(b.chunk.id))) {
    if (seen.has(chunk.id)) continue
    const rendered = renderChunk(chunk)
    if (total + rendered.length > maxContextChars) continue
    seen.add(chunk.id)
    selected.push(chunk)
    total += rendered.length
    if (total >= maxContextChars) break
  }


  const context = selected
    .map((chunk) => `=== ${chunk.documentId} / ${chunk.heading} ===\n${chunk.content}`)
    .join('\n\n---\n\n')

  return {
    context,
    metadata: {
      selectedDocumentIds: [...new Set(selected.map((chunk) => chunk.documentId))],
      chunkCount: selected.length,
      contextSize: context.length,
    },
  }
}

export const ABBY_KNOWLEDGE = 'ABBY_KNOWLEDGE_FULL_CORPUS_DEPRECATED_USE_buildAbbyKnowledgeContext'
