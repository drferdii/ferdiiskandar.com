---
title: Konjungtivitis (Penyakit Mata Merah)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 13
total_weight: 312
---

# Konjungtivitis (Penyakit Mata Merah)

## Corpus Signal
- Sample rows: 13
- Total weight: 312
- Infection labels: Infeksi Bakteri — 8 row, Infeksi Protozoa — 5 row

## Representative Symptom Phrases
- Hiperemia konjungtiva. Sekret. Lakrimasi. Nyeri. Fotofobia (jika kornea ikut terkena). Rasa gatal dan panas seperti terbakar…
- Mata lengket, mata berair, pandangan sedikit kabur, kelopak mata membengkak
- Nyeri, fotofobia, rasa gatal dan panas seperti terbakar
- Mata merah dan benjolan pada kelopak kanan disertai nyeri dan merah, terdapat secret mukopurulen, gatal, berair
- Mata merah di bagian putih bola mata atau kelopak mata bagian dalam. penglihatan dalan batas normal. gatal. bengkak. mata berair…

## Example Rows
- Row 212: Hiperemia konjungtiva. Sekret. Lakrimasi. Nyeri. Fotofobia (jika kornea ikut terkena)…
- Row 213: Mata lengket, mata berair, pandangan sedikit kabur, kelopak mata membengkak
- Row 214: Nyeri, fotofobia, rasa gatal dan panas seperti terbakar
- Row 215: Mata merah dan benjolan pada kelopak kanan disertai nyeri dan merah, terdapat secret mukopurulen, gatal, berair

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-011-Konjungtivitis|Konjungtivitis]]

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
