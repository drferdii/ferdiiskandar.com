---
title: Pneumonia (Radang Paru-Paru)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 8
total_weight: 136
---

# Pneumonia (Radang Paru-Paru)

## Corpus Signal
- Sample rows: 8
- Total weight: 136
- Infection labels: Infeksi Bakteri — 5 row, Infeksi Virus — 3 row

## Representative Symptom Phrases
- Suhu tubuh yang tinggi. Batuk disertai sputum yang purulen, berwarna kuning atau berdarah. Dispnea. Ronki disertai penurunan bunyi napas…
- Demam menggigil, suhu tubuh meningkat, batuk berdahak kadang disertai darah, sesak nafas, nyeri dada
- Demam, menggigil, batuk produktif dengan sputum amis, sputum kuning kehijauan
- Suhu tubuh tinggi, batuk disertai sputum yang purulent berwarna kuning atau berdarah, dipnea, ronki disertai penurunan bunyi napas
- Nyeri dada. Sesak napas. Kehilangan berat badan. Lemas. Demam tinggi. Napas berbau. Berkeringat (terutama pada malam hari)

## Example Rows
- Row 283: Suhu tubuh yang tinggi. Batuk disertai sputum yang purulen, berwarna kuning atau berdarah. Dispnea…
- Row 284: Demam menggigil, suhu tubuh meningkat, batuk berdahak kadang disertai darah, sesak nafas, nyeri dada
- Row 285: Demam, menggigil, batuk produktif dengan sputum amis, sputum kuning kehijauan
- Row 286: Suhu tubuh tinggi, batuk disertai sputum yang purulent berwarna kuning atau berdarah, dipnea…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-040-Pneumonia-bronkopneumonia|Pneumonia, bronkopneumonia]]

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
