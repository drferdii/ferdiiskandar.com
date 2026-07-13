---
title: Infeksi Klamidia
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 6
total_weight: 96
---

# Infeksi Klamidia

## Corpus Signal
- Sample rows: 6
- Total weight: 96
- Infection labels: Infeksi Bakteri — 6 row

## Representative Symptom Phrases
- Erosi serviks. Dispareunia. Sekret mikropurulen. Nyeri pelvik.
- Nyeri dan nyeri tekan pada abdomen bawah, serviks, uterus, dan limfonodus. Mengigil, panas…
- Disuria, piuria, dan sering kencing (urinary frequency)
- Disuria, eritema, nyeri tekan pada meatus uretra. Sering kencing…
- Pembengkakan skrotum yang nyeri. Sekret uretra.

## Example Rows
- Row 188: Erosi serviks. Dispareunia. Sekret mikropurulen. Nyeri pelvik.
- Row 189: Nyeri dan nyeri tekan pada abdomen bawah, serviks, uterus, dan limfonodus. Mengigil, panas…
- Row 190: Disuria, piuria, dan sering kencing (urinary frequency)
- Row 191: Disuria, eritema, nyeri tekan pada meatus uretra. Sering kencing…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-067-nongonore|nongonore)]]

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
