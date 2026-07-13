---
title: Infeksi HIV
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 3
total_weight: 75
---

# Infeksi HIV

## Corpus Signal
- Sample rows: 3
- Total weight: 75
- Infection labels: Infeksi Bakteri — 3 row

## Representative Symptom Phrases
- Sakit tenggorokan, demam, muncul ruam pada tubuh dan biasanyanya tidak gatal, pembengkakan noda limfa, penurunan berat badan, diare…
- Demam. Kelelahan. Pegal, nyeri otot dan sendi, pembengkakan kelenjar getah bening. Sakit tenggorokan dan sakit kepala. Ruam kulit…
- Kebingungan, perubahan kepribadian, atau penurunan kemampuan mental…

## Example Rows
- Row 185: Sakit tenggorokan, demam, muncul ruam pada tubuh dan biasanyanya tidak gatal, pembengkakan noda limfa…
- Row 186: Demam. Kelelahan. Pegal, nyeri otot dan sendi, pembengkakan kelenjar getah bening. Sakit tenggorokan dan sakit kepala…
- Row 187: Kebingungan, perubahan kepribadian, atau penurunan kemampuan mental…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-003-HIV-AIDS-tanpa-komplikasi|HIV AIDS tanpa komplikasi]]

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
