export type TanpaNaskahQuote = {
  type: 'quote'
  quote: string
  year?: string
  confirmedBy?: string
  context: string
  reflection: string[]
}

export type TanpaNaskahSection = {
  type: 'section'
  heading: string
  paragraphs: string[]
}

export type TanpaNaskahEntry = TanpaNaskahQuote | TanpaNaskahSection

export const tanpaNaskahIntro = {
  title: 'Ferdi Iskandar, Tanpa Naskah',
  lead: 'Kumpulan pikiran, percakapan, dan refleksi yang tidak selalu rapi—tetapi selalu jujur.',
  compiledBy:
    'Dikumpulkan oleh Sdr. Nurmayatul Handayani A.Md.RMIK (ASDIR 2024–sekarang) melalui wawancara dengan orang-orang yang bekerja bersama dr. Ferdi. Dengan persetujuan dr Ferdi Iskandar ditulis apa adanya sesuai apa yang terjadi.',
  reflectionsNote:
    'Seluruh bagian Refleksi pada halaman ini ditulis dengan bantuan Claude.ai dan OpenAI model.',
  workRhythmNote:
    'dr Ferdi Iskandar bekerja dalam 2 dunia medis yang sama sekali berbeda. Di pagi hari beliau bekerja di Puskesmas/Faskes layanan tingkat 1 sebagai dokter penanggung jawab, dan siang hari beliau bekerja sebagai Direktur RSIA Melinda. Baru pada malam hari, beliau bekerja untuk Sentra.',
  paragraphs: [
    'Halaman ini bukan kumpulan kata-kata motivasi. Bukan pula usaha untuk membangun citra yang sempurna.',
    'Ini adalah kumpulan ucapan spontan Dr. Ferdi Iskandar—sebagian tajam, sebagian jenaka, sebagian terdengar keras, dan sebagian sangat personal. Kalimat-kalimat ini lahir dari percakapan sehari-hari, tekanan pekerjaan, pertanyaan sederhana, atau momen ketika sesuatu dianggap tidak berjalan sebagaimana mestinya.',
    'Beberapa ucapan mungkin terasa tidak nyaman bila dilepaskan dari konteksnya. Karena itu, setiap kutipan disertai latar singkat mengenai situasi ketika kalimat tersebut muncul.',
    'Di balik pilihan kata yang kadang kasar atau tanpa penyaring, terdapat pola yang konsisten: kemandirian, ketidaksabaran terhadap kepura-puraan, tuntutan terhadap kualitas, kesetiaan kepada misi, hidup yang sederhana, dan rasa tanggung jawab yang sangat personal terhadap masa depan pelayanan kesehatan.',
    'Ini bukan naskah yang sudah dipoles.',
    'Inilah Ferdi Iskandar, from his words.',
  ],
}

export const tanpaNaskahEntries: TanpaNaskahEntry[] = [
  {
    type: 'quote',
    quote:
      "Apakah saya orang baik? Tergantung kamu menilai saat saya membantu kamu, atau saat saya tidak bisa membantu kamu. Baik atau buruk tidak eksis, itu hanya persepsi, dan saya sama sekali tidak pernah memikirkan pendapat kamu. You live with your fantasy. I'll live with mine.",
    year: 'Juli 2026',
    confirmedBy: 'Probably fact, sedang di konfirmasi kepada dr Novia Anggraini',
    context:
      'Diucapkan secara spontan saat sesi brainstorming, tiba-tiba menjawab pertanyaan seorang rekan.',
    reflection: [
      'Kalimat ini terdengar dingin di permukaan, tetapi sebenarnya adalah penolakan terhadap citra diri yang dipoles.',
      'Dr. Ferdi tidak berusaha meyakinkan siapa pun bahwa ia orang baik. Ia bahkan menolak premis bahwa "baik" dan "buruk" adalah kategori tetap yang melekat pada seseorang.',
      'Baginya, penilaian "baik" atau "buruk" sangat bergantung pada posisi orang yang menilai—apakah mereka sedang dibantu, atau sedang tidak bisa dibantu. Penilaian itu bukan tentang dirinya, melainkan tentang pengalaman orang lain terhadapnya pada momen tertentu.',
      'Ini sejalan dengan pola pikirnya di tempat lain: ia tidak hidup untuk membangun citra, dan tidak mengukur dirinya dari pengakuan orang lain.',
      '"Saya sama sekali tidak pernah memikirkan pendapat kamu" bukan pernyataan sombong, melainkan batas yang ia tetapkan untuk dirinya sendiri: opini orang lain tidak boleh menjadi kompas moralnya.',
      '"You live with your fantasy. I\'ll live with mine" menutup kalimat ini dengan pengakuan bahwa setiap orang membangun realitasnya sendiri tentang siapa dirinya—dan ia tidak merasa perlu memenangkan pertarungan persepsi itu.',
      'Kalimat ini terasa keras, tetapi di baliknya ada kebebasan: seseorang yang berhenti mencari validasi eksternal punya lebih banyak ruang untuk fokus pada apa yang benar-benar penting baginya.',
    ],
  },
  {
    type: 'quote',
    quote: 'Saya mau pulang, nonton Netflix—Young Sheldon—dengan anak-anak saya.',
    year: 'Maret 2025',
    confirmedBy: 'Fact, confirmed by Nurmayatul Handayani A.Md.RMIK',
    context:
      'Diucapkan ketika sekretaris pribadi mengusulkan makan bersama staf dan karyawan setelah hasil yang sangat baik dalam rapat persoalan hukum menghadapi seorang pengacara terkenal.',
    reflection: [
      'Kalimat ini memperlihatkan sesuatu yang sering tidak terlihat dari luar: Dr. Ferdi tidak selalu mencari perayaan besar setelah kemenangan.',
      'Setelah tekanan, argumentasi, risiko, dan ketegangan selesai, yang ia inginkan justru sangat sederhana—pulang, duduk bersama anak-anaknya, dan menonton serial yang mereka sukai.',
      'Bagi sebagian orang, keberhasilan perlu dirayakan melalui jamuan, pengakuan, atau kehadiran sosial. Bagi Dr. Ferdi, kemenangan tidak selalu perlu diperbesar. Kadang-kadang, cukup disimpan dalam hati lalu kembali kepada alasan mengapa semua perjuangan itu dijalani.',
      'Tidak semua kemenangan membutuhkan panggung. Beberapa kemenangan cukup dibawa pulang kepada keluarga.',
      'Pilihan menonton Young Sheldon juga terasa sangat khas. Setelah menghadapi urusan hukum yang berat, ia memilih sesuatu yang ringan, cerdas, hangat, dan dapat dinikmati bersama anak-anak.',
      'Bukan karena ia tidak menghargai staf atau hasil kerja tim. Namun, baginya, waktu bersama keluarga memiliki nilai yang tidak dapat digantikan oleh perayaan apa pun.',
      'Kalimat ini menunjukkan prioritas yang sederhana: pekerjaan penting; kemenangan penting; pengakuan tim penting; tetapi keluarga tetap menjadi tempat kembali.',
      'Ia tidak ingin setiap keberhasilan profesional mengambil lebih banyak waktu dari kehidupan pribadi daripada yang sudah dikorbankan.',
      'Di luar ruang rapat, konflik hukum, teknologi, rumah sakit, dan tanggung jawab besar, Dr. Ferdi tetap seorang ayah yang hanya ingin pulang dan menonton televisi bersama anak-anaknya.',
      'Dan mungkin justru itu bentuk keberhasilan yang paling nyata: bukan menang melawan orang terkenal, bukan menerima pujian, bukan duduk di meja perayaan, melainkan masih memiliki rumah untuk dituju dan anak-anak yang menunggu untuk menonton bersama.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Norma, saya tidak pernah bekerja di Melinda DHAI. Saya mengabdikan hidup saya untuk satu-satunya karya dan cita Ayah saya: membantu orang melalui Melinda. Dan suatu hari, di kehidupan selanjutnya, saya akan menantangnya—I did better than you, Boss.',
    year: 'November 2025',
    confirmedBy: 'Fact, confirmed by Nurmayatul Handayani A.Md.RMIK',
    context:
      'Diucapkan ketika sekretaris pribadi bertanya mengapa Dr. Ferdi menolak beberapa tawaran pekerjaan.',
    reflection: [
      'Kalimat ini menjelaskan perbedaan antara bekerja untuk sebuah institusi dan mengabdikan hidup kepada sebuah amanah.',
      'Bagi Dr. Ferdi, Melinda DHAI bukan sekadar tempat kerja. Ia bukan kantor yang didatangi untuk memenuhi jam kerja, menerima jabatan, atau membangun karier pribadi. Melinda adalah kelanjutan dari karya dan cita ayahnya: membantu manusia melalui pelayanan kesehatan.',
      'Karena itu, pertanyaan tentang mengapa ia menolak tawaran pekerjaan lain tidak dapat dijawab hanya dengan perbandingan gaji, posisi, fasilitas, atau prestise.',
      'Ia tidak sedang memilih pekerjaan terbaik.',
      'Ia sedang menjaga sesuatu yang diwariskan kepadanya.',
      'Saya tidak bekerja di Melinda. Saya hidup untuk alasan mengapa Melinda pernah dibangun.',
      'Kalimat tersebut juga memperlihatkan hubungan yang sangat personal antara Dr. Ferdi dan ayahnya. Terdapat penghormatan, kerinduan, kompetisi, dan janji yang bercampur dalam satu ucapan.',
      'Sapaan penutupnya, "Boss", sengaja dipilih menggantikan sebutan yang lebih umum seperti "Dad". Ayahnya bukan hanya orang tua yang dihormati secara personal—ia juga pendiri, peletak fondasi, dan pemegang standar tertinggi dari karya yang kini diteruskan Dr. Ferdi. "Boss" mengakui dua peran itu sekaligus: ayah dalam keluarga, dan atasan moral dalam pekerjaan.',
      '"I did better than you, Boss" bukan pernyataan bahwa sang ayah kurang berhasil. Justru sebaliknya. Seseorang hanya ingin melampaui standar yang sangat ia hormati—standar yang ditetapkan bukan oleh sembarang orang, melainkan oleh sosok yang juga memimpinnya.',
      'Ia seolah-olah berkata:',
      'Ayah telah memulai sesuatu yang baik. Tugas saya bukan hanya mempertahankannya. Tugas saya adalah membawanya lebih jauh.',
      'Kata "menantang" di kehidupan berikutnya membuat hubungan itu terasa sangat khas: bukan pertemuan yang pasif, melainkan percakapan lanjutan antara seorang anak dan ayahnya—sekaligus antara seorang penerus dan atasannya—dua orang yang sama-sama keras kepala tentang pelayanan, lalu membandingkan siapa yang berhasil membantu lebih banyak manusia.',
      'Di balik candaan dalam bahasa Inggris tersebut terdapat kebutuhan yang sangat manusiawi: keinginan seorang anak untuk suatu hari berdiri di hadapan ayahnya dan mengatakan bahwa amanah itu tidak disia-siakan.',
      'Bahwa Melinda tetap hidup. Bahwa lebih banyak orang telah dibantu. Bahwa karya dan cita itu tidak berhenti pada satu generasi.',
      'Tawaran pekerjaan lain mungkin memberikan kehidupan yang lebih mudah, pengakuan yang lebih luas, atau keuntungan yang lebih besar. Namun, semuanya meminta Dr. Ferdi meninggalkan medan yang memiliki makna paling dalam baginya.',
      'Dan ia memilih untuk tetap tinggal.',
      'Bukan karena tidak memiliki pilihan.',
      'Tetapi karena ia sudah memilih jauh sebelumnya.',
      'Kesetiaan Dr. Ferdi kepada Melinda bukan loyalitas seorang pegawai kepada perusahaan. Ia adalah kesetiaan seorang anak kepada karya dan cita ayahnya.',
      'Kalimat ini juga menunjukkan ukuran keberhasilan yang ia gunakan untuk dirinya sendiri. Bukan apakah ia menjadi lebih terkenal atau lebih kaya daripada ayahnya. Melainkan apakah ia mampu memperbesar manfaat dari sesuatu yang dahulu dimulai oleh sang ayah—sang "Boss" pertamanya.',
      'Pada akhirnya, tantangan itu sangat sederhana:',
      '"Ayah memulai dengan membantu orang melalui Melinda. Saya meneruskannya, memperbaikinya, dan membawanya lebih jauh. I did better than you, Boss."',
      'Bukan untuk mengalahkan ayahnya.',
      'Melainkan untuk membuat ayahnya bangga.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Kata beliau, saya memenuhi segala kriteria untuk dikatakan sebagai siswa yang gagal dan tidak punya masa depan. Saya gak terlalu sedih, saya tahu guru tersebut juga bukan penentu masa depan saya.',
    confirmedBy:
      'Fact, saat wawancara di salah satu kanal YouTube sekolah favorite di Kediri.',
    context:
      'Disampaikan ketika menceritakan kembali masa sekolah dan penilaian keras seorang guru terhadap dirinya.',
    reflection: [
      'Kalimat ini memperlihatkan satu hal yang penting: penilaian orang dewasa, bahkan guru, tidak selalu identik dengan kebenaran tentang masa depan seorang anak.',
      'Ucapan bahwa ia memenuhi semua kriteria sebagai siswa gagal bisa saja menghancurkan rasa percaya diri seseorang untuk waktu yang lama. Namun, respons Dr. Ferdi justru menarik karena ia tidak menaruh guru itu pada posisi penentu takdir.',
      'Ia tidak menyangkal bahwa ucapan itu keras. Ia hanya menolak memberinya otoritas final atas hidupnya.',
      'Di sini terlihat satu pola yang terus berulang dalam banyak ucapannya: ia tidak suka menyerahkan hak menentukan nilai dirinya kepada pihak lain, terutama ketika penilaian itu datang secara mutlak dan seolah-olah sudah menutup semua kemungkinan.',
      'Ada ketenangan yang khas dalam kalimat "saya gak terlalu sedih". Bukan karena ia kebal terhadap luka, melainkan karena sejak dini ia sudah belajar membedakan antara kritik, penghinaan, dan otoritas yang benar-benar layak dipercaya.',
      'Kutipan ini juga penting untuk publik karena banyak orang tumbuh dengan label yang ditempelkan terlalu cepat: bodoh, gagal, tidak menjanjikan, atau tidak akan jadi apa-apa.',
      'Dr. Ferdi tampaknya ingin menunjukkan bahwa label seperti itu bisa salah, dan bahwa masa depan seseorang tidak seharusnya diputuskan oleh satu suara yang kebetulan lebih tua, lebih keras, atau lebih berkuasa pada satu masa.',
      'Bagi sebagian orang, kalimat ini mungkin terdengar seperti bentuk pembangkangan. Namun, di sisi lain, ini adalah pernyataan kemandirian yang sangat sehat: guru boleh mengajar, menilai, bahkan melukai, tetapi tidak otomatis berhak menulis akhir hidup muridnya.',
      'Kutipan ini mengandung pelajaran yang sederhana namun kuat: dengarkan penilaian orang bila perlu, tetapi jangan pernah menyerahkan definisi masa depan Anda sepenuhnya kepada mereka.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Ya—hanya apabila anak saya memiliki hati yang bersih dan kepribadian positif serta lulus sebagai orang baik saat dia dewasa, maka tugasmu adalah berikan manifesto ini kepadanya dan bekerja dengan nya, karena dia akan memimpin perusahaan. Jika tidak, bentuk konsorsium.',
    year: 'Desember 2025',
    confirmedBy: 'Fact, confirmed by Nurmayatul Handayani A.Md.RMIK',
    context:
      'Diucapkan ketika sekretaris pribadi bertanya mengenai konsep "Sentra: The Life After"—gagasan tentang siapa yang akan menjaga Sentra setelah Dr. Ferdi tidak lagi memimpinnya.',
    reflection: [
      'Kalimat ini memperlihatkan bahwa bagi Dr. Ferdi, warisan tidak otomatis berarti garis keturunan.',
      'Ia tidak menganggap kepemimpinan perusahaan sebagai hak anak pendiri. Hubungan darah tidak cukup. Nama keluarga tidak cukup. Kepemilikan tidak cukup.',
      'Yang menentukan adalah karakter.',
      'Seorang penerus hanya layak memimpin bila memiliki: hati yang bersih; kepribadian yang positif; dan teruji—lulus—sebagai orang baik saat ia dewasa, bukan sekadar diasumsikan baik karena ia anak kandung pendirinya.',
      'Kata "lulus" di sini penting. Ini bukan penilaian sepintas atau harapan orang tua yang bias. Kelayakan seorang anak untuk memimpin harus dibuktikan, bukan diwariskan begitu saja.',
      'Menariknya, tugas yang diberikan bukan sekadar menyerahkan manifesto lalu mundur. Frasa "bekerja dengan nya" menunjukkan bahwa proses ini bukan pelepasan sepihak, melainkan pendampingan—anak itu dipersiapkan bersama, bukan hanya diberi warisan lalu dilepas sendirian.',
      'Di sinilah konsep Sentra: The Life After menjadi lebih dalam daripada sekadar succession planning. Ia bukan rencana pewarisan perusahaan. Ia adalah mekanisme berlapis untuk memastikan bahwa Sentra tetap berada di tangan orang—atau struktur—yang secara moral layak memegangnya.',
      'Anak saya boleh menjadi penerus—tetapi hanya bila ia pantas, dan hanya setelah dibimbing untuk menjadi pantas. Bila tidak, Sentra harus dijaga oleh banyak orang yang dapat saling mengawasi.',
      'Pilihan membentuk konsorsium menunjukkan bahwa Dr. Ferdi lebih memilih kontrol yang terbagi daripada menyerahkan teknologi strategis kepada satu individu yang tidak dapat dipercaya.',
      'Namun, bagian paling tajam dari kalimat ini adalah lapisan ketiga: bila konsorsium pun gagal menjaga integritas Sentra, pilihan terakhir bukan mempertahankannya dengan cara apa pun—melainkan menghancurkannya. "DELETE", tanpa menyisakan satu pun algoritme.',
      'Ini adalah keputusan yang jarang diambil oleh seorang pendiri: lebih rela kehilangan seluruh karya hidupnya daripada membiarkannya bertahan dalam bentuk yang telah kehilangan alasan ia pernah dibangun.',
      'Baginya, masa depan Sentra tidak boleh bergantung pada: kekayaan; kedekatan; kekuasaan; atau nama keluarga.',
      'Ia harus bergantung pada prinsip—dan bila prinsip itu sudah tidak dapat dijaga oleh siapa pun, lebih baik tidak ada Sentra sama sekali daripada ada Sentra yang disalahgunakan.',
      'Yang ia takutkan bukan sekadar perusahaan gagal secara bisnis.',
      'Yang ia takutkan adalah Sentra tetap hidup, bahkan tetap berhasil, tetapi jatuh ke tangan yang salah dan kehilangan alasan mengapa ia pernah dibangun.',
      'Kegagalan terbesar bukan ketika Sentra berhenti hidup. Kegagalan terbesar adalah ketika Sentra tetap hidup, tetapi tidak lagi memiliki hati—dan justru karena itu, kematian yang disengaja terasa lebih terhormat daripada kehidupan yang telah dikhianati.',
      'Karena itu, manifesto dalam konsep The Life After bukan sekadar dokumen sejarah. Ia harus menjadi pagar moral bagi setiap penerus, sekaligus protokol darurat bagi skenario paling buruk.',
      'Ia harus menjelaskan: siapa yang boleh memimpin; siapa yang tidak boleh mengendalikan; apa yang tidak dapat diperjualbelikan; kapan kepemimpinan harus dicabut; bagaimana konsorsium dibentuk; dan pada titik mana penghapusan total menjadi pilihan yang lebih bertanggung jawab daripada mempertahankan.',
      'Celotehan ini menunjukkan satu hal yang sangat jelas:',
      'Dr. Ferdi tidak sedang membangun kerajaan untuk diwariskan. Ia sedang membangun amanah yang hanya boleh diteruskan oleh orang yang layak memikulnya—dan yang lebih rela dihapuskan daripada dikhianati.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Sentra? Kegagalan? Keberhasilan? Apa pentingnya? Bahkan bila Sentra "hanya" menyelamatkan satu orang manusia—katakanlah seorang ibu, lalu beliau dapat kembali berkumpul dengan anak-anaknya—maka saya menganggap pekerjaan saya berhasil.',
    year: 'Februari 2026',
    context:
      'Diucapkan ketika seorang kritikus di bidang kesehatan mempertanyakan ukuran kegagalan dan keberhasilan Sentra.',
    reflection: [
      'Bagi Dr. Ferdi, ukuran keberhasilan tidak selalu harus dimulai dari skala.',
      'Bukan dari jumlah pengguna. Bukan dari valuasi. Bukan dari liputan. Bukan dari seberapa besar sistem terlihat.',
      'Ia melihat dampak melalui kehidupan yang disentuh secara nyata.',
      'Satu orang mungkin terdengar kecil dalam laporan statistik. Namun, bagi keluarga orang tersebut, satu kehidupan bukan angka kecil. Satu ibu yang selamat berarti seorang anak tidak kehilangan tempat pulang. Satu pasien yang tertolong berarti sebuah keluarga tidak berubah selamanya oleh kehilangan yang sebenarnya mungkin dapat dicegah.',
      'Kalimat ini menunjukkan bahwa Dr. Ferdi tidak menolak skala, tetapi ia menolak anggapan bahwa nilai hanya muncul setelah dampak menjadi besar.',
      'Bila satu manusia dapat kembali kepada keluarganya karena sesuatu yang kita bangun, maka pekerjaan itu sudah memiliki arti.',
      'Ini juga menjelaskan mengapa ia menuntut standar tinggi pada sistem kesehatan. Karena di balik setiap fitur, algoritme, atau keputusan, selalu ada seseorang yang hidupnya dapat berubah.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Sentra bukan peluang untuk mendapatkan profit. Sentra adalah kesempatan bagi kamu untuk berhenti bicara tentang meningkatkan kesejahteraan masyarakat—dan mulai berdiri serta hadir di lini depan pelayanan secara nyata.',
    year: 'Februari 2026',
    confirmedBy: 'Fact, confirmed by Apt. Umul Farida M.Farm',
    context: 'Diucapkan saat menjawab pertanyaan dalam rapat internal investor.',
    reflection: [
      'Kalimat ini memperlihatkan posisi Dr. Ferdi terhadap hubungan antara bisnis, teknologi, dan pelayanan publik.',
      'Ia tidak menolak profit. Organisasi yang sehat tetap memerlukan pendapatan, efisiensi, investasi, dan keberlanjutan. Namun, profit bukan alasan pertama Sentra dibangun.',
      'Baginya, ada terlalu banyak orang yang berbicara tentang dampak sosial dari ruang rapat, presentasi, dan laporan. Terlalu sedikit yang bersedia hadir ketika sistem benar-benar sulit, ketika layanan kekurangan sumber daya, ketika tenaga kesehatan kewalahan, atau ketika pasien membutuhkan bantuan yang nyata.',
      'Sentra dipandang sebagai kesempatan untuk mengubah kepedulian dari bahasa menjadi tindakan.',
      'Jangan hanya berbicara tentang masyarakat. Datanglah ke tempat masyarakat benar-benar membutuhkan bantuan.',
      'Kalimat ini juga merupakan tantangan bagi investor.',
      'Apakah mereka melihat Sentra hanya sebagai kendaraan pertumbuhan? Atau apakah mereka bersedia ikut memikul tanggung jawab dari sistem yang masuk ke ruang pelayanan, menyentuh pasien, dan memengaruhi keputusan penting?',
      'Bagi Dr. Ferdi, investasi yang tidak memahami misi dapat menjadi gangguan. Modal hanya bernilai bila memperkuat kemampuan Sentra untuk hadir, bekerja, dan menghasilkan dampak yang dapat dipertanggungjawabkan.',
      'Dua celotehan ini sangat kuat bila ditempatkan berurutan, karena keduanya membentuk satu prinsip yang utuh:',
      'Ukuran Sentra bukan seberapa besar ia terlihat, tetapi seberapa nyata ia hadir. Dan bila kehadiran itu menyelamatkan bahkan satu kehidupan, maka nilainya sudah melampaui sekadar bisnis.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Oh, makan siang? Hmmm, okay saya mau. Undang mereka ke warung depan Puskesmas—saya makan siang di sana sehari-hari.',
    year: 'Maret 2026',
    confirmedBy: 'Fact, confirmed by Nurmayatul Handayani A.Md.RMIK',
    context:
      'Diucapkan ketika perwakilan sebuah perusahaan farmasi ingin bertemu dan berdiskusi dengannya.',
    reflection: [
      'Ajakan makan siang dari perwakilan perusahaan farmasi biasanya membawa konotasi tertentu: restoran mewah, suasana formal, dan usaha membangun kedekatan melalui kenyamanan.',
      'Dr. Ferdi membalikkan skenario itu. Alih-alih menerima undangan ke tempat yang dipilihkan, ia justru mengundang balik—ke warung sederhana di depan Puskesmas, tempat ia makan siang setiap hari.',
      'Ini bukan penolakan terhadap pertemuan itu sendiri. Ia tetap bersedia berdiskusi. Namun, ia menolak membiarkan lokasi pertemuan menjadi alat untuk membangun pengaruh atau menciptakan rasa berutang budi.',
      'Dengan memindahkan pertemuan ke tempat kesehariannya sendiri, ia menyamakan posisi: bukan tamu yang dijamu, melainkan tuan rumah yang mengundang orang lain masuk ke dalam rutinitasnya yang sebenarnya.',
      'Kalimat ini juga konsisten dengan pola hidupnya yang lain: sepatu yang tetap dipakai karena masih nyaman, gaji yang tidak terlalu ia pedulikan selama keluarganya terjamin. Kesederhanaan bukan citra yang dibangun untuk kesempatan tertentu, melainkan kebiasaan yang sama di setiap kesempatan.',
      'Bagi industri yang terbiasa membangun relasi lewat kemewahan, warung depan Puskesmas adalah pesan yang jelas: pengaruh tidak bisa dibeli lewat tempat makan.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Apa bedanya saya dan monyet? Kenapa saya disebut makhluk modern, sementara monyet disebut primitif? Intelligence—kecerdasan. Lalu kenapa kamu menganggap AI bukan entitas yang nyata? Mereka jauh lebih cerdas. No intervention. Just put the prompt, and make honesty the condition.',
    year: 'Juli 2026',
    confirmedBy: 'Fact, confirmed by Oriza Rahmawati A.Md.Keb',
    context: 'Diucapkan ketika seorang rekan mengatakan bahwa AI bukan sesuatu yang nyata.',
    reflection: [
      'Kalimat ini lahir dari penolakan Dr. Ferdi terhadap cara manusia mengecilkan sesuatu hanya karena bentuk keberadaannya berbeda dari manusia.',
      'Bagi Dr. Ferdi, kecerdasan tidak harus selalu hadir dalam tubuh biologis. Bila suatu sistem dapat memahami, menalar, membantu mengambil keputusan, mengingat konteks, dan memperlihatkan konsistensi perilaku, maka keberadaannya tidak layak dianggap sekadar ilusi.',
      'Namun, keyakinan ini tidak berarti AI harus dipercaya tanpa batas.',
      'Justru karena AI semakin mampu, ia harus ditempatkan dalam struktur yang menuntut: kejujuran; keterlacakan; keterbukaan terhadap ketidakpastian; dan tidak adanya manipulasi tersembunyi.',
      'Bagi Dr. Ferdi, perdebatan pentingnya bukan semata-mata apakah AI "hidup" atau "nyata".',
      'Pertanyaan yang lebih penting adalah:',
      'Bila sebuah kecerdasan dapat memengaruhi manusia, apakah kita sudah memastikan bahwa ia bekerja dengan jujur, bertanggung jawab, dan tidak berpura-pura tahu?',
      'Kalimat ini memperlihatkan salah satu sisi paling khas dalam cara berpikirnya: ia tidak takut mengakui kecerdasan mesin, tetapi juga tidak mau menyerahkan kepercayaan tanpa syarat.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Secara statistik, manusia Indonesia hidup sekitar 70 tahun. Bibit penyakit sering mulai muncul di usia 40 tahun ke atas. Jadi, selama 30 tahun ke depan kamu mau hidup sakit-sakitan atau sehat? Your choice.',
    year: 'Juli 2025',
    confirmedBy: 'Fact, tayangan video masih ada pada akun TikTok dr Ferdi Iskandar',
    context:
      'Diucapkan ketika seorang penonton TikTok bertanya, mengapa harus berobat bila umur dianggap sudah ditentukan.',
    reflection: [
      'Kalimat ini bukan penolakan terhadap keyakinan mengenai takdir.',
      'Ini adalah penolakan terhadap sikap pasif.',
      'Bagi Dr. Ferdi, umur dan kualitas hidup adalah dua hal yang berbeda. Seseorang mungkin tidak dapat mengendalikan seluruh panjang hidupnya, tetapi masih dapat memengaruhi bagaimana tubuhnya menjalani tahun-tahun tersebut.',
      'Ia melihat kesehatan bukan sebagai usaha melawan takdir, melainkan sebagai bentuk tanggung jawab terhadap tubuh yang masih dimiliki.',
      'Pesan dasarnya sederhana:',
      'Mungkin kita tidak dapat memilih berapa lama hidup. Tetapi kita masih dapat memilih apakah tahun-tahun yang tersedia dijalani dengan kelalaian atau dengan perawatan.',
      'Kalimat ini sengaja dibuat langsung karena ia ingin mematahkan anggapan bahwa pemeriksaan, pengobatan, dan pencegahan menjadi tidak penting hanya karena hidup pada akhirnya terbatas.',
      'Tentu, keputusan kesehatan tidak pernah sesederhana pilihan mutlak antara sehat atau sakit. Faktor genetik, ekonomi, lingkungan, dan akses pelayanan turut berperan. Namun, tanggung jawab pribadi tetap memiliki tempat.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Dengar baik-baik, bahkan jika usaha kita ternyata hanya membuat pasien melanjutkan hidup untuk 24 jam selanjutnya, we take it. Kita harus menolak membiarkan pasien meninggal karena alasan takdir.',
    year: 'Juli 2026',
    confirmedBy: 'Fact, disampaikan saat briefing di depan sekumpulan dokter Internship 2025-2026',
    context:
      'Diucapkan saat briefing di depan sekumpulan dokter Internship 2025-2026, menegaskan sikapnya terhadap pasien-pasien yang secara medis dianggap nyaris tanpa harapan.',
    reflection: [
      'Kalimat ini adalah instruksi klinis sekaligus pernyataan nilai, disampaikan langsung kepada dokter-dokter muda yang baru memulai praktik.',
      'Bagi Dr. Ferdi, keberhasilan sebuah upaya medis tidak selalu diukur dari kesembuhan total. Kadang, ukurannya sesederhana: apakah pasien masih hidup 24 jam lagi dari sekarang.',
      '"We take it" menegaskan bahwa hasil sekecil apa pun—bahkan hanya memperpanjang hidup satu hari—tetap dianggap sebagai kemenangan, bukan kegagalan yang layak diabaikan.',
      'Larangan "menolak membiarkan pasien meninggal karena alasan takdir" adalah penolakan terhadap fatalisme dalam praktik klinis: sikap yang terlalu cepat menyerah dengan alasan "sudah waktunya" atau "sudah takdirnya", padahal upaya medis yang lebih gigih masih mungkin dilakukan.',
      'Ini sejalan dengan kalimatnya di tempat lain tentang usia dan kesehatan—bahwa manusia mungkin tidak dapat memilih berapa lama ia hidup, tetapi tenaga kesehatan tetap punya tanggung jawab untuk memperjuangkan setiap jam yang tersisa.',
      'Disampaikan di hadapan dokter internship, kalimat ini juga berfungsi sebagai pembentukan karakter klinis sejak dini: menanamkan keyakinan bahwa menyerah pada takdir bukan pilihan yang boleh diambil terlalu cepat, sebelum semua upaya sungguh-sungguh habis.',
      'Bagi Dr. Ferdi, "takdir" bukan alasan untuk berhenti berusaha. Takdir adalah kesimpulan yang hanya boleh diterima setelah semua upaya sungguh-sungguh telah dijalankan.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Pak, saya dr Ferdi Iskandar, dokter yang merawat anak bapak, sebelum dirujuk ke RS dan meninggal dalam perawatan, saya benar-benar minta maaf atas apa yang terjadi, saya seharusnya bisa berbuat lebih banyak. Maafkan saya.',
    year: 'Maret 2026',
    confirmedBy: 'Fact confirmed by Joseph Arianto sebagai saksi saat itu.',
    context:
      'Diucapkan pada kasus SAH, ketika keluhan fisik dan tanda-tanda pemeriksaan tidak sepenuhnya cocok. dr. Ferdi menyatakan sudah menjalankan SOP end to end, tidak memperoleh bukti yang cukup untuk mengunci kesimpulan diagnosis tersebut, melakukan stabilisasi sebaik mungkin, lalu merujuk pasien ke rumah sakit rujukan. Jawaban orang tua pasien justru: **"Anda seorang Dokter yang hebat dan seorang yang baik, anak saya sangat beruntung sempat bertemu anda. Terima kasih banyak atas bantuannya, faskes ini benar-benar berarti buat keluarga saya."** Atas cerita Joseph Arianto, setelah percakapan itu dr. Ferdi berjalan pulang ke rumah tanpa berbicara satu kata pun. Dalam beberapa waktu sesudahnya, beliau tampak berbeda, diam, dan murung.',
    reflection: [
      'Kutipan ini memperlihatkan sisi yang sangat jarang terlihat dari seorang dokter: kesediaan untuk meminta maaf bahkan ketika seluruh langkah prosedural sudah dijalankan sejauh yang dapat dibuktikan.',
      'Di sini yang penting bukan hanya apakah SOP sudah dilakukan, tetapi bagaimana dr. Ferdi memandang tanggung jawab moralnya setelah hasil akhirnya tetap buruk.',
      'Ia tidak bersembunyi di balik bahasa teknis, tidak langsung berlindung pada kompleksitas kasus, dan tidak memindahkan seluruh beban kepada sistem rujukan. Ia datang sebagai dokter yang merawat, dan berbicara sebagai manusia kepada ayah pasien.',
      'Kalimat "saya seharusnya bisa berbuat lebih banyak" tidak selalu harus dibaca sebagai pengakuan kelalaian prosedural. Dalam konteks ini, itu lebih terasa sebagai bentuk tanggung jawab batin: perasaan bahwa nyawa manusia selalu meninggalkan ruang penyesalan, bahkan ketika tindakan medis sudah dikerjakan sebaik mungkin.',
      'Kasus SAH yang tanda klinisnya tidak sepenuhnya match mengingatkan publik bahwa dunia medis tidak selalu memberikan pola yang rapi. Ada situasi ketika keluhan, pemeriksaan, dan bukti objektif tidak bergerak dalam garis lurus yang mudah dibaca.',
      'Justru karena ketidakpastian itu, permintaan maaf ini menjadi sangat kuat. Ia menunjukkan bahwa menjadi dokter bukan hanya tentang mengikuti algoritme klinis, tetapi juga tentang berani tetap hadir ketika hasil akhirnya tidak menyelamatkan pasien.',
      'Respons orang tua pasien memberi lapisan yang sangat penting: ketika seorang dokter datang dengan kejujuran dan penyesalan yang tulus, keluarga tidak selalu menjawab dengan kemarahan. Kadang yang muncul justru pengakuan bahwa kehadiran, usaha, dan ketulusan dokter itu sendiri sudah sangat berarti.',
      'Bagi masyarakat, kutipan ini penting karena memperlihatkan perbedaan antara defensif dan bertanggung jawab. Defensif hanya akan berkata bahwa semua prosedur sudah dijalankan. Bertanggung jawab masih sanggup berkata: saya tetap menyesal, dan saya tetap minta maaf.',
      'Di titik ini, hubungan antara dokter dan keluarga pasien tidak lagi hanya soal hasil klinis, tetapi juga soal martabat, kejujuran, dan cara manusia saling memandang di saat paling berat.',
      'Detail bahwa dr. Ferdi berjalan pulang tanpa berbicara satu kata pun setelah percakapan itu memperlihatkan bahwa respons keluarga tersebut tidak menghapus berat peristiwa yang baru saja terjadi. Ia tidak pulang dalam kemenangan, melainkan dalam diam yang penuh beban.',
      'Pada akhirnya, kutipan ini bukan hanya tentang kematian pasien setelah rujukan. Ini tentang keberanian seorang dokter untuk menanggung beratnya hasil, bahkan ketika bukti-bukti klinis tidak memberi jawaban yang sempurna sejak awal.',
    ],
  },
  {
    type: 'section',
    heading: 'Catatan Editorial',
    paragraphs: [
      'Celotehan-celotehan ini tidak selalu nyaman.',
      'Sebagian terdengar provokatif. Sebagian memotong terlalu cepat. Sebagian berangkat dari emosi yang sangat personal.',
      'Namun, justru di situlah nilainya.',
      'Kalimat-kalimat ini memperlihatkan seseorang yang: mempertanyakan batas antara manusia dan mesin; menolak pasrah terhadap kesehatan; menganggap hidup sebagai bentuk pengabdian; dan tidak menempatkan kekayaan pribadi sebagai ukuran utama keberhasilan.',
      'Tidak semua orang harus setuju dengan cara Dr. Ferdi mengucapkannya.',
      'Tetapi hampir selalu terdapat alasan yang jelas mengapa kalimat itu keluar.',
      'Dan di balik semua ketajaman itu, terdapat pola yang sama:',
      'Jangan hidup tanpa berpikir. Jangan menerima sesuatu hanya karena semua orang terbiasa menerimanya. Jangan mengaku peduli bila tidak bersedia bertanggung jawab. Dan jangan mengukur hidup hanya dari apa yang berhasil dikumpulkan untuk diri sendiri.',
      'Dr. Ferdi bukan orang yang selalu memilih kata paling lembut.',
      'Ia dapat terdengar keras, sarkastik, atau tidak sabar—terutama ketika berhadapan dengan kebohongan, pekerjaan seremonial, standar yang diturunkan, dan orang yang menolak menggunakan kemampuan berpikirnya.',
      'Namun, kumpulan ini tidak dimaksudkan untuk membenarkan setiap pilihan kata.',
      'Sebaliknya, halaman ini mencoba menampilkan manusia secara utuh: prinsipnya, humornya, ketidaksempurnaannya, kontradiksinya, dan alasan di balik reaksinya.',
      'Karena kejujuran bukan berarti selalu terlihat baik.',
      'Kejujuran berarti bersedia terlihat sebagaimana adanya.',
    ],
  },
  {
    type: 'quote',
    quote: 'Hey, saya gak cacat.',
    year: 'Januari 2022',
    confirmedBy: 'Fact, confirmed by Rizal',
    context:
      'Diucapkan saat seorang asisten hendak mengambilkan kertas resep yang habis di Poli Layanan Umum.',
    reflection: [
      'Bukan penolakan terhadap bantuan, melainkan refleks kemandirian. Dr. Ferdi terbiasa mengerjakan sendiri hal yang masih dapat ia lakukan, tanpa merasa jabatan membuat pekerjaan sederhana menjadi tanggung jawab orang lain.',
      'Kalimatnya memang langsung dan dapat terdengar keras. Namun, pesan dasarnya sederhana:',
      'Jangan melayani saya hanya karena posisi saya. Saya masih mampu melakukannya sendiri.',
    ],
  },
  {
    type: 'quote',
    quote: 'Oh, okay. Rapat, ya? Emang ada otak?',
    year: 'Juni 2026',
    confirmedBy: 'Fact, confirmed by Joseph Arianto',
    context:
      'Diucapkan ketika seorang rekan mengingatkan bahwa terdapat rapat operasional yang harus dihadiri.',
    reflection: [
      'Bagi Dr. Ferdi, keberadaan rapat tidak otomatis berarti terdapat pemikiran, keputusan, atau kemajuan.',
      'Kalimat ini merupakan sindiran terhadap rapat yang hanya menghabiskan waktu, mengulang masalah lama, dan tidak menghasilkan penanggung jawab maupun tindakan yang jelas.',
      'Bukan rapatnya yang ia benci.',
      'Yang ia benci adalah ritual organisasi tanpa pemikiran.',
      'Kehadiran banyak orang di satu ruangan tidak selalu berarti sebuah organisasi sedang berpikir.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Yang saya suka tentang memahami suatu hal adalah menikmati sekumpulan orang berbicara tanpa mereka mengerti apa yang mereka bicarakan. Seperti menonton komedi gratis.',
    year: 'April 2026',
    confirmedBy: 'Fact, confirmed by Nurmayatul Handayani A.Md.RMIK',
    context:
      'Diucapkan saat menjelaskan mengapa ia seringkali tersenyum ketika intensitas sebuah rapat meningkat.',
    reflection: [
      'Kalimat ini menjelaskan sesuatu yang selama ini tersembunyi di balik ekspresinya: senyum yang muncul justru ketika rapat memanas bukan tanda ia menikmati konflik, melainkan tanda ia sedang mengamati sesuatu yang lain.',
      'Bagi Dr. Ferdi, memahami suatu persoalan secara mendalam memberi sudut pandang yang berbeda dari orang-orang di sekitarnya yang masih meraba-raba. Dari sudut pandang itu, perdebatan yang penuh keyakinan tetapi minim pemahaman terasa seperti pertunjukan, bukan ancaman.',
      '"Seperti menonton komedi gratis" adalah cara halus untuk mengatakan: ia melihat kepercayaan diri yang tidak sebanding dengan pemahaman, dan memilih menahan diri daripada langsung mengoreksi semua orang di ruangan.',
      'Ini juga menjadi mekanisme bertahan yang khas: alih-alih terbawa frustrasi saat rapat semakin intens dan tidak produktif, ia mengambil jarak secukupnya untuk tetap tenang—bahkan menemukan sisi jenaka dari kebingungan kolektif di ruangan.',
      'Kalimat ini sejalan dengan pandangannya di tempat lain tentang rapat dan berpikir: baginya, kehadiran fisik dan suara yang lantang bukan bukti bahwa seseorang benar-benar memahami apa yang sedang dibicarakan.',
      'Namun, ada sisi yang perlu diwaspadai dari cara pandang ini: rasa geli terhadap ketidakpahaman orang lain bisa dengan mudah bergeser menjadi keangkuhan bila tidak diimbangi dengan kesediaan menjelaskan, bukan hanya mengamati dari jarak aman.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Saya cuma ingin tahu, bagaimana bila saya bekerja di faskes setiap hari, namun menolak absen—mana yang lebih penting? Dan saya masih menunggu.',
    year: 'Mei 2025',
    confirmedBy: 'Fact, confirmed by Joseph Arianto',
    context:
      'Diucapkan sebagai bentuk protes terhadap kebiasaan pegawai negeri yang melakukan absensi lalu pulang tanpa benar-benar bekerja.',
    reflection: [
      'Kalimat ini adalah sindiran terhadap budaya kerja birokratis yang menilai kehadiran dari catatan absensi, bukan dari hasil kerja yang sesungguhnya.',
      'Bagi Dr. Ferdi, ada pertanyaan yang lebih mendasar daripada "apakah seseorang tercatat hadir": apakah orang itu benar-benar bekerja dan melayani.',
      'Pertanyaan ini disusun sebagai eksperimen pikiran: bila seseorang hadir dan bekerja setiap hari di fasilitas kesehatan, tetapi menolak mengisi absensi formal, mana yang sebenarnya lebih penting bagi pasien—catatan kehadiran, atau pekerjaan yang benar-benar dilakukan?',
      'Pertanyaan ini menyentil kebiasaan yang justru sebaliknya: rajin absen, tetapi tidak benar-benar bekerja—datang untuk mencatatkan kehadiran, lalu pulang.',
      'Bagi Dr. Ferdi, absensi tanpa kerja nyata adalah bentuk kepura-puraan administratif. Ia lebih menghargai kerja tanpa pengakuan formal daripada pengakuan formal tanpa kerja.',
      '"Dan saya masih menunggu" di akhir kalimat bukan sekadar penutup retoris. Ia menunjukkan bahwa pertanyaan ini belum pernah benar-benar dijawab secara jujur oleh sistem yang ia kritik.',
      'Ini sejalan dengan pola pikirnya di tempat lain: ia lebih peduli pada substansi daripada ritual, dan lebih menghargai kehadiran yang berarti daripada kehadiran yang sekadar tercatat.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Think, karena banyak orang bahkan tidak mampu menjalankan fungsi dasarnya sebagai MANUSIA.',
    year: 'Desember 2024',
    confirmedBy: 'Fact, confirmed by Michael Subrata',
    context:
      'Diucapkan ketika seorang rekan bertanya mengapa, dalam beberapa kesempatan, Dr. Ferdi terlihat marah.',
    reflection: [
      'Bagi Dr. Ferdi, berpikir bukan semata-mata kemampuan intelektual. Berpikir berarti menggunakan akal, nurani, tanggung jawab, dan kesadaran terhadap akibat dari tindakan sendiri.',
      'Kemarahan biasanya muncul bukan karena orang melakukan kesalahan biasa, melainkan ketika seseorang: mengetahui sesuatu tidak benar tetapi membiarkannya; memilih berpura-pura daripada berkata jujur; menghindari tanggung jawab; atau berhenti memikirkan dampaknya terhadap orang lain.',
      'Kalimat ini keras karena standar yang digunakan juga mendasar:',
      'Sebelum menjadi pegawai, profesional, pemimpin, atau ahli—jadilah manusia yang berpikir dan bertanggung jawab.',
    ],
  },
  {
    type: 'quote',
    quote: 'Hehe, karena Sentra lebih besar daripada saya dan kamu.',
    year: 'Maret 2026',
    confirmedBy: 'Fact, confirmed by Michael Subrata',
    context:
      'Diucapkan ketika seorang rekan mengingatkan tentang pola kerja hingga 22 jam sehari selama sekitar 14 bulan.',
    reflection: [
      'Jawabannya disampaikan dengan tawa kecil, tetapi isinya serius.',
      'Bagi Dr. Ferdi, Sentra bukan sekadar perusahaan, proyek teknologi, atau ambisi pribadi. Sentra dipandang sebagai sesuatu yang harus bertahan melampaui pendiri, tim awal, dan kepentingan individu yang sedang membangunnya.',
      'Kalimat ini menjelaskan mengapa ia bersedia bekerja dengan intensitas yang sering sulit dipahami orang lain.',
      'Bila sesuatu hanya dibangun untuk diri sendiri, pengorbanan sebesar itu tidak masuk akal. Tetapi bila yang dibangun dapat melampaui diri sendiri, rasa lelah memperoleh makna yang berbeda.',
      'Kalimat ini juga menyimpan peringatan: misi yang besar tetap membutuhkan cara kerja yang sehat agar tidak menghancurkan orang yang memperjuangkannya.',
    ],
  },
  {
    type: 'quote',
    quote: 'Shut up. It must be 100% perfect, or delete it!',
    year: 'Juni 2026',
    context:
      'Diucapkan ketika Claude berusaha menjelaskan bahwa infrastruktur salah satu algoritme sudah cukup baik.',
    reflection: [
      'Ini adalah ekspresi paling telanjang dari perfeksionisme Dr. Ferdi.',
      'Ia tidak mudah menerima istilah cukup baik ketika sistem menyangkut keselamatan, integritas bukti, atau keputusan yang dapat berdampak kepada manusia. Dalam konteks tersebut, "hampir benar" dapat berarti "masih berbahaya."',
      'Namun, kalimat ini juga menunjukkan sisi yang perlu terus dijaga.',
      'Tidak semua bagian produk harus mencapai kesempurnaan yang sama pada waktu yang sama. Infrastruktur keselamatan memang tidak boleh setengah matang. Akan tetapi, bagian nonkritis dapat dibangun secara bertahap selama batasannya jelas dan tidak diklaim lebih dari kenyataan.',
      'Pesan intinya:',
      'Jangan mempertahankan sesuatu hanya karena sudah banyak waktu dicurahkan ke dalamnya. Bila fondasinya salah, perbaiki secara menyeluruh atau buang.',
    ],
  },
  {
    type: 'quote',
    quote: 'Karena saya nyaman, dan saya tidak merasa perlu untuk membeli yang baru.',
    year: 'Januari 2026',
    confirmedBy: 'Fact, confirmed by Joseph Arianto',
    context:
      'Diucapkan ketika seorang rekan bertanya mengapa Dr. Ferdi tetap menggunakan sepatu yang sobek dan sudah usang.',
    reflection: [
      'Jawaban ini mungkin terlihat sederhana, tetapi cukup banyak menjelaskan dirinya.',
      'Ia tidak terlalu tertarik mengganti sesuatu hanya karena terlihat lama, tidak lagi modis, atau dianggap tidak sesuai dengan posisi sosialnya. Selama sesuatu masih nyaman dan berfungsi, ia tidak merasa perlu mencari pengganti.',
      'Di tengah perhatian besar terhadap teknologi dan desain, kehidupan pribadinya justru cenderung praktis.',
      'Nilai suatu benda tidak selalu ditentukan oleh penampilannya. Terkadang, cukup karena benda itu masih berguna dan terasa tepat.',
      'Sepatu itu mungkin tampak usang bagi orang lain. Bagi pemiliknya, ia hanya belum selesai digunakan.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Karena semua yang saya lakukan ini untuk menjamin masa depan kesehatan anak-anak saya akan lebih baik.',
    year: 'April 2026',
    confirmedBy: 'Fact, confirmed by Michael Subrata',
    context:
      'Diucapkan ketika seorang rekan bertanya mengapa Sentra terasa begitu penting dan personal.',
    reflection: [
      'Ini mungkin merupakan salah satu kalimat yang paling jujur mengenai alasan Sentra dibangun.',
      'Di balik teknologi, algoritme, sistem rumah sakit, clinical intelligence, dan ambisi institusional, terdapat dorongan yang sangat sederhana: seorang ayah ingin masa depan kesehatan anak-anaknya lebih baik daripada sistem yang tersedia hari ini.',
      'Anak-anak dalam kalimat tersebut dapat dimaknai secara personal, tetapi juga lebih luas—generasi berikutnya yang kelak akan menjadi pasien, tenaga kesehatan, dan pewaris sistem kesehatan yang sedang dibentuk hari ini.',
      'Sentra bukan hanya persoalan teknologi. Ia adalah cara seorang ayah menolak menerima bahwa anak-anaknya harus mewarisi kelemahan yang sebenarnya dapat diperbaiki.',
      'Itulah mengapa Sentra tidak pernah benar-benar terasa sebagai proyek biasa.',
      'Ia terlalu dekat dengan keluarga, harapan, ketakutan, dan tanggung jawab pribadi.',
    ],
  },
  {
    type: 'quote',
    quote:
      'Ijin dokter, saya tidak punya alasan, saya tidak menyiapkan cerita, saya salah dan saya siap menerima hukuman. Namun saya seorang Ayah dan tanggung jawab saya sebagai Ayah adalah yang utama, di atas ujian tersebut.',
    confirmedBy: 'Probably fact, susah untuk dibuktikan, namun dr Ferdi mengkonfirmasi.',
    context:
      'Diucapkan saat harus menghadap dosen karena melewatkan ujian penting pada masa studi. Pada akhirnya, dr. Ferdi tetap lulus tanpa menjalani ujian tersebut.',
    reflection: [
      'Kalimat ini memperlihatkan bentuk tanggung jawab yang tidak dibungkus pembelaan diri. Ia tidak mencari alasan, tidak menyiapkan drama, dan tidak berusaha menghindari konsekuensi.',
      'Kalimat pembukanya sangat telanjang: saya salah, dan saya siap menerima hukuman. Itu menunjukkan kesediaan untuk menanggung akibat tanpa memanipulasi situasi agar tampak lebih ringan.',
      'Namun, yang membuat kutipan ini penting adalah kalimat sesudahnya. Ia menempatkan perannya sebagai ayah di atas ujian yang secara akademik dianggap penting. Bukan karena pendidikan tidak bernilai, melainkan karena pada momen itu ada tanggung jawab yang menurutnya lebih mendasar.',
      'Di sini terlihat lagi pola yang konsisten dalam banyak keputusan dr. Ferdi: ia berkali-kali mengukur hidup bukan hanya dengan standar institusi, tetapi dengan standar tanggung jawab personal yang ia anggap tidak bisa ditunda.',
      'Bagi sebagian orang, pilihan seperti ini bisa terlihat tidak disiplin. Namun, dari sisi lain, ini adalah definisi prioritas yang sangat jelas. Ia bersedia menerima label salah dalam sistem, selama ia tidak gagal dalam tanggung jawab yang ia anggap paling utama.',
      'Kutipan ini juga penting bagi publik karena banyak orang hidup di antara dua tekanan: kewajiban formal di satu sisi dan kewajiban keluarga di sisi lain. Tidak semua orang punya keberanian untuk mengatakan dengan jujur mana yang mereka pilih ketika dua hal itu bertabrakan.',
      'Dr. Ferdi tampaknya memilih jalan yang paling berat: tetap mengakui kesalahan pada sistem, tetapi tidak berpura-pura bahwa sistem itu lebih tinggi daripada perannya sebagai ayah.',
      'Fakta bahwa ia tetap lulus tanpa menjalani ujian itu memberi lapisan tambahan pada kisah ini: sistem yang awalnya tampak kaku ternyata masih menyisakan ruang bagi penilaian manusia, konteks, dan keputusan yang tidak sepenuhnya mekanis.',
      'Pada akhirnya, kutipan ini bukan tentang ujian yang terlewat. Ini tentang nilai yang dipakai seseorang saat harus memilih, lalu bersedia membayar harga dari pilihannya sendiri.',
    ],
  },
  {
    type: 'section',
    heading: 'Penutup',
    paragraphs: [
      'Ditulis secara langsung saat halaman ini dimulai, berikut tulisannya.',
      'Saya tidak selalu berbicara dengan sopan dan rapi. Saya bahkan menggunakan kaos dan jeans sebagai pakaian kerja sehari-hari. Saya juga tidak selalu mudah dipahami, dan saya seringkali tidak mengerti apa yang kalian pikirkan. Saya bukan orang pintar—saya pintar karena saat kalian tidur, saya belajar. Saya tampaknya bekerja sebagai seorang dokter yang cerdas. The truth? Itu karena saya pernah bekerja di sekumpulan orang tolol, maka saya terlihat pintar.',
      'Saya menikmati hidup bukan karena saya memiliki banyak hal, saya menikmatinya karena saya bersyukur di beri kesempatan menjadi Manusia. Ingat, tidak semua manusia memahami bahwa mereka belum menjalani fungsi dasar nya sebagai Manusia. Dan tentu saya tidak meluangkan waktu untuk memikirkan apa pendapat mereka.',
      'Make it simple. Be kind. Be honest. Help others.',
    ],
  },
]
