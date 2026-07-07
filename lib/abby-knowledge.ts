import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()

const CONTENT_FILES = [
  'conversation-style.md',
  'personal-profile.md',
  'professional-journey.md',
  'speaking-profile.md',
  'thought-leadership.md',
  'projects-and-works.md',
  'media-kit.md',
  'contact-and-collaboration.md',
  'public-boundaries.md',
  'faq.md',
  'response-examples.md',
  'qa-test-set.md',
]

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

export const ABBY_SYSTEM_PROMPT = readFile(
  path.join(cwd, 'src', 'prompts', 'abby.system-prompt.md'),
)

export const ABBY_KNOWLEDGE = CONTENT_FILES.map((file) => {
  const content = readFile(path.join(cwd, 'content', 'abby', file))
  return content ? `=== ${file} ===\n\n${content}` : ''
})
  .filter(Boolean)
  .join('\n\n---\n\n')
