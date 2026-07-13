---
title: Diare
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 2
total_weight: 38
---

# Diare

## Corpus Signal
- Sample rows: 2
- Total weight: 38
- Infection labels: Infeksi Bakteri — 2 row

## Representative Symptom Phrases
- Dehidrasi, tangan dan kaki yang dingin, kulit pucat, jarang buang air kecil, mudah marah, atau mengantuk. Demam tinggi…
- Feses berwarna gelap yang menandakan adanya darah pada feses. Mual dan muntah. Kurang tidur. Penurunan berat badan.

## Example Rows
- Row 88: Dehidrasi, tangan dan kaki yang dingin, kulit pucat, jarang buang air kecil, mudah marah, atau mengantuk. Demam tinggi…
- Row 89: Feses berwarna gelap yang menandakan adanya darah pada feses. Mual dan muntah. Kurang tidur. Penurunan berat badan.

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-048-Gastroenteritis-termasuk-kolera-giardiasis|Gastroenteritis (termasuk kolera, giardiasis)]]

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
