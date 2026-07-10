'use client'

// Architected and built by dr Classy

import { useState } from 'react'

import SectionNumberMark from '@/components/SectionNumberMark'

const storyChapters = [
  {
    marker: 'Februari 2025',
    title: 'Inisiatif Awal dari CSR RSIA Melinda DHAI',
    paragraphs: [
      'Sentra Artificial Intelligence bermula dari program tanggung jawab sosial (CSR) di RSIA Melinda DHAI. Tujuannya sederhana: membuat alat bantu AI yang benar-benar berguna untuk layanan kesehatan harian. Kami tidak berniat menggantikan peran manusia, melainkan membantu tenaga medis agar bekerja lebih terarah, konsisten, dan aman. Bersama Bpk. Joseph Arianto, praktisi layanan primer dengan pengalaman 25 tahun lebih, dan asisten saya Sdr. Norma, kami memetakan kendala di lapangan, merancang solusi praktis, mengujinya, lalu terus menyempurnakannya.',
      'Dalam prosesnya, kami menyadari bahwa nilai utama AI bukanlah otomatisasi penuh, melainkan kemampuannya mendampingi manusia.',
      'AI kini kami fungsikan sebagai mitra diskusi, pengolah dokumentasi, pembantu penalaran klinis, sarana edukasi, serta penerjemah data rumit menjadi keputusan praktis.',
    ],
  },
  {
    marker: 'Peralihan',
    title: 'Evolusi Peran AI sebagai Kolaborator Klinis',
    paragraphs: [
      'Fokus kami bergeser ke arah yang lebih spesifik: membangun AI yang langsung terpakai di puskesmas dan klinik pratama.',
      'Kerja bersama ini menjaga agar sistem yang dibuat tetap realistis sesuai kondisi lapangan. Kami bekerja erat dengan lintas profesi medis, mulai dari spesialis kandungan seperti dr. Dibya Arfianda, Sp.OG dan dr. Boyong Baskoro, Sp.OG, dokter umum, perawat, bidan, hingga staf administrasi.',
      'Di sisi teknologi, Nathanael Kevin Susanto, BIT, M.Tech (Software Engineer di Visa Worldwide, Singapura) membantu kami mengawal keandalan sistem dan menerapkan standar rekayasa perangkat lunak skala industri yang aman untuk sektor kesehatan.',
    ],
  },
  {
    marker: 'Kolaborasi Klinis',
    title: 'Kolaborasi Lintas Disiplin dan Standar Teknologi',
    paragraphs: [
      'Kami memegang prinsip bahwa AI tidak boleh hanya menjadi pajangan riset, wacana, atau grafik di dashboard. Manfaat nyata teknologi ini baru terasa ketika digunakan langsung di ruang periksa—membantu dokter mengambil keputusan cepat, menemani pasien, dan mendeteksi risiko klinis lebih awal.',
    ],
  },
  {
    marker: 'Layanan Primer',
    title: 'Implementasi Nyata di Lini Pelayanan Kesehatan',
    paragraphs: [
      'Sistem Sentra kami buat untuk menyatu dengan alur pelayanan klinik—mulai dari pendaftaran, pencatatan rekam medis, triase, analisis klinis awal, edukasi pasien, hingga pemantauan risiko kesehatan.',
      'Kini, Sentra tumbuh menjadi ekosistem yang lebih luas. Selain kecerdasan klinis, kami juga merintis platform edukasi bertenaga AI, Sentra Mitra Design, serta modul operasional yang lahir dari kebutuhan administrasi dan komunikasi sehari-hari.',
    ],
  },
  {
    marker: 'Ekosistem',
    title: 'Ekspansi Menuju Ekosistem AI Terintegrasi',
    paragraphs: [
      'Bagi saya pribadi, Sentra bukan sekadar proyek teknis.',
      'Kami mendedikasikan waktu lebih dari setahun untuk belajar, menguji, dan memperbaiki arah pengembangan. Pengalaman ini membuktikan satu hal: teknologi AI paling berharga ketika bekerja mendampingi manusia sebagai penguat kapasitas intelektual (augmented intelligence), bukan sebagai pengganti.',
    ],
  },
  {
    marker: 'Kerja Pendiri',
    title: 'Perjalanan Personal dan Filosofi Pengembangan',
    paragraphs: [
      'Perjalanan dari sekadar program CSR ini mengkristal menjadi misi jangka panjang: membangun ekosistem kesehatan tempat keahlian manusia tetap menjadi pusat kendali. Di sini, AI bertugas merapikan informasi, menyajikan data pendukung keputusan, mempercepat proses belajar, dan membantu tim medis mengantisipasi risiko secara proaktif.',
    ],
  },
  {
    marker: 'Misi',
    title: 'Visi Kolaborasi Manusia dan AI di Masa Depan',
    paragraphs: [
      'Kami percaya masa depan tidak ditentukan oleh kecerdasan buatan semata, melainkan oleh keharmonisan kolaborasi antara manusia dan teknologi. Ini melibatkan kerja bersama para dokter, perawat, pendidik, desainer, pengambil kebijakan, serta masyarakat luas.',
    ],
  },
  {
    marker: 'Saat Ini',
    title: 'Komitmen Sentra Artificial Intelligence',
    paragraphs: [
      'Sentra tetap berkomitmen menyediakan ekosistem AI yang praktis, aman, dan berangkat dari masalah nyata di puskesmas. Keputusan klinis dan tanggung jawab penuh tetap berada di tangan dokter atau tenaga medis. Tugas AI adalah merangkum informasi penting secara cepat agar tenaga medis dapat menegakkan diagnosis terbaik bagi pasien.',
    ],
  },
]

// Rendered as a static sibling outside the panned scroll-story wrapper (see
// PortfolioStory.tsx) so the title never gets carried off-screen by the
// scene's internal pan transform.
export function StoryHeader() {
  return (
    <header className="fi-story-head">
      <SectionNumberMark number="04" />
      <div className="fi-story-headline">
        <div className="fi-story-headline-copy">
          <div className="fi-kicker">Kisah Sentra</div>
          <h2 className="fi-story-title" id="story-sentra-title">
            Perjalanan Sentra Artificial Intelligence
          </h2>
          <p className="fi-story-subtitle">
            Dari Inisiatif CSR menuju Ekosistem Human-AI untuk Kesehatan, Edukasi, dan Desain
          </p>
        </div>
        <figure aria-label="Kolaborator Sentra" className="fi-story-portrait">
          <video
            aria-label="Video promosi Sentra Artificial Intelligence"
            autoPlay
            className="fi-story-portrait-image"
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/promovideo.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>
    </header>
  )
}

export default function StoryOfSentra() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const activeChapter = storyChapters[activeChapterIndex] ?? storyChapters[0]

  return (
    <article className="fi-story">
      <div className="fi-story-board-dropdown">
        <div className="fi-story-selector-container">
          <label htmlFor="chapter-select" className="fi-story-select-label">
            Pilih Bab Perjalanan:
          </label>
          <div className="fi-story-select-wrapper">
            <select
              id="chapter-select"
              className="fi-story-select"
              value={activeChapterIndex}
              onChange={(e) => setActiveChapterIndex(Number(e.target.value))}
            >
              {storyChapters.map((chapter, index) => (
                <option key={chapter.title} value={index}>
                  {String(index + 1).padStart(2, '0')} — {chapter.marker}: {chapter.title}
                </option>
              ))}
            </select>
            <span className="fi-story-select-arrow" aria-hidden="true">
              ▼
            </span>
          </div>
        </div>

        <section
          aria-live="polite"
          aria-labelledby={`story-sentra-chapter-${activeChapterIndex}`}
          className="fi-story-reader"
          id="story-sentra-reader"
          key={activeChapterIndex}
        >
          <span className="fi-story-reader-marker">{activeChapter.marker}</span>
          <h3 id={`story-sentra-chapter-${activeChapterIndex}`}>{activeChapter.title}</h3>
          {activeChapter.paragraphs.map((paragraph) => (
            <p key={paragraph} className="fi-story-reader-paragraph">
              {paragraph}
            </p>
          ))}
        </section>
      </div>
    </article>
  )
}
