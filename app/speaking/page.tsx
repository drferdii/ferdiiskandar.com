import type { Metadata } from 'next'

import SpeakingPage from '@/components/SpeakingPage'

export const metadata: Metadata = {
  title: 'Speaking — dr. Ferdi Iskandar',
  description:
    'Beyond Treatment: Clinical Trajectory and the Future of Preventive Healthcare AI. dr. Ferdi Iskandar speaks at the intersection of medicine, hospital leadership, health law, and artificial intelligence.',
}

export default function Page() {
  return <SpeakingPage />
}
