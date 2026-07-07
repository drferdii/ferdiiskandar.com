'use client'

import { motion, useReducedMotion } from 'framer-motion'

import SectionNumberMark from '@/components/SectionNumberMark'
import {
  getRevealInitial,
  motionVariants,
  staggerContainer,
  motionViewport,
  transitions,
} from '@/lib/motion-variants'
import { useMotionReady } from '@/lib/use-motion-ready'

const cells = [
  {
    num: '01',
    title: 'Sentra Healthcare Artificial Intelligence',
    desc: 'Membangun arsitektur sistem klinis yang membantu tenaga medis membaca sinyal, risiko, dan konteks secara lebih cepat dan terstruktur.',
  },
  {
    num: '02',
    title: 'Sistem Kecerdasan Pendidikan',
    desc: 'Membangun sistem pembelajaran, riset, dan kerja pengetahuan yang membantu orang belajar lebih terarah, menstrukturkan pemikiran, dan bekerja dengan dukungan AI yang bertanggung jawab.',
  },
  {
    num: '03',
    title: 'Sistem Pengalaman Digital',
    desc: 'Merancang website dan permukaan digital editorial yang membangun kepercayaan, menjelaskan sistem yang kompleks, dan memberi pengalaman publik yang lebih jernih.',
  },
  {
    num: '04',
    title: 'Sistem Koordinasi Tenaga Kerja',
    desc: 'Mengembangkan sistem untuk manajemen karyawan, koordinasi tim, dan visibilitas operasional agar struktur kerja menjadi lebih jelas, rapi, dan dapat diandalkan.',
  },
  {
    num: '05',
    title: 'Arsitek Prompt dan Transformer',
    desc: 'Merancang sistem prompt, pola penalaran, dan pemanfaatan transformer agar AI bekerja lebih terarah, konsisten, dan dapat dikendalikan.',
  },
  {
    num: '06',
    title: 'Pengarah Koreografi Sistem',
    desc: 'Menyusun orkestrasi antar sistem, agen, alur kerja, dan lapisan keputusan agar teknologi bergerak sebagai satu ekosistem yang koheren.',
  },
  {
    num: '07',
    title: 'Pengarah Otomasi Utama',
    desc: 'Mengarahkan otomasi agar tidak sekadar mempercepat pekerjaan, tetapi mengurangi gesekan, menjaga konteks, dan meningkatkan reliabilitas operasional.',
  },
  {
    num: '08',
    title: 'Pengarah Koordinasi Proses dan Layanan',
    desc: 'Menghubungkan proses layanan, koordinasi manusia, dan sistem digital agar pengalaman kerja klinis menjadi lebih jelas, rapi, dan terukur.',
  },
]

export default function Impact() {
  const shouldReduce = useReducedMotion()
  const isMotionReady = useMotionReady()
  const revealInitial = getRevealInitial(isMotionReady, shouldReduce, 'hidden')

  return (
    <section className="fi-section" id="impact">
      <motion.div
        className="fi-section-head"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={motionVariants.slideIn}
        transition={shouldReduce ? { duration: 0 } : transitions.medium}
      >
        <SectionNumberMark number="01" />
        <div>
          <div className="fi-kicker">Fokus</div>
          <h2 className="fi-section-title">Leadership with clinical gravity</h2>
          <p className="fi-section-lead">
            Ini adalah rekam jejak seorang pendiri-arsitek yang membangun sistem kecerdasan di bawah
            tekanan institusional, kompleksitas operasional, dan tuntutan kepercayaan publik.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="fi-impact-grid"
        initial={revealInitial}
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainer(0.08, 0.1)}
        transition={shouldReduce ? { staggerChildren: 0, delayChildren: 0 } : undefined}
      >
        {cells.map((cell) => (
          <motion.article
            className="fi-impact-cell"
            key={cell.num}
            variants={motionVariants.scaleReveal}
            transition={shouldReduce ? { duration: 0 } : transitions.medium}
          >
            <span className="fi-num">{cell.num}</span>
            <div>
              <h3>{cell.title}</h3>
              <p>{cell.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
