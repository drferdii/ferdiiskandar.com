---
title: Infeksi Saluran Kemih
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 9
total_weight: 216
---

# Infeksi Saluran Kemih

## Corpus Signal
- Sample rows: 9
- Total weight: 216
- Infection labels: Infeksi Bakteri — 5 row, Infeksi Protozoa — 4 row

## Representative Symptom Phrases
- Sering kencing, nyeri di daerah perut bagian bawah, demam, sakit saat kencing
- Nyeri saat berkemih, rasa ingin kencing tapi tidak bisa, urin lebih berbau, nyeri di suprapubic
- Rasa sakit dan terbakar ketika kencing. Nyeri dan tekanan di perut bagian bawah. Urin berbau amis atau berwarna keruh. Kencing berdarah…
- Nyeri saat berkemih, rasa ingin kencing tapi tidak bisa, Urin berbau amis atau berwarna keruh, nyeri di suprapubic
- Kemaluan terasa terbakar ketika buang air kecil. Air seni akan keluar seperti darah atau berwarna keruh…

## Example Rows
- Row 208: Sering kencing, nyeri di daerah perut bagian bawah, demam, sakit saat kencing
- Row 209: Nyeri saat berkemih, rasa ingin kencing tapi tidak bisa, urin lebih berbau, nyeri di suprapubic
- Row 210: Rasa sakit dan terbakar ketika kencing. Nyeri dan tekanan di perut bagian bawah. Urin berbau amis atau berwarna keruh…
- Row 211: Nyeri saat berkemih, rasa ingin kencing tapi tidak bisa, Urin berbau amis atau berwarna keruh, nyeri di suprapubic

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-062-Infeksi-saluran-kemih|Infeksi saluran kemih]]

## Abby Use
- Use this note for symptom matching, phrasing normalization, and disease ranking support.
- Treat the corpus as a pattern layer, not as clinical proof.
- If the corpus label conflicts with the symptom text, prefer symptom fit and the canonical medical hub.

## Caveats
- The corpus is class-imbalanced, so frequency is a weak signal only.
- `jenis_infeksi` should be treated as noisy metadata when it conflicts with symptom text.

## Related
- [[../README|Medical NLP Corpus]]
- [[../../06-Medical-Knowledge/README|Medical Knowledge Hub]]
- [[../../06-Medical-Knowledge/Clinical-Usage-Guide|Clinical Usage Guide]]
