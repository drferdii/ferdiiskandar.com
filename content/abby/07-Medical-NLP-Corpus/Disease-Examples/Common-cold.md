---
title: Common cold
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 5
total_weight: 125
---

# Common cold

## Corpus Signal
- Sample rows: 5
- Total weight: 125
- Infection labels: Infeksi Virus — 5 row

## Representative Symptom Phrases
- Hidung tersumbat, bersin, batuk, sakit tenggorokan
- Meriang, muncul rasa sakit di otot, sesak di dada, kadang-kadang disertai dengan demam tinggi, batuk dan hidung tersumbat, hidung meler…
- Hidung tersumbat, bersin, batuk, sakit tenggorokan, meriang dan sesak dada
- Batuk kering. Sakit tenggorokan. Demam tinggi, kedinginan dan berkeringat. Sakit kepala. Sakit otot atau sakit badan…
- Batuk, hidung meler, mata berair, tenggorokan yang sakit atau gatal, dan bersin-bersin.

## Example Rows
- Row 46: Hidung tersumbat, bersin, batuk, sakit tenggorokan
- Row 47: Meriang, muncul rasa sakit di otot, sesak di dada, kadang-kadang disertai dengan demam tinggi…
- Row 48: Hidung tersumbat, bersin, batuk, sakit tenggorokan, meriang dan sesak dada
- Row 49: Batuk kering. Sakit tenggorokan. Demam tinggi, kedinginan dan berkeringat. Sakit kepala. Sakit otot atau sakit badan…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-146-Nasofaringitis-Akut-Common-Cold|Nasofaringitis Akut (Common Cold)]]

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
