import KisahSentraPage from '@/components/KisahSentraPage'
import { buildPageMetadata } from '@/lib/site-metadata'

export const metadata = buildPageMetadata({
  title: 'Kisah Sentra',
  description:
    'Perjalanan lengkap Sentra Artificial Intelligence — dari inisiatif CSR RSIA Melinda DHAI menuju ekosistem Human-AI untuk kesehatan, edukasi, dan desain.',
  pathname: '/kisah-sentra',
})

export default function KisahSentraRoute() {
  return <KisahSentraPage />
}
