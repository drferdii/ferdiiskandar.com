export const cvHero = {
  sectionLabel: 'Curriculum Vitae / Bagian 07',
  name: 'dr. Ferdi Iskandar',
  credentials: 'dr., SH, MKN, APEPC™, CAIPC®, Google Dev, Minimax AI',
  profileEyebrow: 'Profil Profesional',
  profileIntersectionLines: ['Di pertemuan antara', 'hukum, kode, dan kognisi.'] as const,
  profileBody:
    'Lintas disiplin adalah kekuatan. Dari interpretasi regulasi teknologi hingga arsitektur model fondasi, setiap keputusan diinformasikan oleh perspektif multidimensional. Bukan sekadar pengembang. Bukan sekadar akademisi. Seorang pembangun yang memahami sistem secara utuh.',
  profileMottoLines: ['Setiap gelar ditempuh.', 'Setiap standar dibuktikan.'] as const,
  profileClosing:
    'Kombinasi keahlian hukum, keamanan siber, manajemen risiko, dan arsitektur cloud menciptakan fondasi unik untuk memimpin dalam era perusahaan yang diatur oleh AI.',
} as const

export const cvHeroMetrics = [
  { label: 'Kepemimpinan RS', value: '2016 — Saat ini', detail: 'Direktur Utama, RSIA Melinda DHAI' },
  { label: 'AI Kesehatan', value: '2025', detail: 'Founder & CEO, Sentra AI' },
  { label: 'Layanan Primer', value: '2021 — Saat ini', detail: 'Dokter definitif' },
] as const

export const cvIndexEntries = [
  { number: '01', title: 'Profil', detail: 'Ringkasan eksekutif', href: '#cv-profile' },
  { number: '02', title: 'Pengalaman', detail: 'Linimasa karier', href: '#cv-experience' },
  { number: '03', title: 'Pendidikan', detail: 'Rekam akademik', href: '#cv-education' },
  { number: '04', title: 'Sertifikasi', detail: 'Kredensial profesional', href: '#cv-certifications' },
  { number: '05', title: 'Riset', detail: 'Publikasi', href: '#cv-research' },
  { number: '06', title: 'Unduh', detail: 'CV lengkap · PDF', href: '#cv-download' },
] as const

export const cvProfile = {
  eyebrow: 'Profil Eksekutif',
  body: [
    'dr. Ferdi Iskandar bukan teknolog yang baru menemukan layanan kesehatan. Ia adalah klinisi, CEO rumah sakit, dan pemikir hukum yang membangun perusahaan AI karena masalahnya memang menuntut itu.',
    'Jalurnya tidak konvensional secara sadar: hukum sebelum kedokteran, praktik gawat darurat sebelum kepemimpinan institusional, dan satu dekade menjalankan fasilitas klinis sebelum menulis sistem AI produksi. Urutan ini penting karena setiap sistem yang ia bangun dibentuk oleh seseorang yang pernah memikul akuntabilitas atas hasil pasien, bukan hanya performa model.',
    'Melalui Sentra Artificial Intelligence, ia menerjemahkan pengalaman institusional itu menjadi AI kesehatan yang praktis, dapat dijelaskan, dan preventif, dengan fokus pada trajektori klinis, sistem peringatan dini, dan operasi rumah sakit yang berangkat dari cara kerja AI sejak awal.',
  ],
  tagline: 'Dibangun dari dalam realitas layanan kesehatan, bukan dari luar.',
} as const

export type ExperienceStatus = 'current' | 'past'

export type ExperienceItem = {
  id: string
  number: string
  role: string
  organization: string
  displayTitle?: string
  years: string
  status: ExperienceStatus
  description: string
}

export const cvExperience: ExperienceItem[] = [
  {
    id: 'sentra-ai',
    number: '01',
    role: 'Founder & CEO',
    organization: 'Sentra AI',
    years: '2025',
    status: 'current',
    description:
      'Membangun sistem operasi untuk layanan kesehatan preventif. Sentra mengembangkan sistem trajektori klinis, operasi rumah sakit yang berangkat dari cara kerja AI sejak awal, dan pendukung keputusan klinis generasi berikutnya yang berakar pada 12 tahun kepemimpinan rumah sakit langsung dan praktik klinis lini depan. Perusahaan ini menjadi respons institusional langsung atas kerentanan sistemik yang terlihat dalam operasi rumah sakit.',
  },
  {
    id: 'indonesia-ai-hub-member',
    number: '02',
    role: 'Member',
    organization: 'Indonesia Artificial Intelligence HUB',
    displayTitle: 'Member of Indonesia Artificial Intelligence HUB',
    years: '2026',
    status: 'current',
    description:
      'Bergabung sebagai anggota Indonesia Artificial Intelligence HUB pada 2026 sebagai bagian dari jejaring pengembangan AI nasional, pertukaran pengetahuan, dan kolaborasi lintas sektor.',
  },
  {
    id: 'data-science-indonesia-member',
    number: '03',
    role: 'Member',
    organization: 'Data Science Indonesia',
    displayTitle: 'Member of Data Science Indonesia',
    years: '2026',
    status: 'current',
    description:
      'Bergabung sebagai anggota Data Science Indonesia pada 2026 untuk memperkuat keterlibatan profesional dalam ekosistem data science, AI, dan pembelajaran komunitas berbasis praktik.',
  },
  {
    id: 'apsai-board-member',
    number: '04',
    role: 'Pengurus',
    organization: 'Asosiasi Perusahaan Sahabat Anak Indonesia (APSAI)',
    displayTitle: 'Pengurus Asosiasi Perusahaan Sahabat Anak Indonesia (APSAI)',
    years: '2023 — Saat ini',
    status: 'current',
    description:
      'Berperan dalam kepengurusan Asosiasi Perusahaan Sahabat Anak Indonesia (APSAI) sebagai bagian dari jejaring profesional yang menguatkan tata kelola, kolaborasi, dan kontribusi lintas institusi.',
  },
  {
    id: 'idi-kediri-bhp2a',
    number: '05',
    role: 'Pengurus Biro Hukum, Pembinaan dan Pembelaan Anggota (BHP2A)',
    organization: 'IDI Kota Kediri',
    years: '2023 — Saat ini',
    status: 'current',
    description:
      'Mendukung fungsi hukum, pembinaan, dan pembelaan anggota di IDI Kota Kediri melalui peran kepengurusan BHP2A.',
  },
  {
    id: 'q-sehat-group',
    number: '06',
    role: 'Q-Sehat Group',
    organization: 'Q-Sehat Group',
    years: '2022',
    status: 'past',
    description:
      'Terlibat dalam Q-Sehat Group pada 2022 sebagai bagian dari rekam pengalaman profesional di layanan kesehatan dan ekosistem operasional klinis.',
  },
  {
    id: 'primary-care-definitive-doctor',
    number: '07',
    role: 'Dokter Definitif Layanan Primer',
    organization: 'Layanan Primer',
    years: '2021 — Saat ini',
    status: 'current',
    description:
      'Menjalankan peran klinis definitif pada layanan primer sampai saat ini, dengan fokus pada kesinambungan pelayanan, penilaian awal, dan akuntabilitas keputusan klinis pada titik kontak pertama pasien.',
  },
  {
    id: 'rsia-melinda-commissioner',
    number: '08',
    role: 'Komisaris',
    organization: 'RSIA Melinda DHAI',
    years: '2019 — 2021',
    status: 'past',
    description:
      'Memegang fungsi pengawasan institusional pada RSIA Melinda DHAI, dengan perhatian pada kesinambungan tata kelola, arah strategis, dan akuntabilitas layanan rumah sakit.',
  },
  {
    id: 'rsia-melinda',
    number: '09',
    role: 'Direktur Utama',
    organization: 'RSIA Melinda DHAI',
    years: '2016 — Saat ini',
    status: 'current',
    description:
      'Memimpin rumah sakit ibu dan anak swasta melalui hampir satu dekade transformasi operasional, klinis, dan strategis. Bertanggung jawab atas tata kelola klinis, arsitektur keselamatan pasien, mutu layanan, dan performa institusi. Fasilitas ini mempertahankan catatan nol mortalitas sebelum Februari 2025, ketika paparan eksternal sistemik mendorong lahirnya Sentra. Rumah sakit kini menjadi lingkungan implementasi nyata utama untuk operasi klinis yang terintegrasi AI.',
  },
  {
    id: 'er-clinician',
    number: '10',
    role: 'Klinisi Instalasi Gawat Darurat',
    organization: 'RSUD Koesnadi Bondowoso · RSUD Moch. Saleh Probolinggo · RSUD Ibnu Sina Gresik',
    years: '2014 — 2016',
    status: 'past',
    description:
      'Praktik klinis lini depan dalam kedokteran gawat darurat di RSUD Koesnadi Bondowoso, RSUD Moch. Saleh Probolinggo, dan RSUD Ibnu Sina Gresik, dengan paparan langsung pada pengambilan keputusan akut di bawah tekanan waktu, keterbatasan sumber daya, dan kondisi berisiko tinggi.',
  },
  {
    id: 'ivao-executive-committee',
    number: '11',
    role: 'Executive Committee',
    organization: 'The International Virtual Aviation Organisation',
    years: '2008 — 2019',
    status: 'past',
    description:
      'Menjalankan peran kepemimpinan organisasi internasional dalam ekosistem virtual aviation, dengan fokus pada koordinasi, tata kelola, dan kesinambungan operasional komunitas.',
  },
  {
    id: 'ivao-npo-belgium-board-governors',
    number: '12',
    role: 'Board of Governors',
    organization: 'IVAO NPO Belgium',
    years: '2008 — 2019',
    status: 'past',
    description:
      'Berperan dalam Board of Governors IVAO NPO Belgium untuk mendukung arah organisasi, tata kelola, dan akuntabilitas institusional.',
  },
]

export type EducationItem = {
  id: string
  number: string
  degree: string
  field: string
  institution: string
  years: string
  description: string
}

export const cvEducation: EducationItem[] = [
  {
    id: 'medicine',
    number: 'EDU-01',
    degree: 'Sarjana Kedokteran',
    field: 'Kedokteran Umum',
    institution: 'Universitas Wijaya Kusuma',
    years: '2008 — 2013',
    description:
      'Gelar kedokteran menjadi titik balik yang mengubah pemikir hukum menjadi klinisi. Kombinasi langka antara hukum dan kedokteran kemudian menjadi fondasi struktural untuk membangun AI kesehatan yang kuat secara klinis dan akuntabel secara institusional.',
  },
  {
    id: 's2-hukum',
    number: 'EDU-02',
    degree: 'Magister Kenotariatan',
    field: 'Hukum Kenotariatan (MKN)',
    institution: 'Universitas Ubaya',
    years: '2005 — 2008',
    description:
      'Studi hukum pascasarjana dengan tesis mengenai fertilisasi in vitro dari perspektif ibu pengganti, sebagai keterlibatan awal dengan dimensi etik dan hukum teknologi medis, hak reproduksi, serta tanggung jawab institusional.',
  },
  {
    id: 's1-hukum',
    number: 'EDU-03',
    degree: 'Sarjana Hukum',
    field: 'Ilmu Hukum (SH)',
    institution: 'Universitas Ubaya',
    years: '2001 — 2005',
    description:
      'Awal dari disiplin yang kemudian membentuk karier di pertemuan kedokteran, tata kelola klinis, dan etika AI. Hukum bukan jalan memutar; ia menjadi lensa untuk memahami sistem kesehatan, tanggung jawab institusi, dan hak pasien.',
  },
]

export type PublicationStatus = 'forthcoming' | 'in-preparation' | 'under-review' | 'published'

export type PublicationItem = {
  id: string
  number: string
  title: string
  subtitle: string
  status: PublicationStatus
  year: string
  tags: string[]
  abstract: string
}

export const cvPublications: PublicationItem[] = [
  {
    id: 'culturally-grounded-prompt-engineering-indonesian-contexts',
    number: 'PUB-00',
    title: 'Culturally Grounded Prompt Engineering for Indonesian Contexts',
    subtitle: 'Forthcoming',
    status: 'forthcoming',
    year: 'Akan Datang',
    tags: ['Prompt Engineering', 'Indonesian Contexts', 'Cultural AI', 'Human-AI Interaction'],
    abstract:
      'Riset yang sedang disiapkan tentang rekayasa prompt yang berakar pada konteks budaya Indonesia, dengan fokus pada cara bahasa, norma sosial, nilai lokal, dan struktur komunikasi memengaruhi kualitas interaksi manusia dengan sistem AI.',
  },
  {
    id: 'clinical-trajectory-algorithm-kaggle',
    number: 'PUB-01',
    title: 'Clinical Trajectory Algorithm',
    subtitle: 'Published at Kaggle',
    status: 'published',
    year: '2025',
    tags: ['Clinical Trajectory', 'Kaggle', 'Healthcare AI', 'Predictive Systems'],
    abstract:
      'Publikasi riset dan eksplorasi algoritmik mengenai trajektori klinis di Kaggle, berfokus pada pembacaan arah risiko pasien, sinyal klinis longitudinal, dan penerapan kecerdasan buatan untuk sistem kesehatan yang lebih preventif.',
  },
  {
    id: 'tcma',
    number: 'PUB-02',
    title: 'The Clinical Mind Algorithm (TCMA)',
    subtitle:
      'Toward Replication of Human Clinical Cognition through a Biomimetic Computational Neuroscience Approach',
    status: 'published',
    year: '2026',
    tags: [
      'Biomimetic AI',
      'Spiking Neural Networks',
      'Neuro-Symbolic AI',
      'Digital Twin Brain',
      'Clinical Decision Support',
    ],
    abstract:
      'Analisis integratif atas Digital Twin Brain dan Neuro-Symbolic AI untuk arsitektur pendukung keputusan klinis generasi berikutnya. Makalah ini mengusulkan perluasan TCMA ke arsitektur neurosimbolik yang mengintegrasikan primitif sinaptik, TAN termodulasi asetilkolin, dan dinamika temporal spiking. Prototipe simulasi pada 100 pasien urban menghasilkan akurasi 94% dan explainability 92%. Arah risetnya memprediksi pendukung keputusan klinis setara manusia pada 2027.',
  },
  {
    id: 'in-vitro-surrogate-mother-thesis',
    number: 'PUB-03',
    title: 'Fertilisasi In Vitro dari Sudut Pandang Surrogate Mother',
    subtitle: 'Tesis Magister Kenotariatan',
    status: 'published',
    year: '2008',
    tags: ['Hukum Kesehatan', 'Fertilisasi In Vitro', 'Surrogate Mother', 'Etika Medis'],
    abstract:
      'Tesis akademik yang membahas fertilisasi in vitro dari sudut pandang surrogate mother, dengan perhatian pada dimensi hukum, etik, hak reproduksi, dan tanggung jawab institusional dalam teknologi medis reproduksi.',
  },
]

export const cvCredentials = [
  { code: 'dr.', label: 'Dokter', source: 'Universitas Wijaya Kusuma', scope: 'national' },
  { code: 'SH', label: 'Sarjana Hukum', source: 'Universitas Ubaya', scope: 'national' },
  { code: 'MKN', label: 'Magister Kenotariatan', source: 'Universitas Ubaya', scope: 'national' },
  {
    code: 'APEPC™',
    label: 'AI Prompt Engineering Professional Certification',
    source: 'CertiProf · 2026',
    scope: 'international',
  },
  {
    code: 'CAIPC®',
    label: 'Artificial Intelligence Professional Certificate',
    source: 'CertiProf · 2026',
    scope: 'international',
  },
  {
    code: 'Google Dev',
    label: 'Premium Tier Google Developer Program',
    source: 'Program · 2025',
    scope: 'international',
  },
  {
    code: 'Minimax AI',
    label: 'Part of Minimax Artificial Intelligence Developer Program',
    source: 'Program · 2025',
    scope: 'international',
  },
] as const

export const cvCertifications = cvCredentials.filter(
  (credential) => !['dr.', 'SH', 'MKN'].includes(credential.code),
)

export const cvGlanceSections = [
  {
    title: 'Peran Aktif',
    items: [
      'Founder & CEO, Sentra AI',
      'Member, Indonesia Artificial Intelligence HUB',
      'Member, Data Science Indonesia',
      'Direktur Utama, RSIA Melinda DHAI',
      'Dokter Definitif Layanan Primer',
      'Pengurus APSAI',
      'Pengurus IDI Kota Kediri BHP2A',
    ],
  },
  {
    title: 'Kredensial',
    items: ['dr. · SH · MKN'],
  },
  {
    title: 'Sertifikasi',
    items: ['APEPC™', 'CAIPC®', 'Google Dev', 'Minimax AI'],
  },
  {
    title: 'Pendidikan',
    items: ['Universitas Wijaya Kusuma', 'Universitas Ubaya (×2)'],
  },
  {
    title: 'Riset',
    items: [
      'Clinical Trajectory Algorithm — Published at Kaggle',
      'Culturally Grounded Prompt Engineering — Akan Datang',
      'TCMA — Released',
      'Tesis Fertilisasi In Vitro — Surrogate Mother',
    ],
  },
  {
    title: 'Latar Belakang',
    items: [
      'Hukum dan tata kelola',
      'Kedokteran klinis',
      'Kepemimpinan rumah sakit',
      'Kecerdasan buatan',
    ],
  },
] as const
