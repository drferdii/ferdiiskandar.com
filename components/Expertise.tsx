'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

import {
  getRevealInitial,
  motionVariants,
  staggerContainer,
  motionViewport,
  transitions,
} from '@/lib/motion-variants'
import { thinkingMeta } from '@/lib/site-content'
import { useMotionReady } from '@/lib/use-motion-ready'

const thinkingNodes = [
  {
    className: 'fi-thinking-node fi-node-input',
    style: { ['--x' as string]: '0%', ['--y' as string]: '171px' },
    label: 'Masukan',
    title: 'Clinical\nComplexity',
    desc: 'Tidak terstruktur, berubah-ubah, dan berisiko tinggi.',
  },
  {
    className: 'fi-thinking-node fi-node-top-1',
    style: { ['--x' as string]: '25%', ['--y' as string]: '72px' },
    label: 'Proses',
    title: 'Intelligence Engineer\n& Systems Architect',
    desc: 'Merekayasa fondasi sistem yang mampu belajar, beradaptasi, dan tetap dapat diaudit.',
  },
  {
    className: 'fi-thinking-node fi-node-top-2',
    style: { ['--x' as string]: '48%', ['--y' as string]: '72px' },
    label: 'Proses',
    title: 'Autonomous\nSystems Strategist',
    desc: 'Mengubah otomatisasi menjadi otonomi terbatas yang tidak mengambil alih tanggung jawab klinis.',
  },
  {
    className: 'fi-thinking-node fi-node-top-3',
    style: { ['--x' as string]: '71%', ['--y' as string]: '72px' },
    label: 'Proses',
    title: 'Principal of\nAugmented Engineering',
    desc: 'Mendesain teknologi sebagai ekstensi kapasitas intelektual manusia.',
  },
  {
    className: 'fi-thinking-node fi-node-bottom-1',
    style: { ['--x' as string]: '34%', ['--y' as string]: '270px' },
    label: 'Proses',
    title: 'Neural Infrastructure\nDesigner',
    desc: 'Membangun jaringan data, retrieval, dan reasoning untuk mengekstrak sinyal klinis.',
  },
  {
    className: 'fi-thinking-node fi-node-bottom-2',
    style: { ['--x' as string]: '57%', ['--y' as string]: '270px' },
    label: 'Proses',
    title: 'Cognitive Architecture\nEngineer',
    desc: 'Merancang alur berpikir yang menjelaskan alasan, batas, ketidakpastian, dan rekomendasi.',
  },
  {
    className: 'fi-thinking-node fi-node-output',
    style: { ['--x' as string]: '91%', ['--y' as string]: '171px' },
    label: 'Keluaran',
    title: 'Responsible\nClinical Intelligence',
    desc: 'Insight yang lebih jernih. Keputusan yang lebih baik. Care yang lebih aman.',
  },
]

type TerminalSpeaker = {
  user: string
  host: string
  path: string
}

type TerminalLine = {
  id: number
  type: 'command' | 'output' | 'code' | 'banner'
  text?: string
  tone?: 'dim' | 'success' | 'info'
  speaker?: TerminalSpeaker
  complete?: boolean
}

const terminalSpeaker: TerminalSpeaker = {
  user: 'ferdi',
  host: 'sentra-ai',
  path: '~/projects/sentra-ai',
}

const terminalCode = `import { AgentOrchestrator } from './core';
import { DextonAgent, ClaudeAgent, KimiAgent } from './agents';

const swarm = new AgentOrchestrator({
  mode: 'parallel',
  retryPolicy: 'exponential',
});

swarm.register(DextonAgent);
swarm.register(ClaudeAgent);
swarm.register(KimiAgent);`

function getTerminalDelay(char: string, index: number, baseSpeed: number) {
  if (char === '\n') return 96
  if (char === ' ') return 34 + ((index * 11) % 24)
  if (['.', ',', ';', '{', '}', '(', ')'].includes(char)) return 78
  return baseSpeed + ((char.charCodeAt(0) + index * 17) % 28)
}

function getCommonPrefixLength(left: string, right: string) {
  const limit = Math.min(left.length, right.length)
  let index = 0

  while (index < limit && left[index] === right[index]) {
    index += 1
  }

  return index
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function SyntaxHighlightedCode({ text = '' }: { text?: string }) {
  const tokens: ReactNode[] = []
  const matcher =
    /\b(import|from|const|let|var|new|class|function|return|if|else|async|await)\b|\b(AgentOrchestrator|DextonAgent|ClaudeAgent|KimiAgent)\b|('[^']*')|\b(\d+)\b/g
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = matcher.exec(text)) !== null) {
    if (match.index > cursor) {
      tokens.push(text.slice(cursor, match.index))
    }

    const [value, keyword, className, stringValue] = match
    if (keyword) {
      tokens.push(
        <span className="fi-terminal-sh-keyword" key={`${match.index}-keyword`}>
          {value}
        </span>,
      )
    } else if (className) {
      tokens.push(
        <span className="fi-terminal-sh-class" key={`${match.index}-class`}>
          {value}
        </span>,
      )
    } else if (stringValue) {
      tokens.push(
        <span className="fi-terminal-sh-string" key={`${match.index}-string`}>
          {value}
        </span>,
      )
    } else {
      tokens.push(
        <span className="fi-terminal-sh-number" key={`${match.index}-number`}>
          {value}
        </span>,
      )
    }

    cursor = match.index + value.length
  }

  if (cursor < text.length) {
    tokens.push(text.slice(cursor))
  }

  return <>{tokens}</>
}

function TerminalPrompt({ speaker }: { speaker: TerminalSpeaker }) {
  return (
    <span className="fi-terminal-prompt">
      <span className="fi-terminal-prompt-user">{speaker.user}</span>
      <span className="fi-terminal-prompt-at">@</span>
      <span className="fi-terminal-prompt-host">{speaker.host}</span>
      <span>:</span>
      <span className="fi-terminal-prompt-path">{speaker.path}</span>
      <span className="fi-terminal-prompt-symbol">$</span>
    </span>
  )
}

function TerminalCursor({ active }: { active: boolean }) {
  return <span className={active ? 'fi-terminal-cursor typing' : 'fi-terminal-cursor'}></span>
}

function TerminalLineView({ line }: { line: TerminalLine }) {
  if (line.type === 'banner') {
    return (
      <div className="fi-terminal-line">
        <div className="fi-terminal-orchestra-banner">
          <div className="fi-terminal-banner-title">Agent Swarm Orchestration</div>
          <div className="fi-terminal-agent-line">
            <span className="fi-terminal-agent-badge agent-dexton">DEX</span>
            <span className="fi-terminal-agent-arrow">-&gt;</span>
            <span className="fi-terminal-agent-status">ONLINE</span>
            <span className="fi-terminal-agent-note">reasoning engine loaded</span>
          </div>
          <div className="fi-terminal-agent-line">
            <span className="fi-terminal-agent-badge agent-claude">CLA</span>
            <span className="fi-terminal-agent-arrow">-&gt;</span>
            <span className="fi-terminal-agent-status busy">SYNCING</span>
            <span className="fi-terminal-agent-note">context window: 128k</span>
          </div>
          <div className="fi-terminal-agent-line">
            <span className="fi-terminal-agent-badge agent-kimi">KIM</span>
            <span className="fi-terminal-agent-arrow">-&gt;</span>
            <span className="fi-terminal-agent-status">ONLINE</span>
            <span className="fi-terminal-agent-note">long-context ready</span>
          </div>
          <div className="fi-terminal-banner-foot">Consensus Protocol: active</div>
        </div>
      </div>
    )
  }

  if (line.type === 'output') {
    return (
      <div className="fi-terminal-line">
        <span className={`fi-terminal-output ${line.tone ?? ''}`}>{line.text}</span>
        {!line.complete ? <TerminalCursor active /> : null}
      </div>
    )
  }

  if (line.type === 'code') {
    return (
      <div className="fi-terminal-line code">
        <SyntaxHighlightedCode text={line.text} />
        {!line.complete ? <TerminalCursor active /> : null}
      </div>
    )
  }

  return (
    <div className="fi-terminal-line">
      <TerminalPrompt speaker={line.speaker ?? terminalSpeaker} />
      <span>{line.text}</span>
      {!line.complete ? <TerminalCursor active /> : null}
    </div>
  )
}

function ThinkingTerminal() {
  const [activeTab, setActiveTab] = useState('sentra-core')
  const [lines, setLines] = useState<TerminalLine[]>([])

  const tabs = useMemo(() => ['sentra-core', 'melinda-dhai', 'avvcenna-plus'], [])

  useEffect(() => {
    let cancelled = false
    let id = 0

    const addLine = async (line: Omit<TerminalLine, 'id'>, delay = 0) => {
      if (delay > 0) await sleep(delay)
      if (cancelled) return
      setLines((current) => [...current, { ...line, id: id++ }])
    }

    const typeLine = async (
      line: Omit<TerminalLine, 'id' | 'complete'>,
      baseSpeed = 42,
      delay = 0,
      typoText?: string,
    ) => {
      if (delay > 0) await sleep(delay)
      if (cancelled) return

      const targetText = line.text ?? ''
      setLines((current) => [...current, { ...line, id: id++, text: '', complete: false }])

      const setCurrentLineText = (nextText: string) => {
        if (cancelled) return
        setLines((current) =>
          current.map((item, index) =>
            index === current.length - 1 ? { ...item, text: nextText } : item,
          ),
        )
      }

      const typeTextRange = async (fromIndex: number) => {
        for (let i = fromIndex; i < targetText.length; i += 1) {
          if (cancelled) return
          setCurrentLineText(targetText.slice(0, i + 1))
          await sleep(getTerminalDelay(targetText[i] ?? '', i, baseSpeed))
        }
      }

      if (typoText) {
        for (let i = 0; i < typoText.length; i += 1) {
          if (cancelled) return
          setCurrentLineText(typoText.slice(0, i + 1))
          await sleep(getTerminalDelay(typoText[i] ?? '', i, baseSpeed))
        }

        await sleep(220)

        const resumeIndex = getCommonPrefixLength(typoText, targetText)
        for (let i = typoText.length; i > resumeIndex; i -= 1) {
          if (cancelled) return
          setCurrentLineText(typoText.slice(0, i - 1))
          await sleep(32 + ((i * 7) % 22))
        }

        await sleep(140)

        await typeTextRange(resumeIndex)
      } else {
        await typeTextRange(0)
      }

      if (cancelled) return
      setLines((current) =>
        current.map((item, index) =>
          index === current.length - 1 ? { ...item, complete: true } : item,
        ),
      )
    }

    const runSequence = async () => {
      await sleep(600)
      await typeLine(
        {
          type: 'command',
          speaker: terminalSpeaker,
          text: 'vim orchestrator/agent-swarm.ts',
        },
        42,
        0,
        'vim orchestratr/agent-swarm.ts',
      )
      await typeLine(
        { type: 'output', tone: 'dim', text: '"orchestrator/agent-swarm.ts" [New File]' },
        22,
        360,
      )
      await typeLine({ type: 'output', tone: 'dim', text: '-- INSERT --' }, 28, 220)
      await typeLine({ type: 'code', text: terminalCode }, 18, 260)
      await typeLine({ type: 'output', tone: 'dim', text: '-- NORMAL --' }, 28, 360)
      await typeLine({ type: 'command', speaker: terminalSpeaker, text: ':wq' }, 58, 220)
      await typeLine(
        { type: 'output', tone: 'success', text: '"orchestrator/agent-swarm.ts" written' },
        24,
        360,
      )
      await typeLine(
        { type: 'command', speaker: terminalSpeaker, text: '/classy-using' },
        42,
        620,
        '/classy-usign',
      )
      await typeLine(
        { type: 'output', tone: 'info', text: '[CLASSY] Initializing orchestration framework...' },
        20,
        280,
      )
      await typeLine(
        { type: 'output', tone: 'dim', text: '[CLASSY] Loading agent registry from ./agents/' },
        20,
        340,
      )
      await typeLine(
        {
          type: 'output',
          tone: 'dim',
          text: '[CLASSY] Resolving dependencies: framer-motion, zod, ai-sdk',
        },
        20,
        420,
      )
      await typeLine(
        { type: 'output', tone: 'success', text: '[CLASSY] Framework ready. 3 agents registered.' },
        22,
        460,
      )
      await typeLine(
        { type: 'command', speaker: terminalSpeaker, text: 'invoke Dexton-Claude-Kimi' },
        42,
        560,
        'invoke Dexton-Cluade-Kimi',
      )
      await addLine({ type: 'banner', complete: true }, 360)
      await typeLine(
        { type: 'output', tone: 'dim', text: '[SWARM] Dexton -> analyzing task decomposition...' },
        20,
        520,
      )
      await typeLine(
        { type: 'output', tone: 'dim', text: '[SWARM] Claude -> generating structured output...' },
        20,
        520,
      )
      await typeLine(
        { type: 'output', tone: 'dim', text: '[SWARM] Kimi -> cross-referencing long-context...' },
        20,
        620,
      )
      await typeLine(
        {
          type: 'output',
          tone: 'success',
          text: '[SWARM] Consensus reached. Delivering unified response.',
        },
        22,
        520,
      )
      await addLine({ type: 'command', speaker: terminalSpeaker, text: '', complete: false }, 320)
    }

    void runSequence()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="fi-terminal-window">
      <div className="fi-terminal-title-bar">
        <div aria-label="Window controls" className="fi-terminal-traffic-lights">
          <button
            aria-label="Close terminal preview"
            className="fi-terminal-traffic-btn red"
            type="button"
          />
          <button
            aria-label="Minimize terminal preview"
            className="fi-terminal-traffic-btn yellow"
            type="button"
          />
          <button
            aria-label="Maximize terminal preview"
            className="fi-terminal-traffic-btn green"
            type="button"
          />
        </div>
        <div className="fi-terminal-window-title">ferdi@sentra-ai -- ~ -- zsh -- 80x24</div>
        <div aria-hidden="true" className="fi-terminal-window-controls">
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="fi-terminal-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'fi-terminal-tab active' : 'fi-terminal-tab'}
            key={tab}
            onClick={() => setActiveTab(tab)}
            role="tab"
            type="button"
          >
            <span>{tab}</span>
            <span aria-hidden="true" className="fi-terminal-tab-close">
              x
            </span>
          </button>
        ))}
        <button aria-label="New terminal tab" className="fi-terminal-tab-new" type="button">
          +
        </button>
      </div>
      <div aria-live="polite" className="fi-terminal-body">
        {lines.map((line) => (
          <TerminalLineView key={line.id} line={line} />
        ))}
      </div>
      <div className="fi-terminal-status-bar">
        <div className="fi-terminal-status-section">
          <span className="fi-terminal-status-item">
            <span className="fi-terminal-status-dot"></span>
            zsh
          </span>
          <span className="fi-terminal-status-item">UTF-8</span>
          <span className="fi-terminal-status-item">80x24</span>
        </div>
        <div className="fi-terminal-status-section right">
          <span className="fi-terminal-status-item">~/projects/sentra-ai</span>
          <span className="fi-terminal-status-item">L1:C1</span>
        </div>
      </div>
    </div>
  )
}

export default function Expertise() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  return (
    <section
      aria-labelledby="thinking-stack-title"
      className="fi-section fi-thinking-editorial"
      id="expertise"
    >
      <div aria-hidden="true" className="fi-editorial-page-rule"></div>

      <motion.header
        aria-label="Header editorial The Thinking Stack"
        className="fi-thinking-masthead"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={motionVariants.fadeDown}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        <div className="fi-thinking-masthead-left">{thinkingMeta.sectionLabel}</div>
        <div className="fi-thinking-masthead-center">{thinkingMeta.editionLabel}</div>
        <div className="fi-thinking-masthead-right">{thinkingMeta.notesLabel}</div>
      </motion.header>

      <motion.div
        className="fi-thinking-hero-grid"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.12, 0.1)}
        transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
      >
        <motion.aside
          aria-label="Section marker"
          className="fi-thinking-section-mark"
          variants={motionVariants.fadeUp}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <span>Bagian</span>
          <strong>02</strong>
          <i aria-hidden="true"></i>
          <b aria-hidden="true">✧</b>
        </motion.aside>
        <motion.div
          className="fi-thinking-title-block"
          variants={motionVariants.slideIn}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <div className="fi-kicker">Rekayasa Kecerdasan</div>
          <h2 className="fi-thinking-title" id="thinking-stack-title">
            The Thinking Stack
          </h2>
          <div aria-hidden="true" className="fi-thinking-title-rule">
            <span></span>
          </div>
          <p className="fi-thinking-pullquote">
            The Thinking Stack adalah ruang orkestrasi terbuka untuk membangun kecerdasan klinis
            yang bertanggung jawab.
          </p>
        </motion.div>
        <motion.aside
          aria-label="Visual terminal orkestrasi"
          className="fi-thinking-terminal-visual"
          variants={motionVariants.fadeUp}
          transition={shouldReduce ? { duration: 0 } : { ...transitions.medium, delay: 0.2 }}
        >
          <ThinkingTerminal />
        </motion.aside>
      </motion.div>

      <div aria-hidden="true" className="fi-thinking-divider"></div>

      <div className="fi-thinking-orchestration">
        <motion.aside
          className="fi-thinking-sidebar"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={motionVariants.slideIn}
          transition={shouldReduce ? { duration: 0 } : transitions.medium}
        >
          <p>
            Ruang orkestrasi terbuka yang terinspirasi Langflow, lalu diterjemahkan menjadi sistem
            editorial.
          </p>
          <span aria-hidden="true"></span>
          <p>Setiap peran menyumbang kemampuan reasoning yang berbeda.</p>
          <span aria-hidden="true"></span>
          <p>
            Bersama-sama, semuanya membentuk arsitektur deliberatif untuk clinical intelligence.
          </p>
          <b aria-hidden="true">✣</b>
        </motion.aside>

        <motion.div
          aria-label="Graf orkestrasi kognitif founder"
          className="fi-thinking-graph"
          initial={revealInitial}
          whileInView="visible"
          viewport={motionViewport}
          variants={staggerContainer(0.1, 0.2)}
          transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
        >
          <svg
            aria-hidden="true"
            className="fi-thinking-wires"
            preserveAspectRatio="none"
            viewBox="0 0 1200 430"
          >
            <path d="M 155 210 C 205 210 210 125 265 125"></path>
            <path d="M 155 210 C 210 210 205 305 345 305"></path>
            <path d="M 430 125 C 470 125 470 125 510 125"></path>
            <path d="M 675 125 C 710 125 710 125 745 125"></path>
            <path d="M 905 125 C 965 125 960 210 1035 210"></path>
            <path d="M 880 305 C 940 305 950 210 1035 210"></path>
            <path d="M 525 305 C 565 305 565 305 605 305"></path>
            <path d="M 360 210 C 360 250 360 270 360 305"></path>
            <path d="M 840 210 C 840 245 835 270 835 305"></path>
            <circle cx="155" cy="210" r="5"></circle>
            <circle cx="265" cy="125" r="5"></circle>
            <circle cx="430" cy="125" r="5"></circle>
            <circle cx="510" cy="125" r="5"></circle>
            <circle cx="675" cy="125" r="5"></circle>
            <circle cx="745" cy="125" r="5"></circle>
            <circle cx="905" cy="125" r="5"></circle>
            <circle cx="345" cy="305" r="5"></circle>
            <circle cx="525" cy="305" r="5"></circle>
            <circle cx="605" cy="305" r="5"></circle>
            <circle cx="880" cy="305" r="5"></circle>
            <circle cx="1035" cy="210" r="5"></circle>
          </svg>

          {thinkingNodes.map((node, i) => (
            <motion.article
              key={i}
              className={node.className}
              style={node.style}
              variants={motionVariants.scaleReveal}
              transition={
                shouldReduce ? { duration: 0 } : { ...transitions.dramatic, delay: i * 0.08 }
              }
            >
              <span>{node.label}</span>
              <h3>
                {node.title.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < node.title.split('\n').length - 1 ? <br /> : ''}
                  </span>
                ))}
              </h3>
              <p>{node.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <motion.footer
        aria-label="Thinking stack metadata"
        className="fi-thinking-footnotes"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={motionVariants.fadeIn}
        transition={shouldReduce ? { duration: 0 } : { ...transitions.medium, delay: 0.1 }}
      >
        <div>
          <strong>Fig. 02.01</strong>
        </div>
        <div>
          <em>
            Ruang orkestrasi The Thinking Stack.
            <br />
            Peran-peran dihubungkan oleh tujuan, bukan sekadar proses.
          </em>
        </div>
        <div>
          <strong>Sumber</strong>
          <span>Laboratorium Catatan Founder</span>
        </div>
        <div>
          <strong>Catatan</strong>
          <span>
            Bukan sekadar workflow.
            <br />
            Sebuah cara berpikir.
          </span>
        </div>
        <div>
          <strong>Status</strong>
          <span>Terus disempurnakan</span>
        </div>
        <div>
          <strong>Pembaruan</strong>
          <span>{thinkingMeta.lastUpdatedLabel}</span>
        </div>
        <div aria-hidden="true" className="fi-thinking-ornament">
          ✧
        </div>
      </motion.footer>

      <div aria-hidden="true" className="fi-editorial-page-rule bottom"></div>
    </section>
  )
}
