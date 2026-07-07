import WorksPage from '@/components/WorksPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Karya',
  description:
    'Karya dr. Ferdi Iskandar berupa sistem terapan yang dibangun di pertemuan antara layanan kesehatan, hukum, dan kecerdasan.',
  pathname: '/works',
})

export default function WorksRoute() {
  return <WorksPage />
}
