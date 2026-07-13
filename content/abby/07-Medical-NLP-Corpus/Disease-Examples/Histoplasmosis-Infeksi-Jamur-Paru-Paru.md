---
title: Histoplasmosis (Infeksi Jamur Paru-Paru)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 7
total_weight: 105
---

# Histoplasmosis (Infeksi Jamur Paru-Paru)

## Corpus Signal
- Sample rows: 7
- Total weight: 105
- Infection labels: Infeksi Virus — 4 row, Infeksi Fungus — 3 row

## Representative Symptom Phrases
- Dapat asimptomatik atau dapat menyebabkan gejala penyakit pernapasan ringan yang serupa dengan selesma berat atau influenza. Demam…
- Hepatosplenomegali. Limfadenopati generalisata. Anoreksia dan penurunan berat badan…
- Batuk produktif, dispnea, dan kadang-kadang hemoptisis. Penurunan berat badan. Rasa lemah yang ekstrem. Sesak napas dan sianosis.
- Nodul, papula, dan ulkus kutaneus. Lesi pada kranium dan tulang panjang. Limfadenopati dan lesi viseral tanpa lesi pulmoner.
- Anemia, ulkus pada orofaring, penyakit pernapasan ringan serupa dengan salesma berat atau influenza

## Example Rows
- Row 148: Dapat asimptomatik atau dapat menyebabkan gejala penyakit pernapasan ringan yang serupa dengan selesma berat atau influe…
- Row 149: Hepatosplenomegali. Limfadenopati generalisata. Anoreksia dan penurunan berat badan…
- Row 150: Batuk produktif, dispnea, dan kadang-kadang hemoptisis. Penurunan berat badan. Rasa lemah yang ekstrem…
- Row 151: Nodul, papula, dan ulkus kutaneus. Lesi pada kranium dan tulang panjang…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-040-Pneumonia-bronkopneumonia|Pneumonia, bronkopneumonia]]
- [[../../06-Medical-Knowledge/Diseases/DIS-041-Tuberkulosis-paru-tanpa-komplikasi|Tuberkulosis paru tanpa komplikasi]]

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
