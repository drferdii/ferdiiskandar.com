import type { Metadata } from 'next'

import CVPage from '@/components/CVPage'

export const metadata: Metadata = {
  title: 'Curriculum Vitae — dr. Ferdi Iskandar',
  description:
    'Curriculum vitae dr. Ferdi Iskandar: profil profesional di pertemuan antara hukum, rekayasa sistem, dan kognisi; pembangun multidisiplin dengan kepemimpinan enterprise berbasis AI yang teregulasi.',
}

export default function Page() {
  return <CVPage />
}
