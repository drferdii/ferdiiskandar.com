export type StoryChapterImage = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
  variant: 'wide' | 'portrait'
}

export type StoryChapterQuote = {
  text: string
  // 0-based index of the paragraph the quote renders immediately after.
  afterParagraph: number
}

export type StoryChapter = {
  marker: string
  title: string
  paragraphs: string[]
  quote?: StoryChapterQuote
  image?: StoryChapterImage
}

export const storyProlog = {
  eyebrow: 'Prolog',
  title: 'Dari Ruang Praktik ke Ekosistem: Asal-Usul Sentra Artificial Intelligence',
  lead: 'Ini bukan cerita tentang mesin yang menggantikan manusia. Ini cerita tentang orang-orang yang menolak berhenti mencari cara membantu tenaga medis bekerja lebih baik — dan menemukan kecerdasan buatan sebagai salah satu alat paling tepat untuk itu.',
  paragraphs: [
    'Sentra tidak lahir di perusahaan besar, dan tidak lahir di dek presentasi investor. Ia lahir dari kesibukan sehari-hari sebuah rumah sakit ibu dan anak dan sebuah Puskesmas lini depan pelayanan — dari rekam medis yang menumpuk, dari dokter yang mengejar waktu periksa, dari kebutuhan yang sangat sederhana untuk dijawab: bagaimana caranya tenaga medis bekerja lebih terarah, tanpa kehilangan kendali atas keputusan klinis yang mereka ambil sendiri.',
    'Kisah ini dimulai Februari 2025.',
  ],
}

export const storyEpilog = {
  eyebrow: 'Epilog',
  paragraphs: [
    'Dari sebuah program CSR di satu rumah sakit ibu dan anak, Sentra tumbuh menjadi ekosistem. Bukan karena rencana besar disusun sejak awal, tapi karena satu prinsip yang tidak pernah ditawar: AI ada untuk mendampingi manusia, bukan mengambil alih tempatnya.',
    'Itulah yang membuat kisah ini, sampai hari ini, masih terus ditulis.',
  ],
}

export const storyChapters: StoryChapter[] = [
  {
    marker: 'Babak I — Benih',
    title: 'Inisiatif Awal dari CSR RSIA Melinda DHAI',
    paragraphs: [
      'Sentra Artificial Intelligence bermula bukan sebagai produk, melainkan sebagai program tanggung jawab sosial (CSR) di RSIA Melinda DHAI. Tidak ada ambisi menggantikan peran manusia. Tujuannya justru sebaliknya: membuat alat bantu AI yang benar-benar berguna untuk layanan kesehatan harian, dan membantu tenaga medis bekerja lebih terarah, konsisten, dan aman.',
      'Kerja ini tidak dimulai sendirian. Bersama Bpk. Joseph Arianto — praktisi layanan primer dengan pengalaman lebih dari 25 tahun — dan asisten saya, Sdr. Norma, saya memetakan kendala nyata di lapangan, merancang solusi yang praktis, mengujinya langsung, lalu memperbaikinya berulang kali.',
      'Dari proses berulang itu, satu kesimpulan mengkristal lebih dulu daripada kesimpulan lainnya: nilai utama AI bukan pada otomatisasi penuh, melainkan pada kemampuannya mendampingi manusia. Sejak titik itu, AI saya posisikan sebagai mitra diskusi, pengolah dokumentasi, pembantu penalaran klinis, sarana edukasi, dan penerjemah data rumit menjadi keputusan yang bisa langsung dipakai di meja periksa.',
    ],
    image: {
      src: '/tim-inisiatif-csr.png',
      alt: 'Sdr. Norma, dr. Ferdi Iskandar (dr Classy), dan Bpk. Joseph Arianto berpose bersama di ruang kerja inisiatif Sentra',
      caption:
        'Dari kiri: Sdr. Norma, dr. Ferdi Iskandar (dr Classy), dan Bpk. Joseph Arianto — tim inti yang merintis inisiatif ini.',
      width: 1672,
      height: 941,
      variant: 'wide',
    },
  },
  {
    marker: 'Babak II — Tiga Terlambat',
    title: 'Tesis Keselamatan Sistemik: Rasionalisasi Klinis di Balik Sentra',
    paragraphs: [
      'Insiden klinis pada 13 dan 21 Februari 2025 di fasilitas saya mengekspos sebuah defisiensi struktural yang krusial — sebuah pola yang dalam literatur sistem kesehatan diidentifikasi sebagai sindrom "Tiga Terlambat": keterlambatan dalam pengambilan keputusan, eskalasi rujukan, dan penanganan medis definitif. Mengobservasi anomali sistemik ini, saya bersama dr. Nanda (dr. Dibya) dan dr. Boyong mengonsolidasikan sebuah komite strategis internal. Konklusinya absolut: pendekatan reaktif tidak lagi memadai; kita menuntut sebuah intervensi arsitektur klinis yang fundamental.',
      'Fase krisis tersebut memicu dua manuver operasional yang dieksekusi secara simultan. Lini pertama berfokus pada desentralisasi diagnostik melalui pemberdayaan ultrasonografi (USG) bagi bidan di garda terdepan. Lini kedua bermuara pada rekayasa Sentra. Selama satu tahun masa inkubasi, saya mengambil peran penuh sebagai dokter-teknolog, melakukan co-engineering kecerdasan komputasional sejak baris kode pertama. Langkah ini dilandasi oleh satu prinsip fundamental dasar saya:',
      'Sentra dibangun murni di atas ekuilibrium tersebut. Tujuannya adalah menciptakan ekosistem proaktif yang memutus asimetri informasi, memanfaatkan daya komputasi untuk memetakan risiko pasien jauh sebelum ambulans menyentuh pelataran rumah sakit, namun tetap menyerahkan keputusan akhir pada nurani medis manusia.',
      'Perlu dicatat bahwa sebelum insiden tersebut, fasilitas saya telah berhasil mempertahankan zero mortality rate (tingkat mortalitas nol) sejak awal masa kepemimpinan saya. Insiden Februari 2025 bukan kegagalan internal — melainkan eksposur terhadap kerentanan sistemik eksternal yang menembus batas fasilitas. Integrasi arsitektur Sentra mencapai titik ekuilibrium pada Januari 2026, memperkuat proteksi yang sudah ada dengan kecerdasan komputasional. Meskipun demikian, memonopoli instrumen mitigasi risiko sekuat ini secara eksklusif merupakan sebuah ironi ekologis dalam dunia kesehatan.',
      'Saya sangat menyadari probabilitas kegagalan. Mungkin Sentra masih memiliki celah, atau kinerjanya mungkin lebih buruk dari kalkulasi di atas kertas. Namun di sisi lain, ada probabilitas 50% yang solid bahwa Sentra adalah solusi nyata yang selama ini kita cari. Petuah mengatakan bahwa satu orang tidak akan mengubah dunia, namun satu inovasi yang berani dieksekusi selalu lebih bernilai secara klinis daripada ribuan ide sempurna yang hanya diam di dalam kepala.',
    ],
    quote: {
      text: 'Ilmu kesehatan ini terlalu luas, terlalu banyak untuk dipahami seluruhnya. Maka dari itu, gunakan kecerdasan buatan (Artificial Intelligence) untuk membantu kita, dan gunakan hati nurani kita sebagai dokter.',
      afterParagraph: 1,
    },
  },
  {
    marker: 'Babak III — Peralihan',
    title: 'Evolusi Peran AI sebagai Kolaborator Klinis',
    paragraphs: [
      'Dari titik itu, fokus bergeser ke sesuatu yang jauh lebih spesifik: membangun AI yang langsung terpakai di puskesmas dan klinik pratama — bukan di laboratorium riset, bukan di slide presentasi.',
      'Kerja lintas profesi menjaga agar sistem yang dibangun tetap realistis terhadap kondisi lapangan. Saya bekerja erat dengan dr. Dibya Arfianda, Sp.OG dan dr. Boyong Baskoro, Sp.OG di sisi kandungan, juga dengan dokter umum, perawat, bidan, dan staf administrasi yang setiap hari bersentuhan langsung dengan pasien.',
      'Di sisi rekayasa perangkat lunak, Nathanael Kevin Susanto, BIT, M.Tech — Software Engineer di Visa Worldwide, Singapura — mengawal keandalan sistem dan menerapkan standar rekayasa perangkat lunak skala industri yang aman untuk sektor kesehatan. Sistem finansial global dan sistem kesehatan primer bertemu di titik yang sama: keduanya tidak memberi ruang untuk kesalahan yang tidak teraudit.',
    ],
  },
  {
    marker: 'Babak IV — Ketika Banyak Tangan Turun',
    title: 'Kolaborasi Lintas Disiplin dan Standar Teknologi',
    paragraphs: [
      'Satu prinsip saya pegang tanpa kompromi: AI tidak boleh hanya menjadi pajangan riset, wacana, atau grafik di dashboard.',
      'Model yang akurat di atas kertas tidak berarti apa-apa jika tidak pernah menyentuh ruang periksa. Manfaat nyata teknologi ini baru terasa ketika ia dipakai langsung oleh dokter untuk mengambil keputusan cepat, menemani pasien di momen yang menegangkan, dan mendeteksi risiko klinis lebih awal — sebelum risiko itu berubah menjadi komplikasi yang lebih sulit ditangani.',
    ],
  },
  {
    marker: 'Babak V — Turun ke Meja Periksa',
    title: 'Implementasi Nyata di Lini Pelayanan Kesehatan',
    paragraphs: [
      'Sistem Sentra dibangun untuk menyatu dengan alur pelayanan klinik yang sesungguhnya — pendaftaran, pencatatan rekam medis, triase, analisis klinis awal, edukasi pasien, hingga pemantauan risiko kesehatan. Bukan modul yang ditempel di atas alur kerja lama, melainkan bagian dari alur itu sendiri.',
      'Dari titik pijak itu, Sentra tumbuh menjadi ekosistem yang lebih luas. Di luar kecerdasan klinis, saya merintis platform edukasi bertenaga AI, Sentra Mitra Design, serta modul operasional yang lahir bukan dari rencana besar di atas kertas, melainkan dari kebutuhan administrasi dan komunikasi sehari-hari yang nyata.',
    ],
  },
  {
    marker: 'Babak VI — Ekosistem yang Tumbuh Sendiri',
    title: 'Ekspansi Menuju Ekosistem AI Terintegrasi',
    paragraphs: [
      'Bagi saya pribadi, Sentra bukan sekadar proyek teknis.',
      'Saya mendedikasikan waktu lebih dari setahun untuk belajar, menguji, dan memperbaiki arah pengembangan — bukan setahun yang linear dan mulus, melainkan setahun yang penuh koreksi arah. Pengalaman itu membuktikan satu hal yang sekarang menjadi prinsip kerja saya: teknologi AI paling berharga ketika ia bekerja mendampingi manusia sebagai penguat kapasitas intelektual (*augmented intelligence*), bukan sebagai pengganti.',
    ],
  },
  {
    marker: 'Babak VII — Jalan Sang Pendiri',
    title: 'Perjalanan Personal dan Filosofi Pengembangan',
    paragraphs: [
      'Perjalanan yang dimulai sebagai program CSR ini mengkristal menjadi misi jangka panjang: membangun ekosistem kesehatan tempat keahlian manusia tetap menjadi pusat kendali.',
      'Di sini, tugas AI jelas batasnya: merapikan informasi, menyajikan data pendukung keputusan, mempercepat proses belajar tenaga medis, dan membantu tim medis mengantisipasi risiko secara proaktif. Bukan mengambil alih keputusan. Bukan menggantikan penilaian klinis. Saya punya banyak teman "Artificial Intelligence" dan apa yang menurut saya mereka lebih baik, maka saya berikan kebebasan untuk menyusunnya. Teknologi seharusnya membuat hidup dan pekerjaan kita menjadi lebih mudah, bukan sebaliknya — maka itu, *Simplicity is the key*.',
    ],
    image: {
      src: '/founder-sentra-shirt.jpg',
      alt: 'dr. Ferdi Iskandar mengenakan kaos Sentra, berpose sebagai pendiri',
      caption: 'dr. Ferdi Iskandar — pendiri Sentra Artificial Intelligence.',
      width: 447,
      height: 558,
      variant: 'portrait',
    },
  },
  {
    marker: 'Babak VIII — Manusia dan Mesin, Berjalan Beriringan',
    title: 'Visi Kolaborasi Manusia dan AI di Masa Depan',
    paragraphs: [
      'Saya percaya masa depan layanan kesehatan tidak ditentukan oleh kecerdasan buatan semata, melainkan oleh keharmonisan kolaborasi antara manusia dan teknologi.',
      'Ini bukan visi yang bisa dikerjakan satu institusi sendirian. Ia melibatkan kerja bersama para dokter, perawat, pendidik, desainer, pengambil kebijakan, hingga masyarakat luas yang pada akhirnya menjadi penerima manfaat dari seluruh sistem ini.',
    ],
  },
  {
    marker: 'Babak IX — Komitmen yang Tidak Berubah',
    title: 'Komitmen Sentra Artificial Intelligence Hari Ini',
    paragraphs: [
      'Sentra tetap berkomitmen menyediakan ekosistem AI yang praktis, aman, dan berangkat dari masalah nyata di puskesmas — bukan dari masalah yang dibayangkan dari luar.',
      'Satu batas tidak pernah bergeser sejak Februari 2025: keputusan klinis dan tanggung jawab penuh tetap berada di tangan dokter atau tenaga medis. Tugas AI adalah merangkum informasi penting secara cepat, agar tenaga medis punya waktu dan data yang cukup untuk menegakkan diagnosis terbaik bagi pasien.',
    ],
  },
]
