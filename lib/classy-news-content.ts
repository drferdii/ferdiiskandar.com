// Architected and built by dr Classy

const classyNewsAsset = (fileName: string) => `/assets/classy-news/${fileName}`

type ClassyNewsStory = {
  category: string
  date: string
  headline: string
  href: string
  image: string
  source: string
  summary: string
}

type ClassyNewsLeadStory = ClassyNewsStory & {
  cta: string
  meta: string
}

export const classyNewsHero = {
  eyebrow: 'Edisi ini ditata ulang untuk pembaca Indonesia dan diperbarui per 10 Mei 2026.',
  title:
    'Halaman ini kembali menjadi meja baca berita yang ringkas, jelas, dan sepenuhnya berbahasa Indonesia.',
  thesis:
    'Seluruh berita di sini ditulis ulang dengan bahasa Indonesia profesional, sambil tetap mengarahkan pembaca ke sumber asli saat diperlukan.',
  context:
    'Struktur halaman tetap mengikuti ritme redaksi dari aplikasi sumber, tetapi seluruh judul, ringkasan, dan penanda dibangun ulang agar lebih mudah dipahami pembaca Indonesia.',
  abstract:
    'Gunakan halaman ini sebagai ringkasan baca cepat. Tiap kartu memuat tafsir singkat dalam bahasa Indonesia, sementara tombol rujukan tetap membuka halaman asal untuk pembacaan lebih lanjut.',
  issueLabel: 'Edisi rujukan terhubung',
  issueDate: '10 Mei 2026',
}

export const classyNewsSignals = [
  'Seluruh judul dan ringkasan di halaman ini ditulis ulang khusus untuk pembaca Indonesia.',
  'Setiap kartu tetap mengarah ke sumber asli, sehingga pembaca dapat memeriksa rujukan awal kapan saja.',
  'Bahasa, penanda, dan alur baca difokuskan penuh agar halaman ini terasa lebih editorial dan lebih mudah dipindai.',
]

export const classyNewsIndexEntries = [
  {
    number: '01',
    title: 'Utama',
    detail: 'Berita pembuka dan tiga rujukan pendamping',
    href: '#classy-news-headline',
  },
  {
    number: '02',
    title: 'Cepat',
    detail: 'Empat kabar yang bergerak paling cepat',
    href: '#classy-news-trending',
  },
  {
    number: '03',
    title: 'Dalam',
    detail: 'Empat laporan yang perlu dibaca lebih tenang',
    href: '#classy-news-briefing',
  },
  {
    number: '04',
    title: 'Lanjut',
    detail: 'Kurasi lanjutan dan jalur baca sesudahnya',
    href: '#classy-news-editorial',
  },
]

export const classyNewsLeadStory: ClassyNewsLeadStory = {
  category: 'Keamanan Siber / 7 Apr 2026',
  date: 'Anthropic - 7 Apr 2026',
  headline: 'Project Glasswing dibuka sebagai perisai baru bagi perangkat lunak kritis di era AI.',
  meta: 'Anthropic - 7 Apr 2026',
  summary:
    'Anthropic mendorong pembentukan inisiatif lintas industri untuk memakai kemampuan model mutakhir sebagai alat uji pertahanan awal. Fokusnya bukan pamer kecanggihan model, melainkan memperkeras perangkat lunak yang menopang layanan penting sebelum diserang pihak lain.',
  image: classyNewsAsset('hero-main.jpg'),
  href: 'https://www.anthropic.com/glasswing',
  cta: 'Baca sumber asli',
  source: 'Rujukan asal: Anthropic',
}

export const classyNewsSecondaryStories: ClassyNewsStory[] = [
  {
    category: 'Akses Terbatas',
    date: 'Fortune - 7 Apr 2026',
    headline:
      'Anthropic mulai membuka akses terbatas Claude Mythos untuk memperkuat pertahanan siber.',
    summary:
      'Akses awal ini diberikan secara selektif agar organisasi tertentu dapat menguji bagaimana model baru membantu membaca celah, memetakan risiko, dan mempercepat kesiapan respons. Nilai beritanya terletak pada penggunaan AI sebagai lapisan pertahanan, bukan sekadar mesin generatif.',
    href: 'https://fortune.com/2026/04/07/anthropic-claude-mythos-model-project-glasswing-cybersecurity//',
    image: classyNewsAsset('claude-mythos.jpg'),
    source: 'Rujukan asal: Fortune',
  },
  {
    category: 'Komputasi',
    date: 'Anthropic - 6 Mei 2026',
    headline:
      'Anthropic melonggarkan batas pemakaian Claude sambil menambah pasokan komputasi lewat SpaceX.',
    summary:
      'Kebijakan ini menandakan dua hal sekaligus: permintaan penggunaan yang terus naik dan kebutuhan suplai infrastruktur yang jauh lebih besar. Bagi pasar, ini adalah isyarat bahwa kapasitas komputasi kini menjadi faktor pembeda utama dalam persaingan model.',
    href: 'https://www.anthropic.com/news/higher-limits-spacex',
    image: classyNewsAsset('sec-server.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
  {
    category: 'Kemitraan',
    date: 'xAI - 6 Mei 2026',
    headline: 'xAI mengumumkan kemitraan komputasi baru dengan Anthropic.',
    summary:
      'Berita ini memperlihatkan bahwa kompetisi antarpemain besar AI tidak selalu berarti pemisahan total. Ketika kebutuhan komputasi melonjak, kerja sama infrastruktur dapat menjadi pilihan praktis untuk menjaga ritme peluncuran produk dan stabilitas layanan.',
    href: 'https://x.ai/news/anthropic-compute-partnership',
    image: classyNewsAsset('sec-eye.jpg'),
    source: 'Rujukan asal: xAI',
  },
]

export const classyNewsTrendingStories: ClassyNewsStory[] = [
  {
    category: 'Produk',
    date: 'xAI - 6 Mei 2026',
    headline: 'xAI membawa konektor Grok ke web, iOS, dan Android.',
    summary:
      'Perluasan konektor ini menegaskan bahwa arah produk AI kini bergerak ke integrasi antaraplikasi, bukan lagi sekadar percakapan tunggal. Semakin banyak jalur sambungan, semakin besar peluang model hadir di alur kerja harian pengguna.',
    href: 'https://x.ai/news/grok-connectors',
    image: classyNewsAsset('featured-robot.jpg'),
    source: 'Rujukan asal: xAI',
  },
  {
    category: 'Gambar',
    date: 'xAI - 6 Mei 2026',
    headline: 'xAI merilis mode kualitas tinggi untuk antarmuka pemrograman gambar Grok.',
    summary:
      'Langkah ini menunjukkan dorongan xAI untuk memperkuat kualitas keluaran visual di jalur pengembang. Secara praktis, peningkatan mutu seperti ini penting bagi tim produk yang membutuhkan hasil gambar lebih konsisten tanpa memindahkan proses ke penyedia lain.',
    href: 'https://x.ai/news/grok-imagine-quality-mode',
    image: classyNewsAsset('editor-brain.jpg'),
    source: 'Rujukan asal: xAI',
  },
  {
    category: 'Keamanan',
    date: 'GitHub - 5 Mei 2026',
    headline: 'GitHub meresmikan pemindaian rahasia pada server MCP untuk pemakaian umum.',
    summary:
      'Pembaruan ini mengangkat keamanan dari lapisan tambahan menjadi lapisan bawaan pada alur kerja agen dan alat pengembang. Bagi organisasi, kemampuan seperti ini penting untuk menekan risiko kebocoran kredensial di ekosistem yang makin otomatis.',
    href: 'https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/',
    image: classyNewsAsset('trending-code.jpg'),
    source: 'Rujukan asal: GitHub',
  },
  {
    category: 'Layanan Keuangan',
    date: 'Anthropic - 5 Mei 2026',
    headline: 'Anthropic mendorong pemakaian agen AI untuk layanan keuangan.',
    summary:
      'Berita ini menyorot arah pasar yang semakin serius membawa agen AI ke industri yang diatur ketat. Tantangannya bukan hanya kecakapan model, tetapi juga kepatuhan, auditabilitas, dan kemampuan menjelaskan keputusan pada sistem yang berisiko tinggi.',
    href: 'https://www.anthropic.com/news/finance-agents',
    image: classyNewsAsset('featured-woman.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
]

export const classyNewsFeatureStories: ClassyNewsStory[] = [
  {
    category: 'Korporasi',
    date: 'Anthropic - 4 Mei 2026',
    headline:
      'Anthropic menyiapkan perusahaan layanan AI korporasi bersama tiga nama besar di bidang investasi.',
    summary:
      'Langkah ini memperlihatkan bahwa pasar AI tidak lagi hanya menjual model, tetapi juga mulai membangun kendaraan layanan yang lebih dekat ke kebutuhan perusahaan besar. Nilainya ada pada pengemasan, implementasi, dan pengelolaan risiko, bukan pada model mentah semata.',
    href: 'https://www.anthropic.com/news/enterprise-ai-services-company',
    image: classyNewsAsset('featured-woman.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
  {
    category: 'Suara',
    date: 'xAI - 30 Apr 2026',
    headline: 'xAI menambah suara kustom dan pustaka suara untuk Grok.',
    summary:
      'Pembaruan ini menandai pergeseran antarmuka AI ke pengalaman yang lebih personal dan lebih mudah dibedakan. Bagi produk berbasis suara, kepemilikan karakter audio menjadi penting karena berhubungan langsung dengan identitas, kenyamanan, dan retensi pengguna.',
    href: 'https://x.ai/news/grok-custom-voices',
    image: classyNewsAsset('mastra-memory.jpg'),
    source: 'Rujukan asal: xAI',
  },
  {
    category: 'Infrastruktur',
    date: 'OpenAI - 29 Apr 2026',
    headline: 'OpenAI mempercepat pembangunan infrastruktur komputasi untuk era kecerdasan.',
    summary:
      'Pesan utama dari pembaruan ini adalah bahwa kapasitas komputasi telah menjadi fondasi strategis, bukan sekadar urusan operasional. Siapa yang menguasai suplai, efisiensi, dan keberlanjutan infrastruktur akan memiliki posisi tawar lebih kuat dalam gelombang AI berikutnya.',
    href: 'https://openai.com/index/building-the-compute-infrastructure-for-the-intelligence-age/',
    image: classyNewsAsset('hero-main.jpg'),
    source: 'Rujukan asal: OpenAI',
  },
  {
    category: 'Karya Kreatif',
    date: 'Anthropic - 28 Apr 2026',
    headline: 'Anthropic memperluas penggunaan Claude untuk kebutuhan kerja kreatif.',
    summary:
      'Arah ini menegaskan bahwa model AI kini tidak hanya dibicarakan untuk efisiensi, tetapi juga untuk mempercepat proses konseptual dan produksi kreatif. Tantangan berikutnya adalah menjaga kualitas rasa, konsistensi gaya, dan peran manusia dalam pengambilan keputusan akhir.',
    href: 'https://www.anthropic.com/news/claude-for-creative-work',
    image: classyNewsAsset('trending-city.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
]

export const classyNewsEditorPicks: ClassyNewsStory[] = [
  {
    category: 'Riset Otonom',
    date: 'Google DeepMind - 21 Apr 2026',
    headline:
      'Google DeepMind memperkenalkan Deep Research Max untuk mendorong riset otonom yang lebih matang.',
    summary:
      'Pembaruan ini menegaskan ambisi besar pada agen riset yang tidak hanya mencari, tetapi juga menyusun, menghubungkan, dan memeriksa temuan secara lebih mandiri. Bagi pengguna profesional, nilainya terletak pada percepatan sintesis tanpa mengorbankan jejak penalaran.',
    href: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/',
    image: classyNewsAsset('trending-code.jpg'),
    source: 'Rujukan asal: Google DeepMind',
  },
  {
    category: 'Komputasi',
    date: 'Anthropic - 20 Apr 2026',
    headline: 'Anthropic dan Amazon memperluas kolaborasi komputasi hingga lima gigawatt baru.',
    summary:
      'Skala ini menunjukkan bahwa pembahasan AI tingkat lanjut kini sudah masuk ke bahasa energi dan kapasitas industri, bukan lagi sekadar jumlah peladen. Dalam jangka menengah, akses listrik dan pusat data akan semakin menentukan siapa yang bisa tumbuh paling agresif.',
    href: 'https://www.anthropic.com/news/anthropic-amazon-compute',
    image: classyNewsAsset('sec-server.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
  {
    category: 'Laboratorium',
    date: 'Anthropic - 17 Apr 2026',
    headline: 'Anthropic Labs memperkenalkan Claude Design sebagai langkah baru ke alat desain.',
    summary:
      'Masuknya model AI ke ranah desain memperlihatkan bahwa batas antara alat kreatif dan alat penalaran makin tipis. Nilai bisnisnya akan sangat bergantung pada seberapa baik AI membantu eksplorasi tanpa menghilangkan kendali estetik dari perancang.',
    href: 'https://www.anthropic.com/news/claude-design-anthropic-labs',
    image: classyNewsAsset('featured-robot.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
  {
    category: 'Ucapan',
    date: 'xAI - 17 Apr 2026',
    headline: 'xAI membuka kemampuan ucapan ke teks dan teks ke ucapan untuk Grok.',
    summary:
      'Langkah ini penting karena pengalaman AI yang natural semakin bergantung pada antarmuka suara dua arah. Bagi tim produk, fitur seperti ini membuka lebih banyak skenario penggunaan di layanan pelanggan, asisten pribadi, dan perangkat bergerak.',
    href: 'https://x.ai/news/grok-stt-and-tts-apis',
    image: classyNewsAsset('hero-main.jpg'),
    source: 'Rujukan asal: xAI',
  },
  {
    category: 'Keamanan',
    date: 'GitHub - 14 Apr 2026',
    headline: 'GitHub memperbarui pola pemindaian rahasia dan menyempurnakan produknya.',
    summary:
      'Pembaruan seperti ini mungkin tampak kecil dibanding peluncuran model besar, tetapi dampaknya langsung terasa pada disiplin rekayasa perangkat lunak sehari-hari. Semakin baik pola deteksi, semakin kecil peluang kesalahan dasar berubah menjadi insiden serius.',
    href: 'https://github.blog/changelog/2026-04-14-secret-scanning-pattern-updates-and-product-improvements/',
    image: classyNewsAsset('sec-eye.jpg'),
    source: 'Rujukan asal: GitHub',
  },
  {
    category: 'Pendanaan Siber',
    date: 'Fortune - 15 Apr 2026',
    headline: 'Artemis meraih pendanaan 70 juta dolar AS untuk melawan serangan siber berbasis AI.',
    summary:
      'Pendanaan ini menegaskan keyakinan investor bahwa gelombang serangan otomatis akan dibalas dengan pertahanan yang sama-sama otomatis. Di titik ini, pertahanan siber berbasis agen tampak mulai bergerak dari konsep ke kategori bisnis yang benar-benar dijual.',
    href: 'https://fortune.com/2026/04/15/exclusive-artemis-raises-70m-to-help-fight-ai-powered-attacks-with-ai/',
    image: classyNewsAsset('claude-mythos.jpg'),
    source: 'Rujukan asal: Fortune',
  },
  {
    category: 'Transit Otonom',
    date: 'TechCrunch - 15 Apr 2026',
    headline: 'Glydways mengantongi 170 juta dolar AS untuk mempercepat jaringan pod otonom.',
    summary:
      'Berita ini menunjukkan bahwa otomatisasi tidak hanya bergerak di perangkat lunak, tetapi juga di infrastruktur mobilitas fisik. Daya tariknya ada pada janji efisiensi jaringan angkutan yang lebih presisi, lebih modular, dan lebih mudah disesuaikan dengan permintaan kota.',
    href: 'https://techcrunch.com/2026/04/15/this-khosla-backed-autonomous-pod-startup-just-raised-170m-now-its-aiming-for-more/',
    image: classyNewsAsset('trending-city.jpg'),
    source: 'Rujukan asal: TechCrunch',
  },
  {
    category: 'Kendaraan Otonom',
    date: 'TechCrunch - 15 Apr 2026',
    headline:
      'Wayve mendapat dukungan tambahan dari AMD, Arm, dan Qualcomm untuk teknologi berkendara otonomnya.',
    summary:
      'Keterlibatan para pembuat chip ini memberi sinyal bahwa arsitektur perangkat keras dan perangkat lunak kendaraan kian menyatu. Bagi Wayve, sokongan seperti ini memperluas peluang komersialisasi karena teknologi dapat dibawa ke lebih banyak lapisan ekosistem otomotif.',
    href: 'https://techcrunch.com/2026/04/15/chipmakers-amd-arm-and-qualcomm-are-all-investing-in-this-buzzy-self-driving-tech-startup/',
    image: classyNewsAsset('featured-woman.jpg'),
    source: 'Rujukan asal: TechCrunch',
  },
  {
    category: 'Model',
    date: 'Anthropic - 16 Apr 2026',
    headline:
      'Anthropic memperkenalkan Claude Opus 4.7 sebagai penyempurnaan lini model andalannya.',
    summary:
      'Setiap pembaruan model pada lapisan ini selalu membawa dua pertanyaan: seberapa jauh kualitasnya naik, dan seberapa siap pasar membayar peningkatan itu. Di tengah persaingan ketat, iterasi seperti ini menjadi cara menjaga posisi tanpa menunggu lompatan generasi besar berikutnya.',
    href: 'https://www.anthropic.com/news/claude-opus-4-7',
    image: classyNewsAsset('featured-robot.jpg'),
    source: 'Rujukan asal: Anthropic',
  },
]

export const classyNewsBridgeCards = [
  {
    label: 'Catatan',
    title: 'Catatan menjadi ruang sintesis setelah pembaca selesai menelusuri sumber.',
    body: 'Setelah membuka laporan asal, pembaca dapat berpindah ke Catatan untuk melihat bagaimana sinyal eksternal diterjemahkan menjadi sudut pandang, penekanan, dan prioritas.',
    href: '/notes',
    cta: 'Buka Catatan',
  },
  {
    label: 'Karya',
    title: 'Karya menyambungkan berita ke bukti implementasi yang sudah dibangun.',
    body: 'Jika salah satu berita memberi konteks kemampuan baru, Karya menunjukkan bagaimana kemampuan itu bisa dibawa ke produk, sistem, dan hasil kerja yang konkret.',
    href: '/works',
    cta: 'Lihat Karya',
  },
  {
    label: 'Pemaparan',
    title: 'Pemaparan memindahkan isu harian menjadi narasi yang siap disampaikan ke publik.',
    body: 'Jalur ini berguna ketika kumpulan berita perlu diubah menjadi bahan bicara, forum, atau rangkaian penjelasan yang lebih terstruktur.',
    href: '/speaking',
    cta: 'Buka Pemaparan',
  },
]

export const classyNewsClosing = {
  title:
    'Halaman ini kini lebih dekat dengan kebutuhan pembaca Indonesia: cepat dibaca, mudah dipahami, dan tetap terhubung ke sumber awal.',
  body: 'Yang dipertahankan adalah disiplin redaksinya. Yang diubah adalah bahasanya, cara penyajiannya, dan tingkat keterbacaan agar pembaca tidak perlu menafsirkan sendiri judul-judul asing sebelum memahami maknanya.',
  primaryHref: '/classy-news#classy-news-headline',
  primaryLabel: 'Kembali ke berita utama',
  secondaryHref: '/notes',
  secondaryLabel: 'Lanjut ke Catatan',
}

export const classyNewsHomeSpotlight = {
  kicker: 'Permukaan editorial / rujukan terhubung',
  title:
    'Halaman berita ini kini memuat lebih dari dua puluh kabar yang ditulis ulang dalam bahasa Indonesia dan tetap terhubung ke sumber aslinya.',
  body: 'Permukaan ini tidak lagi hanya menampilkan judul mentah. Setiap entri sekarang memiliki judul dan ringkasan profesional yang lebih mudah dibaca pembaca Indonesia.',
  primaryHref: '/classy-news',
  primaryLabel: 'Buka Halaman Berita',
  secondaryHref: '/notes',
  secondaryLabel: 'Baca Catatan',
}
