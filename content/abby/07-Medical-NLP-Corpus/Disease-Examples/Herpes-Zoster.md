---
title: Herpes Zoster
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 7
total_weight: 126
---

# Herpes Zoster

## Corpus Signal
- Sample rows: 7
- Total weight: 126
- Infection labels: (blank) — 4 row, Infeksi Fungus — 3 row

## Representative Symptom Phrases
- Bintil yang muncul seperti cacar air di salah satu sisi tubuh (kanan atau kiri). Bintil tersebut hanya setempat…
- Demam, nyeri, vesikel dengan persebaran sesuai dermatom, warna merah, timbulnya bintil
- Nyeri pada dermatom saraf, priritis, perestesia pada batang tubuh, lesi kulit kecil-kecil berwarna merah
- Belang merah. Lepuhan berisi cairan yang mudah pecah. Ruam yang menyelimuti dari sekitar tulang belakang hingga torso…
- Ruam yang timbul pada satu sisi tubuh sesuai dengan saraf yang terinfeksi…

## Example Rows
- Row 145: Bintil yang muncul seperti cacar air di salah satu sisi tubuh (kanan atau kiri). Bintil tersebut hanya setempat…
- Row 146: Demam, nyeri, vesikel dengan persebaran sesuai dermatom, warna merah, timbulnya bintil
- Row 147: Nyeri pada dermatom saraf, priritis, perestesia pada batang tubuh, lesi kulit kecil-kecil berwarna merah
- Row 461: Belang merah. Lepuhan berisi cairan yang mudah pecah. Ruam yang menyelimuti dari sekitar tulang belakang hingga torso…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-100-Herpes-zoster-tanpa-komplikasi|Herpes zoster tanpa komplikasi]]

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
