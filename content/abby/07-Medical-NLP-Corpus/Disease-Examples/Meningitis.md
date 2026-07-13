---
title: Meningitis
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 8
total_weight: 128
---

# Meningitis

## Corpus Signal
- Sample rows: 8
- Total weight: 128
- Infection labels: Infeksi Bakteri — 8 row

## Representative Symptom Phrases
- Demam. Menggigil. Sakit kepala. Kaku kuduk. Vomitus. Fotofobia. Letargi. Koma. Tanda Brudzinski dan Kemig yang positif…
- Kaku kuduk, penurunan kesadaran, muntah proyektil, sakit kepala
- Demam, menggigil, sakit kepala, kaku kuduk, muntah, letargi, brakikardi, ruam kadang terjadi
- Demam, menggigil, sakit kepala, kaku kuduk, muntah, letargi, brakikardi, ruam kadang terjadi, Demam tinggi. Leher kaku. Sakit kepala berat…
- Demam. Sakit kepala terus menerus. Mual muntah. Sensitif dengan cahaya yang terlalu silau. Sakit kepala parah. Leher kaku. Sering pingsan.

## Example Rows
- Row 248: Demam. Menggigil. Sakit kepala. Kaku kuduk. Vomitus. Fotofobia. Letargi. Koma. Tanda Brudzinski dan Kemig yang positif…
- Row 249: Kaku kuduk, penurunan kesadaran, muntah proyektil, sakit kepala
- Row 250: Demam, menggigil, sakit kepala, kaku kuduk, muntah, letargi, brakikardi, ruam kadang terjadi
- Row 251: Demam, menggigil, sakit kepala, kaku kuduk, muntah, letargi, brakikardi, ruam kadang terjadi, Demam tinggi. Leher kaku…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-001-Kejang-demam|Kejang demam]]

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
