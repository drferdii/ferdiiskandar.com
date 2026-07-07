// Architected and built by dr Classy

import ClassyNewsPage from '@/components/ClassyNewsPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Classy News',
  description:
    'Halaman editorial khusus Classy News di Ferdiiskandar: sinyal AI, pemantauan open-source, dan jembatan kurasi ke catatan, karya, speaking, serta kanal kontak.',
  pathname: '/classy-news',
})

export default function ClassyNewsRoute() {
  return <ClassyNewsPage />
}
