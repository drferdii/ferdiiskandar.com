import AboutPage from '@/components/AboutPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Profil',
  description:
    'Posisi profesional dan cara pandang dr. Ferdi Iskandar sebagai physician-founder yang membangun kecerdasan terapan di sektor layanan kesehatan, pendidikan, tenaga kerja, dan pengalaman digital.',
  pathname: '/about',
})

export default function AboutRoute() {
  return <AboutPage />
}
