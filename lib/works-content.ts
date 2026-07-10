export type WorkStatus = 'live' | 'built' | 'in-progress' | 'planned'

export type WorkCategory = {
  id: string
  number: string
  label: string
  description: string
}

export type WorkItem = {
  id: string
  number: string
  name: string
  tagline: string
  description: string
  status: WorkStatus
  domain: string
  category: string
  url?: string
  year: number
}

export const worksCategories: WorkCategory[] = [
  {
    id: 'diagnostic',
    number: '01',
    label: 'Diagnostik & Pendukung Keputusan',
    description: 'Integrasi klinis, akurasi diagnostik, dan otomatisasi keputusan',
  },
  {
    id: 'assistant',
    number: '02',
    label: 'Asisten & Otomasi Klinis',
    description: 'Otomatisasi alur kerja, transkripsi, dan dukungan real-time',
  },
  {
    id: 'dashboard',
    number: '03',
    label: 'Dashboard & Manajemen Operasional',
    description: 'Visualisasi data, interoperabilitas, dan pengambilan keputusan',
  },
  {
    id: 'telemedicine',
    number: '04',
    label: 'Telemedicine & Konsultasi Jarak Jauh',
    description: 'Infrastruktur komunikasi yang aman dan terintegrasi',
  },
  {
    id: 'referral',
    number: '05',
    label: 'Rujukan & Administrasi Kesehatan',
    description: 'Alur rujukan otomatis dan optimasi klaim',
  },
  {
    id: 'intelligence',
    number: '06',
    label: 'Kecerdasan Buatan & Memori Klinis',
    description: 'Konteks klinis yang persisten dan agen AI cerdas',
  },
  {
    id: 'security',
    number: '07',
    label: 'Keamanan & Perlindungan Data',
    description: 'Perlindungan data klinis yang prediktif',
  },
  {
    id: 'operations',
    number: '08',
    label: 'Otomasi & Efisiensi Operasional',
    description: 'Alur kerja yang otomatis, akurat, dan efisien',
  },
]

export const worksIndexEntries = [
  {
    number: '01',
    title: 'Diagnostik',
    detail: 'Mesin diagnostik dan pendukung keputusan',
    href: '#cat-diagnostic',
  },
  {
    number: '02',
    title: 'Asisten',
    detail: 'Asisten klinis dan otomasi',
    href: '#cat-assistant',
  },
  {
    number: '03',
    title: 'Dashboard',
    detail: 'Platform operasi dan pemantauan',
    href: '#cat-dashboard',
  },
  {
    number: '04',
    title: 'Telemedicine',
    detail: 'Infrastruktur konsultasi jarak jauh',
    href: '#cat-telemedicine',
  },
  { number: '05', title: 'Rujukan', detail: 'Sistem rujukan dan klaim', href: '#cat-referral' },
  {
    number: '06',
    title: 'AI Memory',
    detail: 'Agen AI dan konteks persisten',
    href: '#cat-intelligence',
  },
  {
    number: '07',
    title: 'Keamanan',
    detail: 'Keamanan dan perlindungan data',
    href: '#cat-security',
  },
  {
    number: '08',
    title: 'Operasional',
    detail: 'Sistem efisiensi operasional',
    href: '#cat-operations',
  },
] as const

export const worksItems: WorkItem[] = [
  // ── 01 Diagnostik & Pendukung Keputusan ─────────────────────────
  {
    id: 'aadi',
    number: '01',
    name: 'AADI',
    tagline:
      'Autonomous Diagnostic Engine with Multi-Layered Reasoning – Clinical Decision Support at Scale.',
    description:
      'Mesin diagnosis otonom menggunakan multi-layered reasoning berbasis MedGemma dengan TF-IDF klinis untuk retrieval dan ranking penyakit. Beroperasi 100% offline dengan knowledge base lokal (SKDI, PPK IDI, FORNAS 2023). Akurasi 92% (46/50 kasus) untuk diagnosis top-3 dengan latency <500ms.',
    status: 'live',
    domain: 'Kesehatan',
    category: 'diagnostic',
    year: 2024,
  },
  {
    id: 'cdos',
    number: '02',
    name: 'CDOS',
    tagline:
      'Clinical Decision Orchestration System – Unifying Guidelines with Diagnostic Workflows.',
    description:
      'Mesin orkestrasi keputusan klinis yang menyatukan clinical guidelines (SKDI, PPK IDI) dengan alur diagnostik terstruktur menggunakan rule-based reasoning. Menghasilkan AUDREY Protocol v1 untuk diagnosis, tatalaksana, dan rekomendasi rujukan dengan Red Flag Detector bawaan.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'diagnostic',
    year: 2024,
  },
  {
    id: 'prediction',
    number: '03',
    name: 'PREDICTION',
    tagline:
      'Predictive Engine for Patient Deterioration, Complications, and Readmission Risk – AI-Driven Early Intervention.',
    description:
      'Engine prediktif berbasis machine learning (XGBoost/LSTM) untuk memprediksi deteriorasi pasien, risiko komplikasi post-op, dan risiko readmisi 30/90 hari dari data EMR dan telemetri real-time. Dilengkapi model interpretability (SHAP/LIME).',
    status: 'built',
    domain: 'Kesehatan',
    category: 'diagnostic',
    year: 2025,
  },

  // ── 02 Asisten & Otomasi Klinis ─────────────────────────────────
  {
    id: 'audrey',
    number: '04',
    name: 'Audrey',
    tagline:
      'Real-Time Voice-Based Clinical Assistant – Seamless EMR Integration & Contextual Reasoning.',
    description:
      'Asisten klinis berbasis suara menggunakan Whisper (STT) dan MedGemma (NLU) untuk transkripsi dan ekstraksi konteks klinis real-time. Mendukung contextual memory lintas sesi, intent recognition, dan EMR auto-fill dengan latency <300ms.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'assistant',
    year: 2024,
  },
  {
    id: 'sentra-assist',
    number: '05',
    name: 'Asisten Medis',
    tagline: 'Infrastruktur Ekstraksi Klinis dan Integrasi EMR Berbasis Agen Klien.',
    description:
      'Asisten Medis mengotomatisasi ekstraksi dokumen dan integrasi EMR langsung di browser, meminimalkan beban kognitif klinisi dengan akurasi tinggi dan kendali keputusan klinis penuh.',
    status: 'live',
    domain: 'Kesehatan',
    category: 'assistant',
    year: 2024,
  },

  // ── 03 Dashboard & Manajemen Operasional ────────────────────────
  {
    id: 'intelligence-dashboard',
    number: '06',
    name: 'Intelligence Dashboard',
    tagline:
      'Unified Clinical Operations Platform – EMR, ICD-X, Reporting, and Monitoring in One Interface.',
    description:
      'Platform terpadu dengan real-time analytics (Apache Kafka), customizable clinical widgets, dan RBAC. Stack: React.js, FastAPI, PostgreSQL, Elasticsearch. Scalable hingga 10,000+ pengguna simultan dengan query latency <200ms.',
    status: 'live',
    domain: 'Kesehatan',
    category: 'dashboard',
    year: 2024,
  },
  {
    id: 'melinda-dashboard',
    number: '07',
    name: 'Melinda Dashboard',
    tagline:
      'Cross-Unit Interoperability Dashboard – Seamless Data Integration for RSIA Melinda Operations.',
    description:
      'Dashboard khusus RSIA Melinda dengan interoperabilitas HL7 FHIR antar-unit, patient journey tracking dari admisi hingga discharge, resource allocation, dan predictive analytics untuk perencanaan kapasitas.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'dashboard',
    year: 2024,
  },

  // ── 04 Telemedicine ─────────────────────────────────────────────
  {
    id: 'telemedicine',
    number: '08',
    name: 'Telemedicine',
    tagline: 'WebRTC-Based Telemedicine Infrastructure – Secure, Low-Latency, and EMR-Integrated.',
    description:
      'Infrastruktur telemedicine berbasis WebRTC dengan end-to-end encryption (AES-256) dan HIPAA/GDPR compliance. Mendukung screen sharing, chat terenkripsi, dan akses riwayat pasien EMR dengan latency <150ms.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'telemedicine',
    year: 2024,
  },

  // ── 05 Rujukan & Administrasi ────────────────────────────────────
  {
    id: 'referralink',
    number: '09',
    name: 'ReferraLink',
    tagline:
      'AI-Powered Referral & Claims Optimization – Reduce Disputes, Maximize Reimbursements.',
    description:
      'Sistem intelligent referral dengan automated routing berbasis kriteria klinis dan asuransi, claims auditing NLP untuk deteksi kesalahan coding, dan dispute resolution engine. Akurasi >95% untuk prediksi klaim dengan processing time <1s.',
    status: 'live',
    domain: 'Kesehatan',
    category: 'referral',
    year: 2024,
  },

  // ── 06 AI Memory & Agents ────────────────────────────────────────
  {
    id: 'med-cognitive',
    number: '10',
    name: 'Med-Cognitive',
    tagline: 'Persistent Memory Layer for AI Agents – Cross-Session Clinical Context Retention.',
    description:
      'Lapisan memori untuk agen AI menggunakan Vector Database (FAISS/Pinecone) dengan Sentence-BERT embedding untuk context retrieval berbasis cosine similarity. Scalable hingga jutaan sesi dengan retrieval latency <100ms.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'intelligence',
    year: 2025,
  },
  {
    id: 'melly',
    number: '11',
    name: 'MELLY',
    tagline: 'Personalized Virtual Agent – From Preconception to Pediatrics with Adaptive AI.',
    description:
      'Agen virtual berbasis MedGemma fine-tuned dengan personalized recommendations, appointment scheduling, dan symptom checker rule-based + ML. Multi-turn conversation dengan memory buffer dan response time <500ms.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'intelligence',
    year: 2025,
  },

  // ── 07 Keamanan ──────────────────────────────────────────────────
  {
    id: 'melinda-shield',
    number: '12',
    name: 'Melinda Shield',
    tagline: 'Predictive Cybersecurity Architecture – Multi-Layered Protection for Clinical Data.',
    description:
      'Arsitektur keamanan berlapis: Firewall, IDS (Snort/Suricata), Behavioral AI (Darktrace) untuk deteksi ancaman real-time, enkripsi AES-256/TLS 1.3, dan SOAR untuk automated response. False positive rate <1%, detection time <1s.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'security',
    year: 2025,
  },

  // ── 08 Otomasi & Efisiensi ───────────────────────────────────────
  {
    id: 'autonomous-admission',
    number: '13',
    name: 'Autonomous Admission',
    tagline:
      'Automated Patient Admission & Journey Tracking – From Referral to Schedule Validation.',
    description:
      'Sistem admisi otomatis dengan OCR (Tesseract) untuk ekstraksi data rujukan, rule-based validation, queue management dengan priority scoring, dan automated SMS/email notifications. Processing time <2s per admisi, error rate <0.5%.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
  {
    id: 'smart-triage',
    number: '14',
    name: 'Smart Triage',
    tagline: 'Algorithmic Triage with Emergency Risk Detection – Prioritize Patients, Save Lives.',
    description:
      'Sistem triase dengan Decision Tree/Random Forest untuk klasifikasi risiko dari gejala dan tanda vital. Output severity score (1-10) dan red flag detection (stroke, ACS) dengan akurasi >90% dan latency <100ms.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
  {
    id: 'proactive-care-navigator',
    number: '15',
    name: 'Proactive Care Navigator',
    tagline: 'Post-Discharge Monitoring – AI-Driven Complication Prevention & Continuity of Care.',
    description:
      'Sistem monitoring post-discharge dari wearables dan EMR menggunakan time-series forecasting (ARIMA/Prophet) untuk prediksi deteriorasi, threshold-based alerts, automated follow-up, dan care plan recommendations.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2025,
  },
  {
    id: 'ambient-scribe',
    number: '16',
    name: 'Ambient Scribe',
    tagline: 'Voice-to-EMR Transcription – Automatic Clinical Data Mapping with NLP.',
    description:
      'Mesin transkripsi dengan Whisper (STT) dan MedGemma (NLP) untuk ekstraksi entitas klinis (gejala, diagnosis, obat) dengan speaker diarization. Output HL7 FHIR/JSON untuk EMR dengan akurasi >95% dan contextual ICD-10 mapping.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
  {
    id: 'critical-alert-system',
    number: '17',
    name: 'Critical Alert System',
    tagline: 'Real-Time Critical Alerts – Lab/Telemetry-Based Escalation for Clinical Teams.',
    description:
      'Sistem peringatan dari lab results (HL7 SIU) dan telemetry menggunakan threshold-based dan trend analysis. Escalation ke tim medis via SMS/push notification dan EMR annotation otomatis dengan latency <500ms.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
  {
    id: 'predictive-bed-management',
    number: '18',
    name: 'Predictive Bed Management',
    tagline: 'AI-Driven Bed Orchestration – Automated Discharge & Cross-Department Bed Readiness.',
    description:
      'Manajemen bed dengan Reinforcement Learning untuk optimasi alokasi berdasarkan admission/discharge predictions real-time. Dynamic bed assignment dan waitlist management dengan target bed utilization >90% dan wait time reduction >30%.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2025,
  },
  {
    id: 'ai-coding-auditor',
    number: '19',
    name: 'Hospital management Auditor',
    tagline: 'Automated Clinical Coding Audit – Reduce Claim Disputes with AI Precision.',
    description:
      'Auditor otomatis dengan NLP (spaCy/MedGemma) untuk ekstraksi kode ICD-10/PCS, validasi terhadap CMS/WHO guidelines, dan deteksi upcoding/undercoding. Akurasi >98% dengan processing time <1s per klaim.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
  {
    id: 'or-orchestrator',
    number: '20',
    name: 'Hospital Orchestrator',
    tagline: 'Real-Time Operating Room Logistics – High-Priority Case Orchestration.',
    description:
      'Orkestrasi jadwal OK dengan Operations Research (Linear Programming) berdasarkan case urgency dari Smart Triage dan resource availability. OR utilization >85% dengan case delay reduction >40%.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2025,
  },
  {
    id: 'pogs',
    number: '21',
    name: 'POGS',
    tagline:
      'Comprehensive Pregnancy Observation System – Maternal-Fetal Risk Detection & Rapid Escalation.',
    description:
      'Sistem observasi kehamilan dari data ultrasound (DICOM), CTG, dan lab results. Risk scoring berbasis Modified Obstetric Early Warning Score dengan Autoencoder untuk anomaly detection dan automated escalation ke MFM. Sensitivity >95%.',
    status: 'planned',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2025,
  },
  {
    id: 'triage',
    number: '22',
    name: 'TRIAGE',
    tagline: 'Algorithmic Severity-Based Triage – Prioritize Patients in Emergency Care.',
    description:
      'Sistem triase berbasis Modified Early Warning Score (MEWS) atau custom ML model dari tanda vital dan gejala. Output triage category (1-5, ESI/MTS) dengan red flag alerts untuk sepsis dan trauma mayor, akurasi >90%.',
    status: 'built',
    domain: 'Kesehatan',
    category: 'operations',
    year: 2024,
  },
]

export const worksGlanceSections = [
  {
    title: 'Total Sistem',
    items: ['22 sistem terdokumentasi'],
  },
  {
    title: 'Aktif',
    items: ['AADI', 'Asisten Medis', 'Intelligence Dashboard', 'ReferraLink'],
  },
  {
    title: 'Domain',
    items: ['Kesehatan', 'Operasi klinis', 'Kecerdasan AI'],
  },
  {
    title: 'Categories',
    items: [
      'Diagnostik & Keputusan',
      'Asisten Klinis',
      'Dashboard & Ops',
      'Telemedicine',
      'Rujukan & Admin',
      'Memori AI & Agen',
      'Keamanan',
      'Efisiensi Operasional',
    ],
  },
] as const
