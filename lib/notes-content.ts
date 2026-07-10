// Architected and built by dr Classy

export const notesHero = {
  eyebrow: 'Ruang Observasi',
  issue: 'Meja Catatan / Edisi Terpilih',
  date: 'Kurasi aktif',
  title: 'Catatan dr Ferdi Iskandar',
  paragraphs: [
    'Setiap keputusan melewati satu tahap yang sering dilewatkan: observasi sebelum kesimpulan diambil.',
    'Peristiwa diberi jarak sebelum disimpulkan. Percakapan diberi waktu sebelum dijadikan pendapat. Di situlah pemahaman yang lebih jernih terbentuk.',
    'Catatan ini adalah ruang itu — bukan untuk mengejar kecepatan atau menunjukkan kepintaran, tapi untuk membaca pola dan menemukan makna di balik hal yang terlihat biasa.',
    'Menulis, bagi saya, bukan mencatat apa yang terjadi. Menulis adalah cara memahami mengapa itu terjadi, dan ke mana kita harus bergerak setelahnya.',
  ],
} as const

export const notesIndexEntries = [
  {
    number: '01',
    title: 'Pengantar',
    detail: 'Cara membaca halaman ini',
    href: '#notes-foreword',
  },
  {
    number: '02',
    title: 'Struktur',
    detail: 'Susunan baca dan prinsip kurasi',
    href: '#notes-order',
  },
  {
    number: '03',
    title: 'Medium',
    detail: 'Tulisan aktual yang terbit',
    href: '#notes-medium',
  },
  {
    number: '04',
    title: 'Penutup',
    detail: 'Dari tulisan menuju percakapan',
    href: '#notes-closing',
  },
] as const

export const notesDeskStats = [
  {
    value: '05',
    label: 'tulisan terkurasi',
  },
  {
    value: '01',
    label: 'substansi dulu',
  },
  {
    value: '03',
    label: 'tema utama',
  },
] as const

export const notesLedgerCards = [
  {
    number: '01',
    title: 'Tulisan aktual',
    body: 'Halaman ini menempatkan tulisan sebagai jejak pemikiran yang bisa dibaca ulang, bukan sekadar daftar publikasi yang lewat begitu saja.',
  },
  {
    number: '02',
    title: 'Konteks sebelum tautan',
    body: 'Setiap item diberi alasan kehadiran: apa gagasan utamanya, mengapa relevan, dan bagaimana ia tersambung ke agenda yang lebih besar.',
  },
  {
    number: '03',
    title: 'Bahasa tunggal',
    body: 'Seluruh halaman disusun penuh dalam Bahasa Indonesia agar terasa lebih utuh dan tidak terpecah antara dua mode editorial.',
  },
] as const

export const notesReadingOrder = [
  {
    number: '01',
    title: 'Baca sebagai arsip pemikiran',
    body: 'Urutannya dibuat untuk membantu pembacaan yang tenang: pengantar singkat, satu tulisan utama, lalu rak lanjutan yang masih satu napas.',
  },
  {
    number: '02',
    title: 'Satu tulisan utama lebih dominan',
    body: 'Tulisan terbaru di Medium ditampilkan sebagai sorotan utama agar pembaca langsung melihat titik masuk yang paling aktual.',
  },
  {
    number: '03',
    title: 'Daftar lanjutan tetap terhubung',
    body: 'Artikel lain di bawahnya memperluas pembahasan yang sama: migrasi engram adaptif, trajektori klinis berbasis AI, dan halusinasi sebagai mekanisme adaptif otak.',
  },
] as const

export const notesDeskCards = [
  {
    label: 'Arah Baca',
    title: 'Dari hipotesis mekanistik menuju penerapan klinis.',
    body: 'Catatan diposisikan sebagai jembatan antara hipotesis neuro-kognitif yang sedang dikembangkan, penerapan AI pada trajektori klinis, dan kebutuhan layanan kesehatan primer di Indonesia.',
  },
  {
    label: 'Ruang Editorial',
    title: 'Lebih dekat ke meja baca daripada ruang riuh.',
    body: 'Setiap item diberi konteks agar pembaca tahu mengapa tulisan itu ada di rak ini, bukan sekadar melihat daftar tautan keluar.',
  },
  {
    label: 'Prinsip Kurasi',
    title: 'Yang penting dibuat terlihat, yang bising disisihkan.',
    body: 'Halaman ini mengutamakan hierarki, ritme baca, dan kredibilitas rujukan dibanding animasi atau dekorasi yang tidak membantu pemahaman.',
  },
] as const

export const mediumArchive = {
  title: 'Tulisan di Medium',
  subtitle: 'Pilihan tulisan aktual dari profil Medium dr Ferdi',
  href: 'https://medium.com/@drferdiiskandar',
  label: 'Buka Arsip Medium',
} as const

export const mediumFeaturedPost = {
  label: 'Tulisan Terbaru',
  code: 'MED-LATEST',
  date: 'Jun 11',
  title: 'The Adaptive Engram Migration Hypothesis',
  synopsis:
    'Tulisan terbaru yang tampil di profil Medium saat pengecekan mengajukan hipotesis migrasi engram adaptif, membaca fenomena kerasukan (possession trance) sebagai kaskade disosiatif yang terbentuk secara kultural dalam respons stres neuro-kultural.',
  body: 'Bagian ini sengaja dibuat paling dominan agar pembaca langsung melihat tulisan paling aktual terlebih dahulu. Daftar di bawahnya berfungsi sebagai rak lanjutan untuk artikel lain yang benar-benar sudah terbit.',
  href: 'https://medium.com/@drferdiiskandar/the-adaptive-engram-migration-hypothesis-2f9e551131e3',
  cta: 'Buka Tulisan Terbaru',
} as const

export const mediumEntries = [
  {
    code: 'MED-01',
    date: 'Jun 9',
    title: 'AI-Mediated Real-Time Diagnostic Course Correction',
    synopsis:
      'Kerangka mekanistik untuk sistem trajektori klinis, dibahas dalam konteks pelayanan kesehatan di Indonesia.',
    body: 'Ditampilkan sebagai bacaan lanjutan yang menyambungkan model koreksi diagnostik berbasis AI dengan realitas sistem layanan kesehatan di Indonesia.',
    href: 'https://medium.com/@drferdiiskandar/ai-mediated-real-time-diagnostic-course-correction-5e8026049858',
    cta: 'Baca di Medium',
  },
  {
    code: 'MED-02',
    date: 'Jun 8',
    title:
      'Adaptive Engram Migration as a Trigger for Transient Auditory Hallucinations in the Aging Brain',
    synopsis:
      'Hipotesis mekanistik yang mengajukan migrasi engram adaptif sebagai salah satu pemicu halusinasi auditori sementara pada otak yang menua.',
    body: 'Masuk sebagai artikel lanjutan yang memperluas hipotesis migrasi engram ke ranah neurodegeneratif dan penuaan.',
    href: 'https://medium.com/@drferdiiskandar/adaptive-engram-migration-as-a-trigger-for-transient-auditory-hallucinations-in-the-aging-brain-a-2e10d99034e4',
    cta: 'Baca di Medium',
  },
  {
    code: 'MED-03',
    date: 'Jun 8',
    title: 'Real-Time Clinical Trajectory Modeling',
    synopsis:
      'Kerangka komputasional untuk mencegat perkembangan penyakit lebih awal, disusun untuk konteks layanan primer dengan sumber daya terbatas.',
    body: 'Diletakkan sebagai bagian dari rak tulisan yang memperlihatkan sisi teknis dari pemodelan trajektori klinis di layanan primer.',
    href: 'https://medium.com/@drferdiiskandar/real-time-clinical-trajectory-modeling-a-computational-framework-for-intercepting-disease-6aa8e8e80fd9',
    cta: 'Baca di Medium',
  },
  {
    code: 'MED-04',
    date: 'Jun 4',
    title: 'Hallucination as a Patching Mechanism',
    synopsis:
      'Membaca ulang persepsi akibat kelelahan sebagai bentuk kompensasi top-down yang adaptif, bukan sekadar kegagalan kognitif.',
    body: 'Menutup rak ini sebagai tulisan yang menyambungkan tema halusinasi dengan mekanisme adaptif otak yang dibahas pada artikel-artikel sebelumnya.',
    href: 'https://medium.com/@drferdiiskandar/hallucination-as-a-patching-mechanism-reframing-fatigue-induced-perception-as-adaptive-top-down-12bef78e85b6',
    cta: 'Baca di Medium',
  },
] as const

export const notesGlanceSections = [
  {
    title: 'Logika Arsip',
    items: [
      'Tulisan ditempatkan sebagai jejak berpikir yang bisa dibaca ulang.',
      'Setiap tautan diberi konteks sebelum pembaca berpindah halaman.',
      'Satu tulisan terbaru dibuat lebih dominan sebagai titik masuk utama.',
    ],
  },
  {
    title: 'Tema Berulang',
    items: [
      'Migrasi engram adaptif dan implikasinya',
      'Trajektori klinis dan koreksi diagnostik berbasis AI',
      'Halusinasi sebagai mekanisme adaptif otak',
    ],
  },
  {
    title: 'Mode Baca',
    items: [
      'Tenang, presisi, editorial',
      'Hierarki publikasi yang tegas',
      'Dibangun untuk dibaca ulang sebagai rak pemikiran',
    ],
  },
] as const

export const notesClosing = {
  title:
    'Jika sebuah tulisan terasa relevan, langkah berikutnya adalah percakapan yang lebih jernih.',
  body: 'Halaman ini dimaksudkan sebagai rak baca yang ringkas namun jelas. Jika salah satu tulisan menyentuh agenda institusional, AI kesehatan, atau arah transformasi yang sedang dihadapi, percakapan lanjutan sebaiknya dimulai dari substansi, bukan dari kebisingan presentasi.',
  primaryHref: '/#contact',
  primaryLabel: 'Mulai Percakapan',
  secondaryHref: '/about',
  secondaryLabel: 'Lihat Profil',
} as const
