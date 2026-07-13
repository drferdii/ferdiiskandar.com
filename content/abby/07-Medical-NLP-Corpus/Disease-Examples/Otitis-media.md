---
title: Otitis media
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 1
total_weight: 16
---

# Otitis media

## Corpus Signal
- Sample rows: 1
- Total weight: 16
- Infection labels: Infeksi Bakteri — 1 row

## Representative Symptom Phrases
- Nyeri telinga, drainase telinga, vertigo atau pusing kepala sebalah, tinitus

## Example Rows
- Row 279: Nyeri telinga, drainase telinga, vertigo atau pusing kepala sebalah, tinitus

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-024-Otitis-media-akut|Otitis media akut]]

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
