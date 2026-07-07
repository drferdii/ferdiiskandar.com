// Architected and built by dr Classy

import NotesPage from '@/components/NotesPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Catatan dr Ferdi',
  description:
    'Catatan dr Ferdi berisi pilihan tulisan aktual dari Medium mengenai AI medis, kepemimpinan healthcare, dan refleksi institusional.',
  pathname: '/notes',
})

export default function NotesRoute() {
  return <NotesPage />
}
