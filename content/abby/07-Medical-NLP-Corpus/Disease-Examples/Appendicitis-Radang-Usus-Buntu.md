---
title: Appendicitis (Radang Usus Buntu)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 10
total_weight: 220
---

# Appendicitis (Radang Usus Buntu)

## Corpus Signal
- Sample rows: 10
- Total weight: 220
- Infection labels: Infeksi Bakteri — 10 row

## Representative Symptom Phrases
- Nyeri perut sebelah kanan bawah, awalnya nyeri di sekitar daerah pusar, lemas
- Nyeri dekat pusar atau perut bagian atas yang menjadi semakin tajam ketika bergerak ke perut kanan bawah (ini yang penting dan tanda utama).…
- Nyeri perut sebelah kanan bawah, awalnya nyeri di sekitar daerah pusar, lemas , susah kentut
- Demam ringan. Kehilangan selera makan. Mual dan muntah. Diare (dengan lendir). Perut kembung.
- Nyeri perut. Kehilangan nafsu makan adalah gejala awal usus buntu lainnya. Mual dan muntah dapat terjadi pada awal perjalanan penyakit.

## Example Rows
- Row 24: Nyeri perut sebelah kanan bawah, awalnya nyeri di sekitar daerah pusar, lemas
- Row 25: Nyeri dekat pusar atau perut bagian atas yang menjadi semakin tajam ketika bergerak ke perut kanan bawah (ini yang penti…
- Row 26: Nyeri perut sebelah kanan bawah, awalnya nyeri di sekitar daerah pusar, lemas , susah kentut
- Row 27: Demam ringan. Kehilangan selera makan. Mual dan muntah. Diare (dengan lendir). Perut kembung.

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-048-Gastroenteritis-termasuk-kolera-giardiasis|Gastroenteritis (termasuk kolera, giardiasis)]]
- [[../../06-Medical-Knowledge/Diseases/DIS-147-Dispepsia-Fungsional|Dispepsia Fungsional]]

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
