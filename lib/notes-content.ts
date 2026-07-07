// Architected and built by dr Classy

export const notesHero = {
  eyebrow: 'Ruang Observasi',
  issue: 'Meja Catatan / Edisi Terpilih',
  date: 'Kurasi aktif',
  title: 'Catatan dr Ferdi',
  paragraphs: [
    'Sebelum sebuah keputusan menjadi tindakan, ia selalu melewati ruang observasi.',
    'Di ruang itu, pengalaman diperiksa kembali. Peristiwa tidak langsung disimpulkan. Percakapan tidak langsung dijadikan pendapat. Setiap hal diberi jarak, dilihat ulang, lalu disusun menjadi pemahaman yang lebih jernih.',
    'Catatan ini adalah ruang observasi tersebut.',
    'Bukan tempat untuk mengejar kecepatan, bukan juga panggung untuk menunjukkan kepintaran. Ia adalah ruang untuk memperlambat pikiran, membaca pola, dan menemukan makna di balik hal-hal yang sering terlihat biasa.',
    'Karena bagi saya, menulis bukan sekadar mencatat apa yang terjadi. Menulis adalah cara memahami mengapa sesuatu terjadi, apa artinya, dan ke mana seharusnya kita bergerak setelahnya.',
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
    value: '04',
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
    body: 'Artikel lain di bawahnya memperluas pembahasan yang sama: AI medis, implementasi, empati dokter, dan cara institusi mengambil keputusan.',
  },
] as const

export const notesDeskCards = [
  {
    label: 'Arah Baca',
    title: 'Dari beban administrasi menuju desain institusi.',
    body: 'Catatan diposisikan sebagai jembatan antara praktik medis sehari-hari, model AI yang sedang berubah cepat, dan kebutuhan organisasi untuk mengambil keputusan dengan lebih tenang.',
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
  href: 'https://medium.com/@claudesy.id',
  label: 'Buka Arsip Medium',
} as const

export const mediumFeaturedPost = {
  label: 'Tulisan Terbaru',
  code: 'MED-LATEST',
  date: 'Mar 16',
  title: 'Peran Generative AI dalam Reduksi Beban Administrasi Medis.',
  synopsis:
    'Tulisan terbaru yang tampil di profil Medium saat pengecekan menyorot bagaimana AI generatif dapat membantu mengurangi beban administratif medis tanpa mengaburkan tanggung jawab profesional.',
  body: 'Bagian ini sengaja dibuat paling dominan agar pembaca langsung melihat tulisan paling aktual terlebih dahulu. Daftar di bawahnya berfungsi sebagai rak lanjutan untuk artikel lain yang benar-benar sudah terbit.',
  href: 'https://medium.com/@claudesy.id',
  cta: 'Buka Tulisan Terbaru',
} as const

export const mediumEntries = [
  {
    code: 'MED-01',
    date: 'Mar 13',
    title: 'MedGemma 27B & CDDS: Masa Depan AI Multimodal untuk Praktik Kedokteran Modern',
    synopsis:
      'Refleksi mengenai model multimodal dan arah pemakaiannya dalam praktik kedokteran modern.',
    body: 'Ditampilkan sebagai bacaan lanjutan yang lebih teknis, namun tetap dekat dengan pembacaan editorial dan konteks praktik nyata.',
    href: 'https://medium.com/@claudesy.id',
    cta: 'Baca di Medium',
  },
  {
    code: 'MED-02',
    date: 'Mar 9',
    title:
      'Menyelaraskan Visi dan Implementasi: Refleksi CEO dan Peneliti atas “Modeling Medical Diagnosis”',
    synopsis:
      'Tulisan reflektif yang menghubungkan visi sistem medis dengan realitas implementasi dan evaluasi model.',
    body: 'Masuk sebagai artikel lanjutan yang memperlihatkan kesinambungan antara sudut pandang kepemimpinan dan disiplin pembangunan sistem.',
    href: 'https://medium.com/@claudesy.id',
    cta: 'Baca di Medium',
  },
  {
    code: 'MED-03',
    date: 'Mar 8',
    title: 'Di Balik Layar Algoritma: AI dan Masa Depan Empati Dokter di Indonesia',
    synopsis: 'Pembacaan atas AI, empati dokter, dan konteks praktik layanan primer di Indonesia.',
    body: 'Diletakkan sebagai bagian dari rak tulisan yang memperluas sisi humanistik dan institusional dari diskusi AI di layanan kesehatan.',
    href: 'https://medium.com/@claudesy.id',
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
      'AI medis dan beban administratif',
      'Implementasi model diagnosis',
      'Empati dokter dan konteks layanan primer',
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
