---
title: Abby Knowledge V2 Intake Notes
type: audit
status: internal
last_updated: 2026-07-16
---

# Abby Knowledge V2 — Catatan Intake & Kurasi

Sumber asli: `content/abby/abby-kowledge-V2.jsonl` (ekspor PDF ter-chunk, 36 baris, 3 dokumen). File ini **dikeluarkan dari direktori knowledge** karena format JSONL tidak kompatibel dengan chunker Markdown Abby dan banyak duplikasi.

## Keputusan kurasi

| Dokumen sumber | Tindakan | Tujuan |
|---|---|---|
| **Abby Public Truth Registry** | ✅ Diekstrak jadi `content/abby/truth-registry.md` (Markdown bersih), didaftarkan **critical, always-include** di `abby.knowledge-index.json` | Backbone governance Abby |
| **Abby Public Knowledge Dossier** | ⛔ **DITAHAN — tidak masuk retrieval** | Konflik fakta belum diselesaikan |
| **Founder Oral History** | 📄 Diekstrak jadi `docs/founder-oral-history.md` (non-retrieval, bahan editor) | Template wawancara, bukan konten jawaban |

## Rampingan terkait
- `content/abby/public-boundaries.md` diubah jadi ringkasan batas + rujukan ke Truth Registry; demote dari `critical always-include` ke `high`.
- `content/abby/dr-ferdi-narrative.md`: angka performa belum tervalidasi ("penurunan kesalahan medis 60%", "surplus 15%") diubah ke bahasa governed (tanpa angka) sesuai larangan Truth Registry.

## Dossier — alasan ditahan

Abby Public Knowledge Dossier banyak tumpang-tindih dengan file naratif existing (`dr-ferdi-narrative.md`, `professional-journey.md`, `projects-and-works.md`) **dan** memuat/terkait klaim angka yang oleh Truth Registry dilarang sampai tervalidasi. Memasukkannya sebelum rekonsiliasi akan membuat Abby berpotensi mengambil angka yang dilarang oleh registry itu sendiri.

## Syarat Dossier boleh masuk retrieval
1. Konflik angka dengan `dr-ferdi-narrative.md` sudah direkonsiliasi (angka tervalidasi & disetujui publik, atau dihilangkan).
2. Bagian duplikatif dengan file naratif existing dipotong.
3. Status produk disesuaikan dengan Truth Registry (concept/research/prototype/internal testing/pilot/production).
4. Didaftarkan di `abby.knowledge-index.json` setelah lolos pengecekan di atas.
