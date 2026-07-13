---
title: Malaria
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 3
total_weight: 84
---

# Malaria

## Corpus Signal
- Sample rows: 3
- Total weight: 84
- Infection labels: Infeksi Bakteri — 3 row

## Representative Symptom Phrases
- Demam tinggi. Sakit kepala. Mual muntah. Berkeringat. Menggigil.
- Flu sakit kepala, demam, menggigil, nyeri sendi, muntah, anemia hemolitik, penyakit kuning, hemoglobin dalam urin, kerusakan retina…
- Demam tinggi. Sakit kepala. Muntah. Diare. Nyeri otot. Mual. Kejang-kejang. Ada darah pada tinja. Keringat berlebih…

## Example Rows
- Row 245: Demam tinggi. Sakit kepala. Mual muntah. Berkeringat. Menggigil.
- Row 246: Flu sakit kepala, demam, menggigil, nyeri sendi, muntah, anemia hemolitik, penyakit kuning, hemoglobin dalam urin…
- Row 247: Demam tinggi. Sakit kepala. Muntah. Diare. Nyeri otot. Mual. Kejang-kejang. Ada darah pada tinja. Keringat berlebih…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-093-Malaria|Malaria]]

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
