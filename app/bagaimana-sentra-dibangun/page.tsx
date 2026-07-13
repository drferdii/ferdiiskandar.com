import SebelumPasienJatuhPage from '@/components/SebelumPasienJatuhPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Bagaimana Sentra Dibangun',
  description:
    'Percakapan dr. Ferdi Iskandar dan Voss tentang batas prediksi klinis, FTDR, coupling detection, dan bagaimana arsitektur Sentra dibentuk sebelum pasien jatuh.',
  pathname: '/bagaimana-sentra-dibangun',
})

export default function BagaimanaSentraDibangunRoute() {
  return <SebelumPasienJatuhPage />
}
