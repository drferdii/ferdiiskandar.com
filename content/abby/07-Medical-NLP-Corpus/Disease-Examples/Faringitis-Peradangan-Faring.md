---
title: Faringitis (Peradangan Faring)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 10
total_weight: 210
---

# Faringitis (Peradangan Faring)

## Corpus Signal
- Sample rows: 10
- Total weight: 210
- Infection labels: Infeksi Bakteri — 10 row

## Representative Symptom Phrases
- Sakit tenggorokan, demam, faring berwarna merah
- Sakit tenggorokan. Demam. Sakit kepala. Membengkaknya kelenjar getah bening di leher.
- Sakit tenggorokan, demam, faring berwarna merah, nyeri sendi dan otot
- Nyeri otot. Tenggorokan bengkak. Batuk. Badan terasa lelah. Demam. Pusing. Mual. Susah menelan. Selera makan berkurang. Bersin. Pilek.
- Sakit tenggorokan. Demam. Sakit kepala. Nyeri sendi dan nyeri otot. Ruam kulit. Membengkaknya kelenjar getah bening di leher. Bersin Batuk.

## Example Rows
- Row 90: Sakit tenggorokan, demam, faring berwarna merah
- Row 91: Sakit tenggorokan. Demam. Sakit kepala. Membengkaknya kelenjar getah bening di leher.
- Row 92: Sakit tenggorokan, demam, faring berwarna merah, nyeri sendi dan otot
- Row 93: Nyeri otot. Tenggorokan bengkak. Batuk. Badan terasa lelah. Demam. Pusing. Mual. Susah menelan. Selera makan berkurang…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-035-Faringitis|Faringitis]]

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
