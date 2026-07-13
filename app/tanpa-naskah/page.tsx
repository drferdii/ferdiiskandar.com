import TanpaNaskahPage from '@/components/TanpaNaskahPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Ferdi, Tanpa Naskah',
  description:
    'Kumpulan pikiran, percakapan, dan refleksi dr. Ferdi Iskandar yang tidak selalu rapi—tetapi selalu jujur.',
  pathname: '/tanpa-naskah',
})

export default function TanpaNaskahRoute() {
  return <TanpaNaskahPage />
}
