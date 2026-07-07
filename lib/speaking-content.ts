export const speakingHero = {
  sectionLabel: 'Speaking / Section 06',
  title: 'Beyond Treatment',
  subtitle: 'Clinical Trajectory and the Future of Preventive Healthcare AI',
  thesis:
    'Healthcare systems should not become intelligent only after patients have reached a critical condition.',
  context:
    'dr. Ferdi Iskandar speaks at the intersection of clinical medicine, healthcare leadership, health law, and artificial intelligence — connecting twelve years of real hospital experience with a practical vision for preventive AI.',
} as const

export type SpeakingEventStatus = 'forthcoming' | 'confirmed' | 'past'

export type SpeakingEventItem = {
  id: string
  number: string
  status: SpeakingEventStatus
  title: string
  subtitle: string
  description: string
  type: string
}

export const selectedTalks: SpeakingEventItem[] = [
  {
    id: 'tcma-dissemination',
    number: 'EVT-01',
    status: 'past',
    title: 'TCMA Scientific Dissemination Session',
    subtitle: 'The Clinical Mind Algorithm (TCMA)',
    description:
      'Toward Next-Generation Clinical Decision Support for Hospitals and Regional Healthcare Systems. dr. Ferdi Iskandar presented his scholarly work on TCMA — a clinical AI framework that explores how artificial intelligence systems may partially emulate human clinical cognition through biomimetic principles, Digital Twin Brain, Neuro-Symbolic AI, and metacognitive reasoning. The session examined how TCMA may contribute to the development of next-generation Clinical Decision Support systems for hospitals and regional healthcare systems, with a focus on explainability, clinical reasoning, patient safety, and real-world healthcare implementation.',
    type: 'Scientific Dissemination',
  },
]

export const speakingIndexEntries = [
  {
    number: '01',
    title: 'Signature Theme',
    detail: 'Clinical Trajectory',
    href: '#speaking-theme',
  },
  { number: '02', title: 'Speaking Topics', detail: '8 Core Areas', href: '#speaking-topics' },
  { number: '03', title: 'Formats', detail: 'Keynote to Workshop', href: '#speaking-formats' },
  { number: '04', title: 'Takeaways', detail: '6 Key Insights', href: '#speaking-takeaways' },
  { number: '05', title: 'Selected Talks', detail: 'Speaking Record', href: '#speaking-events' },
  { number: '06', title: 'Invite', detail: 'Speaking Inquiries', href: '#speaking-invite' },
] as const

export const speakerProfile = {
  name: 'dr. Ferdi Iskandar / dr. Classy',
  title: 'Physician · 12-Year Hospital CEO · Founder & CEO of Sentra Artificial Intelligence',
} as const

export const speakerBackground = [
  { area: 'Healthcare Leadership', detail: '12 years as CEO of a private maternal hospital' },
  { area: 'Clinical Practice', detail: '7 years as a primary care physician' },
  { area: 'International Organization', detail: '9 years as Executive Staff in IVAO' },
  {
    area: 'Academic Focus',
    detail: "Master's thesis in Civil Law on IVF and surrogate motherhood",
  },
  { area: 'Current Role', detail: 'Founder & CEO of Sentra Artificial Intelligence' },
  {
    area: 'Core Focus',
    detail:
      'Clinical Trajectory · Healthcare AI · Clinical Decision Support · Preventive Intelligence',
  },
] as const

export type SpeakingTopicItem = {
  number: string
  title: string
  description: string
}

export const speakingTopics: SpeakingTopicItem[] = [
  {
    number: '01',
    title: 'Clinical Trajectory & Preventive Healthcare AI',
    description:
      'How AI can help clinicians understand patient deterioration before it becomes clinically obvious.',
  },
  {
    number: '02',
    title: 'Beyond Diagnosis: The Future of Clinical Decision Support',
    description:
      'Why healthcare AI must move beyond diagnosis assistance toward longitudinal reasoning and preventive intervention.',
  },
  {
    number: '03',
    title: 'AI-Native Healthcare Operations',
    description:
      'How hospitals and healthcare institutions can use AI to improve workflow, decision-making, documentation, monitoring, and operational intelligence.',
  },
  {
    number: '04',
    title: 'Doctor-Centered AI',
    description:
      'Why AI should strengthen doctors, not replace them — and how explainability, auditability, and human review must remain central.',
  },
  {
    number: '05',
    title: 'Healthcare AI for Indonesia',
    description:
      'How to build AI systems that are clinically useful, operationally realistic, locally relevant, and scalable within the Indonesian healthcare context.',
  },
  {
    number: '06',
    title: 'Early Warning and Patient Deterioration',
    description:
      'How AI can support earlier detection of clinical risk through pattern recognition, risk momentum, and trajectory-based monitoring.',
  },
  {
    number: '07',
    title: 'Health Law, Ethics, and AI Responsibility',
    description:
      'How healthcare AI must consider medical ethics, legal responsibility, patient safety, institutional governance, and trust.',
  },
  {
    number: '08',
    title: 'The Future of Hospitals in the AI Era',
    description:
      'Why hospitals of the future will not only treat patients, but continuously interpret risk, predict deterioration, and coordinate preventive action.',
  },
]

export type SpeakingFormatItem = {
  format: string
  duration: string
  bestFor: string
}

export const speakingFormats: SpeakingFormatItem[] = [
  {
    format: 'Keynote Talk',
    duration: '20–30 min',
    bestFor: 'Conferences, healthcare forums, AI events',
  },
  {
    format: 'Founder Talk',
    duration: '15–20 min',
    bestFor: 'Universities, communities, innovation events',
  },
  {
    format: 'Panel Discussion',
    duration: '45–60 min',
    bestFor: 'Healthtech, AI policy, digital health, medical innovation',
  },
  {
    format: 'Workshop / Masterclass',
    duration: '60–90 min',
    bestFor: 'Hospitals, medical students, healthcare teams',
  },
  {
    format: 'Executive Briefing',
    duration: '30–45 min',
    bestFor: 'Hospital leaders, investors, partners, executive teams',
  },
  {
    format: 'Product Vision Session',
    duration: '10–15 min',
    bestFor: 'Sponsors, collaborators, strategic partners',
  },
]

export type TakeawayItem = {
  number: string
  title: string
  body: string
}

export const speakingTakeaways: TakeawayItem[] = [
  {
    number: '01',
    title: 'Why reactive healthcare is no longer enough',
    body: 'Traditional healthcare responds after symptoms become obvious or patients already deteriorate. The future requires systems that detect earlier signals and support preventive action.',
  },
  {
    number: '02',
    title: 'What Clinical Trajectory means',
    body: "A patient's condition is not a single data point. It is a moving clinical direction. Clinical Trajectory helps interpret whether a patient is stable, improving, deteriorating, or silently moving toward risk.",
  },
  {
    number: '03',
    title: 'How AI can support prevention',
    body: 'AI can help identify early warning signs, risk momentum, treatment response, time-to-critical patterns, and subtle changes that may be difficult to detect manually at scale.',
  },
  {
    number: '04',
    title: 'Why doctors remain central',
    body: 'Clinical Trajectory is not designed to replace doctors. It supports doctors by clarifying signals, organizing clinical information, and helping clinicians make earlier and better-informed decisions.',
  },
  {
    number: '05',
    title: 'Why healthcare AI must be explainable',
    body: 'In medicine, intelligence is not enough. AI systems must be transparent, clinically relevant, reviewable, and safe for real-world healthcare environments.',
  },
  {
    number: '06',
    title: 'Why Indonesia needs locally relevant AI',
    body: 'Healthcare AI cannot simply be imported as generic technology. It must respect local workflows, clinical realities, infrastructure limitations, and patient needs.',
  },
]

export const signatureTransformation = [
  { from: 'Reactive treatment', to: 'Preventive intelligence' },
  { from: 'Static diagnosis', to: 'Dynamic clinical trajectory' },
  { from: 'Isolated clinical data', to: 'Longitudinal risk pattern' },
  { from: 'Late intervention', to: 'Earlier clinical action' },
  { from: 'Manual monitoring', to: 'AI-supported early warning' },
  { from: 'AI as automation', to: 'AI as clinical reasoning support' },
  { from: 'Generic healthtech', to: 'Clinically relevant healthcare intelligence' },
] as const

export const signatureLines = [
  'Healthcare systems should not become intelligent only after patients have reached a critical condition. The future of healthcare lies not merely in treating disease, but in the ability to identify, predict, and prevent clinical deterioration before it progresses into a life-threatening state.',
  'Clinical Trajectory transforms fragmented clinical data into clinically meaningful signals, enabling earlier risk recognition and more precise preventive action.',
  'Artificial intelligence in healthcare should not replace physicians. Rather, it should augment clinical decision-making by helping doctors detect deterioration earlier, reason more clearly, and act more rapidly.',
  'The next frontier of healthcare AI is therefore not automation alone, but the development of predictive, preventive, and proactive healthcare systems.',
] as const

export const speakingInvite = {
  body: 'For speaking invitations, collaborations, executive sessions, or healthcare AI events:',
  website: 'ferdiiskandar.com',
  email: 'drferdiiskandar@sentrahai.com',
  focusAreas:
    'Healthcare AI · Clinical Trajectory · Clinical Decision Support · Preventive Intelligence · AI-Native Healthcare Operations · Health Law & Ethics',
} as const

export const speakingGlanceSections = [
  {
    title: 'Speaking Formats',
    items: [
      'Keynote Talk',
      'Founder Talk',
      'Panel Discussion',
      'Workshop / Masterclass',
      'Executive Briefing',
      'Product Vision Session',
    ],
  },
  {
    title: 'Core Topics',
    items: [
      'Clinical Trajectory',
      'Preventive Healthcare AI',
      'Doctor-Centered AI',
      'Healthcare AI for Indonesia',
      'Health Law & Ethics',
    ],
  },
  {
    title: 'Ideal Audiences',
    items: [
      'Medical conferences',
      'Hospital leadership forums',
      'Healthtech & AI events',
      'University lectures',
      'Executive briefings',
    ],
  },
  {
    title: 'Contact',
    items: ['ferdiiskandar.com', 'drferdiiskandar@sentrahai.com'],
  },
] as const
