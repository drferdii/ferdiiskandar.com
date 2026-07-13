import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const ABBY_CONTENT_DIR = path.join(cwd, 'content', 'abby')
const DISEASES_DIR = path.join(ABBY_CONTENT_DIR, '06-Medical-Knowledge', 'Diseases')

const CONTENT_FILES = [
  'conversation-style.md',
  'personal-profile.md',
  'professional-journey.md',
  'speaking-profile.md',
  'thought-leadership.md',
  'projects-and-works.md',
  'founder-narrative-pages.md',
  'media-kit.md',
  'contact-and-collaboration.md',
  'public-boundaries.md',
  'faq.md',
  'response-examples.md',
  'qa-test-set.md',
  'Dr-Ferdi-Overview.md',
  'Dr-Ferdi-Narrative.md',
  'The-Outsiders-Gambit.md',
  'RSIA-Melinda-Kediri.md',
  '02-Environment/Kediri-Hiburan.md',
  '02-Environment/Sentra-Healthcare.md',
  '06-Medical-Knowledge/README.md',
  '06-Medical-Knowledge/Clinical-Usage-Guide.md',
  '06-Medical-Knowledge/Coding-and-Epidemiology.md',
  '06-Medical-Knowledge/Data-Normalization-Notes.md',
  '06-Medical-Knowledge/Disease-Library.md',
  '06-Medical-Knowledge/Disease-System-Index.md',
  '06-Medical-Knowledge/Drug-Library.md',
  '06-Medical-Knowledge/Diseases/README.md',
  '07-Medical-NLP-Corpus/README.md',
  '07-Medical-NLP-Corpus/Corpus-Summary.md',
  '07-Medical-NLP-Corpus/Dataset-Format-Guide.md',
  '07-Medical-NLP-Corpus/Label-Quality-Notes.md',
  '07-Medical-NLP-Corpus/Model-Notes.md',
  '07-Medical-NLP-Corpus/Source-Inventory.md',
]

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}

// The 159 per-disease notes are enumerated from disk rather than hardcoded —
// listing each DIS-NNN filename individually here would be unmaintainable.
function listDiseaseFiles(): string[] {
  try {
    return fs
      .readdirSync(DISEASES_DIR)
      .filter((file) => file.endsWith('.md') && file !== 'README.md')
      .sort()
      .map((file) => path.join('06-Medical-Knowledge', 'Diseases', file))
  } catch {
    return []
  }
}

export const ABBY_SYSTEM_PROMPT = readFile(
  path.join(cwd, 'src', 'prompts', 'abby.system-prompt.md'),
)

const ALL_CONTENT_FILES = [...CONTENT_FILES, ...listDiseaseFiles()]

export const ABBY_KNOWLEDGE = ALL_CONTENT_FILES.map((file) => {
  const content = readFile(path.join(ABBY_CONTENT_DIR, file))
  return content ? `=== ${file} ===\n\n${content}` : ''
})
  .filter(Boolean)
  .join('\n\n---\n\n')
