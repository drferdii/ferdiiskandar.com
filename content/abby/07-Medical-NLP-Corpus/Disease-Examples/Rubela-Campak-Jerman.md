---
title: Rubela (Campak Jerman)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 5
total_weight: 85
---

# Rubela (Campak Jerman)

## Corpus Signal
- Sample rows: 5
- Total weight: 85
- Infection labels: Infeksi Bakteri — 5 row

## Representative Symptom Phrases
- Sakit kepala; Iritasi ringan pada mata; Demam; Hidung tersumbat…
- Ruam merah muda atau merah yang diawali pada bagian wajah dan kemudian menyebar di seluruh tubuh. Demam ringan…
- Ruam kemerahan terasa agak gatal dan akan hilang dalam waktu satu sampai tiga hari…
- Pembengkakan kelenjar getah bening di sekitar telinga dan belakang kepala…
- Demam ringan. Kepala pusing. Hidung tersumbat. Mata merah meradang. Pembengkakan kelenjar limfa di belakang telinga pada leher…

## Example Rows
- Row 310: Sakit kepala; Iritasi ringan pada mata; Demam; Hidung tersumbat…
- Row 311: Ruam merah muda atau merah yang diawali pada bagian wajah dan kemudian menyebar di seluruh tubuh. Demam ringan…
- Row 312: Ruam kemerahan terasa agak gatal dan akan hilang dalam waktu satu sampai tiga hari…
- Row 313: Pembengkakan kelenjar getah bening di sekitar telinga dan belakang kepala…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-101-Morbili-tanpa-komplikasi|Morbili tanpa komplikasi]]

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
