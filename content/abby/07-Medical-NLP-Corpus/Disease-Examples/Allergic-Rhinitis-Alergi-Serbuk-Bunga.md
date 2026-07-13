---
title: Allergic Rhinitis (Alergi Serbuk Bunga)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 7
total_weight: 161
---

# Allergic Rhinitis (Alergi Serbuk Bunga)

## Corpus Signal
- Sample rows: 7
- Total weight: 161
- Infection labels: Infeksi Virus — 7 row

## Representative Symptom Phrases
- Hidung keluar lendir, choncae nasal kebiruan, bersin-bersin
- Hidung berlendir, demam, choncae nasal kemerahan, bersin-bersin
- Hidung bau, nyeri di dalam hidung, ada krusta di dalam hidung
- Gatal pada hidung, mata, tenggorokan, kulit, atau area apa pun. Batuk. Bersin. Hidung meler. Hidung tersumbat. Tenggorokan gatal…
- Bersin. Hidung meler. Gatal pada hidung, mata, tenggorokan, kulit, atau area apa pun. Batuk. Hidung tersumbat. Tenggorokan gatal…

## Example Rows
- Row 1: Hidung keluar lendir, choncae nasal kebiruan, bersin-bersin
- Row 2: Hidung berlendir, demam, choncae nasal kemerahan, bersin-bersin
- Row 3: Hidung bau, nyeri di dalam hidung, ada krusta di dalam hidung
- Row 4: Gatal pada hidung, mata, tenggorokan, kulit, atau area apa pun. Batuk. Bersin. Hidung meler. Hidung tersumbat…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-030-Rhinitis-alergika|Rhinitis alergika]]

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
