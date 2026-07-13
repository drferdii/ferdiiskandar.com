---
title: Gonore (Kencing Nanah)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 11
total_weight: 275
---

# Gonore (Kencing Nanah)

## Corpus Signal
- Sample rows: 11
- Total weight: 275
- Infection labels: Infeksi Virus — 7 row, Infeksi Bakteri — 4 row

## Representative Symptom Phrases
- Mungkin asimptomatik. Uretritis, yang meliputi disuria dan rabas uretra yang purulen disertai warna merah dan pembengkakan pada tempat infek…
- Dapat asimptomatik. Inflamasi dan rabas berwarna kuning kehijauan dari serviks…
- Faringitis atau tonsilitis. Rasa terbakar pada rektum, rasa gatal, dan rabas mukopurulen yang berdarah…
- Nyeri saat kencing, kencing bernanah, demam, riwayat seks bebas atau oral seks
- Frekuensi buang air kecil yang cukup sering. Keluarnya nanah dari penis (tetesan cairan) berwarna putih, kuning…

## Example Rows
- Row 116: Mungkin asimptomatik. Uretritis, yang meliputi disuria dan rabas uretra yang purulen disertai warna merah dan pembengkak…
- Row 117: Dapat asimptomatik. Inflamasi dan rabas berwarna kuning kehijauan dari serviks…
- Row 118: Faringitis atau tonsilitis. Rasa terbakar pada rektum, rasa gatal, dan rabas mukopurulen yang berdarah…
- Row 119: Nyeri saat kencing, kencing bernanah, demam, riwayat seks bebas atau oral seks

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-063-Gonore|Gonore]]

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
