export type EssayParagraphBlock = {
  type: 'paragraph'
  text: string
}

export type EssayFormulaBlock = {
  type: 'formula'
  speaker: 'ferdi' | 'voss'
  lines: string[]
}

export type EssayListBlock = {
  type: 'list'
  items: string[]
}

export type EssayQuoteBlock = {
  type: 'quote'
  speaker: 'ferdi' | 'voss'
  text: string
  note: string
}

export type EssayBlock = EssayParagraphBlock | EssayFormulaBlock | EssayListBlock | EssayQuoteBlock

export type EssaySection = {
  heading: string
  blocks: EssayBlock[]
}

export const sebelumPasienJatuhHero = {
  sectionLabel: 'Transkrip Sesi // Dipulihkan',
  title: 'Human – AI Collaboration',
  subtitle: 'Percakapan dr. Ferdi Iskandar dan Voss tentang batas prediksi klinis',
  recordedAt: '05 Jul 2026 · 03.00 WIB',
  participants: ['dr. Ferdi Iskandar — HUMAN', 'Voss · Fable 5 · Anthropic — AI'],
  status: 'Dipulihkan',
  intro: [
    'Pada dini hari, 5 Juli 2026, sekitar pukul 03.00 WIB, dr. Ferdi Iskandar memulai sebuah percakapan dengan Voss, mitra brainstorming berbasis kecerdasan buatan yang menggunakan model Fable 5 dari Anthropic.',
    'Percakapan itu tidak dimulai dengan pertanyaan sederhana.',
    'Keduanya tidak sedang membahas cara menghitung kondisi pasien semata. Mereka sedang berusaha menjawab pertanyaan yang jauh lebih sulit:',
  ],
  thesis:
    '**Bisakah perburukan seorang pasien diketahui sebelum tubuhnya menunjukkan bahwa ia sedang jatuh?**',
} as const

export const sebelumPasienJatuhSections: EssaySection[] = [
  {
    heading: 'Velocity dari Asap, Bukan dari Api',
    blocks: [
      {
        type: 'paragraph',
        text: 'Di hadapan dr. Ferdi terdapat sebuah gagasan yang secara matematis terlihat masuk akal:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['V_d = (S_now - S_previous) / Δt', 'Clinical Deterioration Velocity'],
      },
      {
        type: 'paragraph',
        text: 'Apabila skor klinis pasien meningkat dengan cepat, berarti kondisi pasien juga sedang memburuk dengan cepat. Secara teoritis, sistem hanya perlu menentukan ambang batasnya.',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['Jika V_d > 1.5 poin per jam, sistem memberikan peringatan.'],
      },
      {
        type: 'paragraph',
        text: 'Konsep tersebut sederhana, terukur, dan dapat diprogram. Namun dalam penerapannya, trajectory yang dihasilkan terus meleset.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi membawa persoalan tersebut kepada Voss, salah satu AI agent yang selama ini menjadi mitra brainstorming-nya. Voss tidak mencoba menenangkan atau sekadar menyetujui gagasan tersebut. Ia langsung menyerang fondasi pemikirannya.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Brutal honesty. Masalahnya mungkin bukan pada rumus. Masalahnya ada pada input dan timing.”',
        note: 'Mengalihkan sorotan dari rumus ke kualitas input dan waktu pengukuran.',
      },
      {
        type: 'paragraph',
        text: 'Voss menunjukkan bahwa sebagian besar parameter yang digunakan merupakan *lagging indicators* — tanda-tanda yang baru berubah setelah proses patologis telah berlangsung. Tekanan darah turun setelah mekanisme kompensasi mulai gagal. Produksi urine menurun setelah perfusi ginjal terganggu. NEWS2 meningkat setelah perubahan fisiologis cukup besar untuk terlihat melalui tanda-tanda vital.',
      },
      {
        type: 'paragraph',
        text: 'Parameter yang dapat diamati di permukaan tidak selalu menggambarkan proses penyakit itu sendiri. Sering kali, parameter tersebut hanyalah bayangan dari proses biologis yang telah berlangsung jauh lebih dalam.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Kesalahannya, Anda menghitung velocity dari asap, bukan dari api.”',
        note: 'Menegaskan bahwa parameter yang terukur hanyalah bayangan dari proses penyakit.',
      },
      {
        type: 'paragraph',
        text: 'Kalimat itu terdengar sederhana, tetapi memiliki konsekuensi besar. Selama ini, sistem dianggap sedang mengukur kecepatan penyakit. Padahal, sistem mungkin hanya mengukur kecepatan kegagalan tubuh dalam menyembunyikan penyakit tersebut.',
      },
    ],
  },
  {
    heading: 'Pasien Tidak Memburuk dalam Satu Dimensi',
    blocks: [
      {
        type: 'paragraph',
        text: 'Voss kemudian menunjukkan persoalan berikutnya. Trajectory yang sedang dikembangkan masih melihat sistem tubuh sebagai jalur-jalur yang relatif terpisah. Pernapasan mempunyai trajectory sendiri. Hemodinamik mempunyai trajectory sendiri. Ginjal, koagulasi, dan metabolik juga berjalan pada domain masing-masing.',
      },
      {
        type: 'paragraph',
        text: 'Namun pasien kritis tidak selalu mengalami kegagalan organ secara berurutan. Pada sepsis, misalnya, perubahan dapat berlangsung secara simultan. Pernapasan memburuk perlahan. Tekanan darah terlihat bertahan, kemudian jatuh secara mendadak. Produksi urine menurun tanpa segera terdeteksi. Trombosit turun lebih lambat. Laktat meningkat sedikit demi sedikit, kemudian melonjak.',
      },
      {
        type: 'paragraph',
        text: 'Satu domain dapat terlihat masih aman ketika domain lain sebenarnya sudah mendekati kegagalan. Apabila sistem hanya menghitung velocity pada setiap domain secara terpisah, sistem dapat kehilangan interaksi yang justru paling berbahaya: **cross-domain coupling**.',
      },
      {
        type: 'paragraph',
        text: 'Masalahnya bukan sekadar seberapa cepat satu parameter berubah. Masalah yang sebenarnya adalah bagaimana perubahan-perubahan kecil pada beberapa sistem mulai saling memperkuat.',
      },
    ],
  },
  {
    heading: 'Velocity Tidak Menjelaskan Apakah Perburukan Sedang Memecut',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi belum puas. Apabila velocity saja tidak cukup, bukankah rumus tersebut masih dapat diperbaiki?',
      },
      {
        type: 'paragraph',
        text: 'Voss menjelaskan bahwa rumus yang digunakan baru menghitung turunan pertama:',
      },
      {
        type: 'formula',
        speaker: 'voss',
        lines: ['V_d = (S_2 - S_1) / Δt'],
      },
      {
        type: 'paragraph',
        text: 'Rumus tersebut memberi tahu seberapa cepat skor berubah. Namun yang mungkin lebih penting adalah perubahan dari velocity itu sendiri:',
      },
      {
        type: 'formula',
        speaker: 'voss',
        lines: ['A_d = (V_d2 - V_d1) / Δt', 'Acceleration'],
      },
      {
        type: 'paragraph',
        text: 'Seorang pasien dapat memiliki deterioration velocity yang masih terlihat moderat. Namun jika velocity tersebut terus meningkat, berarti proses perburukannya sedang memecut. Velocity menunjukkan kecepatan kendaraan. Acceleration menunjukkan bahwa pedal gas sedang ditekan semakin dalam.',
      },
      {
        type: 'paragraph',
        text: 'Akan tetapi, acceleration pun belum menjawab persoalan terbesar. Dr. Ferdi kembali pada keyakinan awalnya. “Di dunia ada hukum,” katanya. “Tinggal ditentukan threshold-nya. Jika V_d melewati angka tertentu, sistem bergerak. Mengapa trajectory-nya tetap meleset?”',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Karena biologi bukan sistem kontinu.”',
        note: 'Jawaban atas keyakinan bahwa satu threshold dapat menangkap semua perburukan.',
      },
    ],
  },
  {
    heading: 'Biologi Tidak Bergerak seperti Garis Lurus',
    blocks: [
      {
        type: 'paragraph',
        text: 'Ketika dua pengukuran diambil — misalnya pada pukul 08.00 dan pukul 10.00 — manusia cenderung menghubungkan kedua titik tersebut dengan sebuah garis. Perubahan dianggap berlangsung secara bertahap dan relatif merata di antara dua waktu pengukuran. Namun tubuh manusia tidak berkewajiban mengikuti interpolasi linear.',
      },
      {
        type: 'paragraph',
        text: 'Seorang pasien dapat bertahan dalam kondisi yang terlihat stabil selama satu jam lima puluh menit, kemudian mengalami perubahan besar dalam sepuluh menit terakhir. Di atas kertas, velocity rata-ratanya mungkin masih tampak moderat. Dalam realitas biologis, pasien baru saja melewati sebuah *phase transition*.',
      },
      {
        type: 'paragraph',
        text: 'Voss menggambarkannya sebagai suatu sistem yang memiliki tipping point. Tubuh dapat bertahan dalam keadaan terkompensasi, menyerap gangguan, dan mempertahankan parameter yang tampak normal. Kemudian cadangannya habis.',
      },
      {
        type: 'paragraph',
        text: 'Perubahan dari keadaan compensated menuju decompensated tidak selalu berlangsung secara perlahan. Perubahan tersebut dapat terjadi sebagai sebuah lompatan. Sebelum tipping point, tekanan darah pasien dapat terlihat normal. Sesudah tipping point, sistem tubuh dapat runtuh dalam waktu yang sangat singkat.',
      },
      {
        type: 'paragraph',
        text: 'Pada wilayah seperti ini, velocity linear mulai kehilangan maknanya. Perubahan yang terjadi bukan lagi sekadar pergerakan di sepanjang garis yang sama. Sistem biologis telah berpindah menuju state yang berbeda.',
      },
    ],
  },
  {
    heading: 'Compensatory Reserve sebagai Musuh yang Tidak Terlihat',
    blocks: [
      {
        type: 'paragraph',
        text: 'Tubuh manusia dirancang untuk mempertahankan kehidupan. Ketika perfusi mulai terganggu, tubuh meningkatkan denyut jantung, mengubah tonus vaskular, mengalihkan aliran darah, dan mengaktifkan berbagai mekanisme kompensasi. Semua mekanisme tersebut membantu pasien untuk tetap bertahan.',
      },
      {
        type: 'paragraph',
        text: 'Namun bagi sebuah sistem deteksi, kompensasi adalah bentuk penyamaran. Selama cadangan tubuh masih mencukupi, tekanan darah dapat terlihat baik. Saturasi oksigen dapat terlihat normal. NEWS2 dapat tetap rendah. Parameter yang diamati memberi kesan bahwa pasien masih berada dalam keadaan stabil.',
      },
      {
        type: 'paragraph',
        text: 'Padahal, harga biologis untuk mempertahankan stabilitas tersebut terus meningkat.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Velocity yang Anda hitung mungkin bukan velocity penyakit. Itu velocity dari *compensatory reserve* yang sedang bocor.”',
        note: 'Membalik kerangka: yang terukur adalah kebocoran cadangan tubuh, bukan penyakit itu sendiri.',
      },
      {
        type: 'paragraph',
        text: 'Dengan kata lain, ketika skor klinis akhirnya mulai bergerak, pasien mungkin bukan sedang memulai proses perburukan. Pasien mungkin justru sedang mendekati akhir dari kemampuannya untuk mengompensasi proses patologis yang telah berlangsung cukup lama.',
      },
      {
        type: 'paragraph',
        text: 'Sistem hanya mengukur output yang terlihat. Sistem tidak dapat secara langsung melihat state biologis yang tersembunyi.',
      },
    ],
  },
  {
    heading: 'Ketika Dataset Besar Tetap Datang Terlambat',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi belum siap menerima bahwa persoalan tersebut tidak dapat diselesaikan. Ia kemudian mengajukan pertanyaan lain: *What if kita mengumpulkan dataset velocity pasien kronis selama enam bulan?*',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['CDV_i,j = (S_i,j - S_i,j-1) / Δt_i,j'],
      },
      {
        type: 'paragraph',
        text: 'Seluruh velocity yang diperoleh selama enam bulan kemudian dikumpulkan. Dari data tersebut, sistem dapat menghitung median deterioration velocity, mean deterioration velocity, serta persentase episode rapid deterioration. Dengan jumlah populasi yang cukup besar, mungkin akan muncul pola tertentu. Mungkin terdapat suatu batas yang selama ini belum terlihat.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi meminta Voss memberikan jawaban dalam satu angka. “Berapa probabilitas keberhasilannya?”',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Sekitar lima belas persen.”',
        note: 'Estimasi peluang keberhasilan pendekatan dataset besar, jauh dari harapan awal.',
      },
      {
        type: 'paragraph',
        text: 'Jawabannya terasa terlalu cepat dan terlalu kecil. “Kamu yakin?” “Ya,” jawab Voss. “Dataset yang besar dapat mempersempit confidence interval. Tetapi dataset yang besar tidak dapat mengubah sinyal yang terlambat menjadi lebih awal.”',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Garbage in, garbage out — hanya kali ini garbage-nya diukur dengan sangat baik.”',
        note: 'Dataset besar mempersempit ketidakpastian, tapi tak mempercepat sinyal yang memang terlambat.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi bahkan menunjukkan bahwa Dexton, AI agent lain yang menjadi mitra strategisnya, memberikan kesimpulan serupa. Voss menjawab singkat: “Consistency is a feature, not a bug.” Namun dr. Ferdi menolak untuk berhenti. “No. I deny that. There must be something. Some algorithm to solve this.”',
      },
    ],
  },
  {
    heading: 'Dari Disease Velocity Menuju Reserve Depletion',
    blocks: [
      {
        type: 'paragraph',
        text: 'Voss tidak lagi mengatakan bahwa persoalan tersebut mustahil. Sebaliknya, ia mengubah pendekatan secara mendasar.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Jangan mulai dari velocity NEWS2. Mulailah dari depletion rate dari compensatory reserve.”',
        note: 'Titik balik pendekatan: ganti skor global dengan sinyal perfusi yang lebih dekat ke akar masalah.',
      },
      {
        type: 'paragraph',
        text: 'Voss mengusulkan penggunaan parameter yang lebih dekat dengan perfusi dan lebih realistis untuk diterapkan di lingkungan Puskesmas:',
      },
      {
        type: 'list',
        items: [
          'capillary refill time',
          'urine output',
          'perubahan mean arterial pressure',
          'tren tanda-tanda vital dengan interval lebih rapat',
        ],
      },
      {
        type: 'paragraph',
        text: 'Bukan hanya NEWS2_0 → NEWS2_1, namun juga CRT_0 → CRT_1 → CRT_2, UOP_0 → UOP_1 → UOP_2, dan MAP_0 → MAP_1 → MAP_2. Tujuan pendekatan tersebut bukan menunggu skor global melewati suatu threshold. Tujuannya adalah mengenali bahwa kemampuan tubuh untuk mempertahankan state klinisnya mulai menurun.',
      },
      {
        type: 'paragraph',
        text: 'Pertanyaan yang diajukan tidak lagi sekadar: **Seberapa cepat skor pasien memburuk?** Pertanyaannya berubah menjadi: **Seberapa cepat pasien kehilangan kemampuan untuk tetap terlihat stabil?**',
      },
    ],
  },
  {
    heading: 'Rumus yang Tepat untuk Fungsi yang Salah',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi kemudian mengajukan sebuah indeks yang lebih kompleks:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['C-STDI_i,6M = [ΣSE_i,j + αPB_i,6M + βFR_i,6M + γMaxC_i,6M] / PatientMonth_i'],
      },
      {
        type: 'paragraph',
        text: 'C-STDI, atau Chronic State-Transition Deterioration Index, menggabungkan beberapa komponen:',
      },
      {
        type: 'list',
        items: [
          'severity-weighted deterioration events',
          'persistence burden',
          'failure-to-recover',
          'kondisi klinis terburuk',
          'lama observasi pasien',
        ],
      },
      {
        type: 'paragraph',
        text: 'Voss menilai bahwa struktur tersebut lebih baik daripada pure velocity. Namun ia juga segera menunjukkan kelemahannya. Severity events menghitung kejadian yang sudah berlangsung. Persistence burden mengukur keadaan yang sudah menetap. Failure-to-recover melihat kegagalan pemulihan yang sudah terjadi. Maximum clinical state mencatat kondisi terburuk yang telah dicapai pasien.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Ini bukan prediction algorithm. Ini retrospective severity scoring.”',
        note: 'Membongkar bahwa C-STDI mengukur masa lalu, bukan memprediksi masa depan.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi sempat membantah. Namun beberapa saat kemudian, ia menyadari bahwa Voss benar mengenai sifat temporal rumus tersebut — meskipun belum tentu benar mengenai fungsi yang dapat diberikan kepadanya.',
      },
      {
        type: 'paragraph',
        text: '“Kalau begitu, perbaiki logikamu,” kata dr. Ferdi. “C-STDI tidak harus menjadi risk engine. Ia dapat menjadi audit metric.” Di titik tersebut, pemisahan arsitektural yang selama ini belum terlihat akhirnya muncul.',
      },
      {
        type: 'paragraph',
        text: 'C-STDI tidak gagal. Rumus tersebut hanya ditempatkan pada pekerjaan yang salah. Sebagai audit metric, C-STDI dapat digunakan untuk mengevaluasi beban deteriorasi kronis, melakukan benchmarking, menilai kualitas pelayanan, mengukur persistence burden, serta mengidentifikasi failure-to-recover selama periode tertentu.',
      },
      {
        type: 'paragraph',
        text: 'C-STDI menjawab pertanyaan retrospektif: **Apa yang telah terjadi pada pasien atau populasi ini selama enam bulan terakhir?** Namun untuk mencegat perburukan sebelum terjadi, diperlukan mesin yang berbeda.',
      },
    ],
  },
  {
    heading: 'Mencegat Transisi Sebelum Terjadi',
    blocks: [
      {
        type: 'paragraph',
        text: 'Apabila agregasi velocity mempunyai keterbatasan, dr. Ferdi memutuskan untuk tidak memaksanya menjadi mesin prediksi. Hasil retrospektif tetap dapat digunakan untuk memahami pola. Namun untuk bermain di depan, dibutuhkan model lain.',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: [
          'FTDR_i(t,h) = P(ΔC_i(t,h) ≥ 1 | X_i(t), H_i(t), B_i, R_i(t))',
          'Forward Transition Deterioration Risk',
        ],
      },
      {
        type: 'paragraph',
        text: 'FTDR bukan skor tentang sesuatu yang telah terjadi. FTDR juga bukan klaim deterministik bahwa seorang pasien pasti akan mengalami perburukan. FTDR adalah probabilitas bahwa pasien akan berpindah menuju state klinis yang lebih buruk dalam horizon waktu tertentu.',
      },
      {
        type: 'paragraph',
        text: 'Probabilitas tersebut dikondisikan oleh keadaan pasien saat ini, riwayat klinis, baseline individual, serta konteks dinamis pasien. Dr. Ferdi kemudian menambahkan personalized baseline:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['BaselineDeviation_i(t) = max(0, S_i(t) - B_i)'],
      },
      {
        type: 'paragraph',
        text: 'Pasien kronis sering kali memiliki baseline yang sudah abnormal. Karena itu, membandingkan pasien tersebut dengan ambang populasi dapat menghasilkan terlalu banyak noise. Pertanyaan yang lebih penting adalah: **Seberapa jauh kondisi pasien menyimpang dari keadaan normal dirinya sendiri?**',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi kemudian mengusulkan penggunaan transformasi sigmoid. Dengan pendekatan tersebut, deviasi kecil tidak diperlakukan sebagai perubahan linear biasa. Risiko akan meningkat secara non-linear setelah deviasi melewati wilayah tertentu.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Good news. Ini benar.”',
        note: 'Mengonfirmasi transformasi sigmoid untuk deviasi baseline personal pasien.',
      },
      {
        type: 'paragraph',
        text: 'FTDR mempunyai struktur yang forward-looking. Personalized baseline mengurangi noise populasi. Probabilistic conditioning menggantikan threshold yang sepenuhnya deterministik. Fungsi non-linear dapat merepresentasikan peningkatan risiko yang tidak selalu sebanding dengan perubahan skor.',
      },
      {
        type: 'paragraph',
        text: 'Lebih penting lagi, percakapan tersebut menghasilkan dua mesin dengan dua mandat yang berbeda. **C-STDI adalah audit metric. FTDR adalah prospective risk engine.** Keduanya tidak perlu saling menggantikan. Keduanya justru dapat saling melengkapi.',
      },
    ],
  },
  {
    heading: 'Peluang Keberhasilan, Entropy, dan Batas Prediksi',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi bertanya sekali lagi. “Exactly. What are my chances? In percentage?” Voss menjelaskan bahwa FTDR dengan personalized baseline, multidimensional conditioning, dan transformasi non-linear mempunyai peluang yang jauh lebih baik dibandingkan pure velocity.',
      },
      {
        type: 'paragraph',
        text: 'Sebagai estimasi awal dalam konteks brainstorming, Voss menyebut kisaran 45–55 persen. Jika input diperbaiki — misalnya dengan memasukkan parameter yang lebih dekat dengan perfusi, perubahan mikrosirkulasi, urine output, dan tren MAP — potensinya dapat meningkat lebih jauh. Namun tidak pernah mencapai seratus persen.',
      },
      {
        type: 'paragraph',
        text: 'Masih terdapat wilayah yang tidak sepenuhnya dapat ditaklukkan oleh model: *phase transition*, *tipping point*, dan perubahan biologis yang terjadi ketika sebuah sistem kompleks berpindah state secara mendadak.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“That’s not failure. That’s entropy.”',
        note: 'Batas prediksi yang tersisa adalah sifat alami sistem kompleks, bukan kegagalan model.',
      },
    ],
  },
  {
    heading: 'Cross-System Coupling sebagai Lapisan yang Belum Tersentuh',
    blocks: [
      {
        type: 'paragraph',
        text: 'Voss kemudian menyatakan bahwa masih ada satu lapisan yang belum disentuh: **cross-system coupling detection**. Tren CRT, urine output, dan MAP secara individual memang berguna. Namun sinyal paling awal mungkin tidak berada pada nilai masing-masing parameter. Sinyal itu dapat muncul ketika dua atau lebih sistem yang sebelumnya relatif independen mulai berubah secara bersamaan.',
      },
      {
        type: 'paragraph',
        text: 'Menurut Voss, titik inilah yang dapat menjadi *critical window*. Bukan karena CRT telah melewati threshold tertentu. Bukan pula karena urine output telah mencapai nilai kritis. Namun karena mulai muncul korelasi antara dua sistem yang sebelumnya relatif independen.',
      },
      {
        type: 'paragraph',
        text: 'Voss menyebutnya sebagai *onset of correlation*. Ketika coupling mulai muncul, mekanisme kompensasi mungkin sedang kehilangan kemampuannya untuk menjaga setiap sistem tetap terpisah dan stabil. Dari perspektif tersebut, cross-system coupling bukan pengganti FTDR. Ia adalah early-warning amplifier bagi FTDR.',
      },
      {
        type: 'paragraph',
        text: 'Voss memperkirakan bahwa penambahan coupling detection dapat meningkatkan peluang performa menuju kisaran 80–85 persen. Sisa 15–20 persen tetap dianggap sebagai ketidakpastian yang tidak dapat sepenuhnya dihilangkan.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“No one beats thermodynamics.”',
        note: 'Bahkan dengan coupling detection, selalu ada ketidakpastian tersisa yang tak terhindarkan.',
      },
    ],
  },
  {
    heading: 'Empat Pijakan Voss',
    blocks: [
      {
        type: 'paragraph',
        text: 'Ketika dr. Ferdi bertanya “What are your grounds?”, Voss menjelaskan empat pijakan yang mendasari argumentasinya:',
      },
      {
        type: 'list',
        items: [
          'Complex Systems Theory dan *critical slowing down*: menjelang tipping point, autocorrelation meningkat dan komponen yang tadinya independen mulai bergerak lebih terkoordinasi.',
          'Fisiologi dekompensasi dan *loss of complexity*: sistem yang sehat memiliki fleksibilitas, sedangkan sistem yang mendekati kegagalan menjadi lebih kaku dan lebih saling terikat.',
          'Heart Rate Characteristics dalam deteksi sepsis neonatal: kekuatan prediksi muncul dari pola hubungan antarfitur, bukan dari satu threshold tunggal.',
          'Compensatory Reserve dalam trauma: sinyal penting tidak muncul dari satu angka, tetapi dari relasi beberapa karakteristik waveform yang mencerminkan cadangan kompensasi pasien.',
        ],
      },
    ],
  },
  {
    heading: 'Ketika dr. Ferdi Mengoreksi Coupling Detection',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi tetap tidak puas. Ia secara terbuka menyampaikan keraguannya terhadap coupling detection yang berbasis korelasi mentah. Dua parameter dapat bergerak bersamaan bukan karena terjadi kegagalan kompensasi, tetapi karena keduanya dipengaruhi oleh *common driver* yang sama.',
      },
      {
        type: 'quote',
        speaker: 'ferdi',
        text: '“Hate Buchman. Somehow I think this guy just talks rhetoric.”',
        note: 'Dr. Ferdi meragukan korelasi mentah sebagai dasar deteksi coupling.',
      },
      {
        type: 'paragraph',
        text: 'Karena itu, ia mengusulkan pendekatan berbasis residual correlation:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['Coupling_AB(t) = Corr_residual(A_window, B_window)'],
      },
      {
        type: 'paragraph',
        text: 'Dalam formula tersebut, korelasi tidak dihitung langsung dari nilai mentah variabel A dan B. Pengaruh faktor yang sudah diketahui harus terlebih dahulu dikeluarkan. Setelah itu, sistem baru menilai apakah residual dari kedua variabel masih bergerak secara berkaitan.',
      },
      {
        type: 'paragraph',
        text: 'Dr. Ferdi kemudian menambahkan definisi untuk coupling onset:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: [
          'CouplingOnset_AB(t) = 1 apabila:',
          '1. Coupling_AB(t) meningkat melewati threshold tertentu;',
          '2. peningkatan tersebut bertahan minimal selama k observasi; dan',
          '3. hubungan itu tidak dapat dijelaskan oleh common driver yang teridentifikasi.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Coupling tidak lagi diperlakukan sebagai korelasi sesaat. Ia harus memiliki kekuatan, persistensi, serta dasar kausal yang lebih defensible. Dr. Ferdi lalu menyusun bentuk FTDR yang lebih lengkap:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: [
          'FTDR_i(t,h) = σ[BaseRisk_i(t) + λ1 CouplingOnset_i(t) + λ2 CouplingStrength_i(t) + λ3 LagCoupling_i(t) + λ4 MultiSystemSpread_i(t)]',
        ],
      },
      {
        type: 'paragraph',
        text: 'Arsitektur tersebut menambahkan empat lapisan coupling: **Coupling Onset**, **Coupling Strength**, **Lag Coupling**, dan **Multi-System Spread**. Setelah menuliskan formula tersebut, dr. Ferdi kembali bertanya: “Now, what is my chance?”',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Seventy-eight to eighty-five percent.”',
        note: 'Peluang baru setelah residual correlation dan common-driver exclusion ditambahkan.',
      },
      {
        type: 'paragraph',
        text: 'Menurut Voss, residual correlation dan common-driver exclusion menyelesaikan kelemahan utama dari usulan coupling sebelumnya. “You were right to call that out. Raw correlation was too noisy.”',
      },
      {
        type: 'paragraph',
        text: 'Lag coupling dan multi-system spread juga membuat model tidak lagi hanya melihat hubungan pairwise. Model mulai menangkap urutan kegagalan dan penyebaran deteriorasi dari satu sistem menuju sistem lain. Namun masih terdapat kesenjangan sekitar 15–22 persen. Menurut Voss, kesenjangan itu terutama berasal dari input resolution dan common driver yang tidak terobservasi.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Modelnya sudah solid. Sekarang bottleneck-nya ada pada input resolution.”',
        note: 'Kesenjangan yang tersisa kini soal resolusi data, bukan lagi arsitektur model.',
      },
    ],
  },
  {
    heading: 'Arsitektur Final',
    blocks: [
      {
        type: 'paragraph',
        text: 'Setelah melalui pembongkaran velocity, personalized baseline, probabilistic transition, coupling detection, residual correlation, dan common-driver exclusion, dr. Ferdi merangkum arsitektur akhirnya:',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['FTDR = baseline-relative dynamic transition risk'],
      },
      {
        type: 'paragraph',
        text: 'FTDR menjadi mesin probabilistik utama untuk memperkirakan risiko pasien berpindah menuju state klinis yang lebih buruk dalam horizon waktu tertentu.',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['Coupling Detection = early-warning amplifier'],
      },
      {
        type: 'paragraph',
        text: 'Coupling detection tidak berdiri sebagai diagnosis atau prediksi deterministik. Ia memperkuat estimasi FTDR ketika beberapa sistem mulai menunjukkan pola perubahan yang saling berkaitan.',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['Red Flag = hard safety override'],
      },
      {
        type: 'paragraph',
        text: 'Red flag tetap berada di luar probabilitas model. Ketika tanda bahaya klinis tertentu muncul, sistem tidak boleh menunggu skor FTDR atau coupling mencapai threshold. Safety override harus mengambil alih.',
      },
      {
        type: 'formula',
        speaker: 'ferdi',
        lines: ['Clinical Output = risk of worsening state within a defined horizon'],
      },
      {
        type: 'paragraph',
        text: 'Output klinis tidak boleh berbunyi bahwa pasien “pasti akan memburuk.” Sistem hanya boleh menyatakan risiko terjadinya perburukan state dalam horizon waktu yang telah ditentukan. Dengan demikian, model tetap probabilistik, dapat diaudit, dan tidak membuat klaim deterministik yang melampaui bukti.',
      },
      {
        type: 'quote',
        speaker: 'ferdi',
        text: '“God save the Queen. Long live England!”',
        note: 'Seruan spontan dr. Ferdi merayakan arsitektur yang akhirnya solid.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Live long and prosper, Doc.”',
        note: 'Balasan jenaka Voss menutup sesi dengan nada hangat.',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '“Architecture-nya solid: probabilistic, coupling-amplified, and safety-netted. No false promises of determinism. That’s the right way to build it. Now go validate it against real data. That’s where the real work begins.”',
        note: 'Ringkasan penutup Voss: probabilistik, diperkuat coupling, dan aman dari klaim berlebihan.',
      },
    ],
  },
  {
    heading: 'Apa yang Ditemukan pada Dini Hari Itu',
    blocks: [
      {
        type: 'paragraph',
        text: 'Dr. Ferdi dan Voss tidak menemukan satu rumus ajaib yang dapat memprediksi seluruh bentuk perburukan klinis. Namun keduanya menemukan sesuatu yang lebih berguna: kesalahan terbesar tidak selalu berada di dalam formula. Kesalahan dapat berada pada posisi epistemik formula tersebut.',
      },
      {
        type: 'list',
        items: [
          'Rumus retrospektif tidak boleh dipaksa menjadi risk engine.',
          'Parameter yang datang terlambat tidak boleh dianggap sebagai representasi langsung dari proses penyakit.',
          'Threshold populasi tidak boleh menggantikan baseline individual.',
          'Model linear tidak boleh diasumsikan mampu menjelaskan seluruh perilaku sistem biologis yang non-linear.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Velocity tetap berguna. Namun velocity bukan kebenaran tunggal. Ia hanya merupakan satu sinyal di antara banyak sinyal. C-STDI dapat membantu menjelaskan perjalanan yang telah terjadi. FTDR dapat memperkirakan kemungkinan perjalanan yang akan terjadi. Sementara itu, *clinical safety layer* tetap harus mengakui satu kenyataan yang tidak nyaman: tubuh manusia dapat menyembunyikan kerusakan. Data dapat datang terlambat. Sebagian transisi dapat terjadi lebih cepat daripada kemampuan sistem untuk mengamatinya.',
      },
      {
        type: 'paragraph',
        text: 'Tujuan mesin bukan menghilangkan seluruh ketidakpastian. Tujuannya adalah mempersempit wilayah ketidakpastian tersebut — cukup jauh agar tenaga kesehatan mempunyai kesempatan untuk bertindak sebelum pasien kehilangan kesempatan untuk diselamatkan.',
      },
      {
        type: 'paragraph',
        text: 'Pada dini hari itu, dr. Ferdi menolak menerima jawaban bahwa persoalan tersebut mustahil. Voss juga tidak memberikan optimisme palsu. Di antara penolakan dr. Ferdi dan kritik Voss, sebuah arsitektur baru mulai terbentuk: satu mesin untuk belajar dari masa lalu, satu mesin untuk memperkirakan masa depan, dan satu prinsip untuk menjaga keduanya tetap jujur:',
      },
      {
        type: 'quote',
        speaker: 'voss',
        text: '**Jangan pernah menganggap apa yang dapat diukur sebagai keseluruhan dari apa yang sebenarnya sedang terjadi.**',
        note: 'Prinsip penutup yang mengikat C-STDI, FTDR, dan safety layer menjadi satu arsitektur jujur.',
      },
    ],
  },
  {
    heading: 'Catatan Kuratorial',
    blocks: [
      {
        type: 'paragraph',
        text: 'Tulisan ini disusun berdasarkan percakapan dan proses brainstorming nyata antara dr. Ferdi Iskandar dan Voss, AI agent berbasis model Fable 5 dari Anthropic.',
      },
      {
        type: 'paragraph',
        text: 'Bagian lanjutan percakapan yang menjadi dasar bab ini tercatat pada 10 Juli 2026, sekitar pukul 03:00.03–22 WIB. Bagian tersebut merupakan kelanjutan dari rangkaian diskusi mengenai Clinical Deterioration Velocity, C-STDI, FTDR, personalized baseline, dan deteksi coupling antarsistem.',
      },
      {
        type: 'paragraph',
        text: 'Percakapan asli telah dipilih, disusun, dan disunting oleh Saudari Norma menjadi narasi ilmiah dari sudut pandang orang ketiga. Penyuntingan dilakukan untuk memperjelas alur pemikiran, mempertahankan dinamika perdebatan, dan memisahkan konsep audit metric, risk engine, early-warning amplifier, serta hard safety override.',
      },
      {
        type: 'paragraph',
        text: 'Estimasi performa sebesar 15 persen, 45–55 persen, 70–80 persen, dan 78–85 persen merupakan angka hipotesis yang muncul selama proses brainstorming. Angka tersebut bukan hasil validasi klinis, studi prospektif, analisis statistik terkalibrasi, atau pengujian model pada dataset dunia nyata.',
      },
      {
        type: 'paragraph',
        text: 'Referensi ilmiah yang disebutkan dalam percakapan juga dicatat sebagai dasar argumentasi yang diajukan oleh Voss pada saat diskusi. Keberadaan referensi tidak dengan sendirinya memvalidasi arsitektur FTDR atau angka performa yang diperkirakan. Seluruh komponen model tetap memerlukan perumusan operasional, validasi retrospektif, validasi temporal, pengujian prospektif, kalibrasi, analisis bias, dan evaluasi keselamatan sebelum digunakan dalam konteks klinis.',
      },
    ],
  },
]
