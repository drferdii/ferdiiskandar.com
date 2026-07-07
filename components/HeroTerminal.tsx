'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type FileType = 'folder' | 'python' | 'json' | 'config' | 'markdown' | 'executable' | 'data'

type LineKind = 'system' | 'output' | 'command' | 'error' | 'progress'

type LineNode = {
  id: number
  kind: LineKind
  node: ReactNode
}

type FileEntry = {
  name: string
  type: FileType
}

const FILE_LISTING: FileEntry[] = [
  { name: 'dataset', type: 'folder' },
  { name: 'models', type: 'folder' },
  { name: 'logs', type: 'folder' },
  { name: 'checkpoints', type: 'folder' },
  { name: 'configs', type: 'folder' },
  { name: 'notebooks', type: 'folder' },
  { name: 'src', type: 'folder' },
  { name: 'scripts', type: 'folder' },
  { name: 'outputs', type: 'folder' },
  { name: 'eval', type: 'folder' },
  { name: 'train.py', type: 'python' },
  { name: 'evaluate.py', type: 'python' },
  { name: 'preprocess.py', type: 'python' },
  { name: 'config.json', type: 'json' },
  { name: 'requirements.txt', type: 'config' },
  { name: '.env', type: 'config' },
  { name: 'README.md', type: 'markdown' },
  { name: 'run.sh', type: 'executable' },
]

const FILE_ICON: Record<FileType, string> = {
  folder: '📂',
  python: '🐍',
  json: '{ }',
  config: '⚙',
  markdown: '📝',
  executable: '⚡',
  data: '📄',
}

const FILE_COLOR_CLASS: Record<FileType, string> = {
  folder: 'fi-term-c-folder',
  python: 'fi-term-c-python',
  json: 'fi-term-c-json',
  config: 'fi-term-c-config',
  markdown: 'fi-term-c-markdown',
  executable: 'fi-term-c-exec',
  data: 'fi-term-c-data',
}

const README_LINES: { text: string; tone: 'heading' | 'item' | 'plain' }[] = [
  { text: '# Health Fine-Tune Project', tone: 'heading' },
  { text: '', tone: 'plain' },
  { text: 'Fine-tuning biomedical language models on medical QA datasets.', tone: 'plain' },
  { text: '', tone: 'plain' },
  { text: '## Dataset', tone: 'heading' },
  { text: '- 45,231 medical Q&A pairs', tone: 'item' },
  { text: '- Sources: PubMed, MedQuad, iCliniq, HealthCareMagic', tone: 'item' },
  { text: '', tone: 'plain' },
  { text: '## Model', tone: 'heading' },
  { text: '- Base: microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract', tone: 'item' },
  { text: '- Method: QLoRA (4-bit quantization)', tone: 'item' },
]

type TrainingRow = {
  epoch: number
  total: number
  loss: string
  acc: string
  f1: string
  time: string
  its: string
}

const TRAINING_PROGRESS: TrainingRow[] = [
  { epoch: 1, total: 5, loss: '1.8472', acc: '62.14%', f1: '0.5891', time: '05:42', its: '21.1' },
  { epoch: 2, total: 5, loss: '0.9234', acc: '78.56%', f1: '0.7643', time: '05:38', its: '21.4' },
  { epoch: 3, total: 5, loss: '0.4512', acc: '87.32%', f1: '0.8591', time: '05:35', its: '21.6' },
  { epoch: 4, total: 5, loss: '0.2134', acc: '92.18%', f1: '0.9124', time: '05:33', its: '21.7' },
  { epoch: 5, total: 5, loss: '0.1234', acc: '94.67%', f1: '0.9389', time: '05:30', its: '21.9' },
]

const BOOT_LINES: { text: string; delay: number }[] = [
  { text: 'Booting macOS Sonoma 14.3...', delay: 320 },
  { text: 'Loading kernel modules...', delay: 240 },
  { text: 'Mounting file systems...', delay: 200 },
  { text: 'Starting network services...', delay: 180 },
  { text: 'Loading GPU drivers (NVIDIA A100)...', delay: 380 },
  { text: 'CUDA 12.1 initialized', delay: 220 },
  { text: 'Starting zsh shell...', delay: 200 },
]

const AUTO_COMMANDS: { cmd: string; wait: number }[] = [
  { cmd: 'ls', wait: 700 },
  { cmd: 'cat README.md', wait: 1000 },
  { cmd: 'nvidia-smi', wait: 1200 },
  { cmd: 'python train.py --config configs/biobert_finetune.yaml', wait: 0 },
]

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

function PromptHeader() {
  return (
    <span className="fi-term-prompt-info">
      <span className="fi-term-prompt-arrow">❯</span>
      <span className="fi-term-prompt-path">health-finetune</span>
      <span className="fi-term-prompt-on">on</span>
      <span className="fi-term-prompt-branch">feature/finetune-v1</span>
      <span className="fi-term-prompt-via">via</span>
      <span className="fi-term-prompt-python">🐍 v3.10.12</span>
      <span className="fi-term-prompt-arrow-end">❯</span>
    </span>
  )
}

function FileListing() {
  return (
    <div className="fi-term-file-row">
      {FILE_LISTING.map((item) => (
        <span key={item.name} className={`fi-term-file-chip ${FILE_COLOR_CLASS[item.type]}`}>
          {FILE_ICON[item.type]} {item.name}
          {item.type === 'folder' ? '/' : ''}
        </span>
      ))}
    </div>
  )
}

function ReadmeBlock() {
  return (
    <>
      {README_LINES.map((line, idx) => {
        if (line.tone === 'heading') {
          return (
            <div key={idx} className="fi-term-md-heading">
              {line.text}
            </div>
          )
        }
        return (
          <div key={idx} className="fi-term-md-line">
            {line.text}
          </div>
        )
      })}
    </>
  )
}

function NvidiaSmiBlock() {
  return (
    <div className="fi-term-smi-block">
      <div>+----------------------------------------------------------+</div>
      <div>| NVIDIA-SMI 535.104.05    Driver 535.104.05  CUDA 12.2    |</div>
      <div>|==========================================================|</div>
      <div>| 0  NVIDIA A100 40GB   On   00000000:00:04.0 Off       0 |</div>
      <div>| N/A 42C  P0  285W / 400W  38923MiB / 40960MiB   100%   |</div>
      <div>+----------------------------------------------------------+</div>
      <div>| Processes:                                               |</div>
      <div>| 0  N/A  N/A  28421  C  python train.py --config ...     |</div>
      <div>+----------------------------------------------------------+</div>
    </div>
  )
}

function TrainingHeader() {
  return (
    <>
      <div className="fi-term-line-output">
        <span className="fi-term-c-accent">Loading dataset: dataset/medical_qa_v2.jsonl...</span>
      </div>
      <div className="fi-term-line-output">
        <span className="fi-term-c-json">Dataset loaded: 45,231 samples</span>
      </div>
      <div className="fi-term-line-output">
        Train: <span className="fi-term-c-accent">36,184</span> | Val: <span className="fi-term-c-python">4,523</span> | Test: <span className="fi-term-c-data">4,524</span>
      </div>
      <div className="fi-term-line-output">
        <span className="fi-term-c-data">Model: microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract</span>
      </div>
      <div className="fi-term-line-output">
        <span className="fi-term-c-accent">Using device: cuda (NVIDIA A100 40GB)</span>
      </div>
      <div className="fi-term-line-output">LoRA config: r=16, alpha=32, dropout=0.1</div>
      <div className="fi-term-line-output">Target modules: [&quot;query&quot;, &quot;value&quot;]</div>
    </>
  )
}

function ProgressRow({ row }: { row: TrainingRow }) {
  const bar = '█'.repeat(row.epoch * 4) + '░'.repeat((row.total - row.epoch) * 4)
  return (
    <div className="fi-term-progress-block">
      <div className="fi-term-progress-header">
        Epoch {row.epoch}/{row.total}
      </div>
      <div className="fi-term-progress-bar">
        {bar} [{row.time} &lt;00:00, {row.its}it/s]
      </div>
      <div className="fi-term-progress-stats">
        <span className="fi-term-progress-loss">loss: {row.loss}</span>
        <span className="fi-term-progress-acc">acc: {row.acc}</span>
        <span className="fi-term-progress-f1">f1: {row.f1}</span>
      </div>
    </div>
  )
}

function SummaryBlock() {
  return (
    <div className="fi-term-summary-block">
      <div className="fi-term-summary-title">
        <span>✓</span>
        <span>Training complete!</span>
      </div>
      <div className="fi-term-c-accent">
        Best model saved to: <strong>checkpoints/best_model.pt</strong>
      </div>
      <div className="fi-term-summary-stats">
        <span className="fi-term-c-python">Val Loss: 0.1456</span>
        <span className="fi-term-c-json">Val Acc: 93.89%</span>
        <span className="fi-term-c-data">Val F1: 0.9287</span>
      </div>
    </div>
  )
}

type FrameProps = {
  lines: LineNode[]
  autoText: string
  autoTyping: boolean
  ready: boolean
  lineCount: number
}

function Frame({ lines, autoText, autoTyping, ready, lineCount }: FrameProps) {
  return (
    <div className="fi-term-container" aria-hidden="true">
      <div className="fi-term-glow" />
      <div className="fi-term-frame">
        <div className="fi-term-title-bar">
          <div className="fi-term-dots">
            <span className="fi-term-dot fi-term-dot-red" />
            <span className="fi-term-dot fi-term-dot-yellow" />
            <span className="fi-term-dot fi-term-dot-green" />
          </div>
          <div className="fi-term-title-label">ferdi@sentraone — health-finetune — zsh</div>
        </div>

        <div className="fi-term-body">
          <div className="fi-term-body-inner">
            <div className="fi-term-lines">
              {lines.map((line) => (
                <div key={line.id} className={`fi-term-line ${kindClass(line.kind)}`}>
                  {line.node}
                </div>
              ))}

              {autoTyping ? (
                <div className="fi-term-prompt-row">
                  <PromptHeader />
                  <span className="fi-term-prompt-line">
                    {autoText}
                    <span className="fi-term-cursor fi-term-cursor-blink" />
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="fi-term-status-bar">
          <div className="fi-term-status-group">
            <span>zsh</span>
            <span>UTF-8</span>
            <span>Python 3.10.12</span>
          </div>
          <div className="fi-term-status-group">
            <span className="fi-term-status-item">
              <span
                className={`fi-term-status-dot ${ready ? 'fi-term-status-dot-ready' : 'fi-term-status-dot-busy'}`}
              />
              {ready ? 'READY' : autoTyping ? 'TYPING' : 'BOOTING'}
            </span>
            <span>{lineCount} lines</span>
            <span>health-finetune</span>
          </div>
        </div>

        <div className="fi-term-scanline" />
        <div className="fi-term-vignette" />
      </div>
    </div>
  )
}

function kindClass(kind: LineKind): string {
  switch (kind) {
    case 'system':
      return 'fi-term-line-system'
    case 'error':
      return 'fi-term-line-error'
    case 'progress':
      return 'fi-term-line-progress'
    case 'command':
    case 'output':
    default:
      return 'fi-term-line-output'
  }
}

export default function HeroTerminal() {
  const [lines, setLines] = useState<LineNode[]>([])
  const [autoText, setAutoText] = useState('')
  const [autoTyping, setAutoTyping] = useState(false)
  const [ready, setReady] = useState(false)

  const idRef = useRef(0)

  useEffect(() => {
    let cancelled = false

    const push = (kind: LineKind, node: ReactNode) => {
      if (cancelled) return
      idRef.current += 1
      const entry: LineNode = { id: idRef.current, kind, node }
      setLines((prev) => [...prev, entry])
    }

    const reset = () => {
      idRef.current = 0
      setLines([])
      setAutoText('')
      setAutoTyping(false)
      setReady(false)
    }

    const renderCommandLine = (cmd: string): ReactNode => (
      <div className="fi-term-command-row">
        <span className="fi-term-command-prefix">❯</span>
        <span className="fi-term-command-text">{cmd}</span>
      </div>
    )

    const renderCommandOutput = async (cmd: string) => {
      if (cmd === 'ls') {
        push('output', <FileListing />)
        return
      }
      if (cmd === 'cat README.md') {
        push('output', <ReadmeBlock />)
        return
      }
      if (cmd === 'nvidia-smi') {
        push('output', <NvidiaSmiBlock />)
        return
      }
      if (cmd.startsWith('python train.py')) {
        push('system', 'Loading config from configs/biobert_finetune.yaml...')
        await sleep(320)
        if (cancelled) return
        push('output', <TrainingHeader />)
        push('output', '')
        await sleep(180)
        for (const row of TRAINING_PROGRESS) {
          if (cancelled) return
          push('progress', <ProgressRow row={row} />)
          await sleep(540)
        }
        await sleep(240)
        if (cancelled) return
        push('system', <SummaryBlock />)
        return
      }
    }

    const autoType = async (cmd: string) => {
      setAutoTyping(true)
      setAutoText('')
      let current = ''
      for (const char of cmd) {
        if (cancelled) return
        current += char
        setAutoText(current)
        await sleep(58 + Math.random() * 64)
      }
      await sleep(320)
      if (cancelled) return
      push('command', renderCommandLine(cmd))
      setAutoTyping(false)
      setAutoText('')
    }

    const runCycle = async () => {
      reset()
      for (const boot of BOOT_LINES) {
        if (cancelled) return
        await sleep(boot.delay)
        push('system', boot.text)
      }
      await sleep(220)
      for (const step of AUTO_COMMANDS) {
        if (cancelled) return
        await sleep(420)
        await autoType(step.cmd)
        if (cancelled) return
        await renderCommandOutput(step.cmd)
        if (step.wait > 0) await sleep(step.wait)
      }
      if (cancelled) return
      setReady(true)
      await sleep(4500)
    }

    const loop = async () => {
      while (!cancelled) {
        await runCycle()
      }
    }

    void loop()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Frame
      lines={lines}
      autoText={autoText}
      autoTyping={autoTyping}
      ready={ready}
      lineCount={lines.length}
    />
  )
}
