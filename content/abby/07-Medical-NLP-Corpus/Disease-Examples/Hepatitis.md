---
title: Hepatitis
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 6
total_weight: 102
---

# Hepatitis

## Corpus Signal
- Sample rows: 6
- Total weight: 102
- Infection labels: Infeksi Virus — 6 row

## Representative Symptom Phrases
- Nyeri perut sebelah kanan atas, perut terasa begah/kembung, pipis seperti teh, feses warna pucat
- Demam. Merasa letih. Nafsu makan buruk. Kelelahan. Mual atau muntah. Nyeri lambung. Nyeri sendi atau otot. Urin gelap seperti teh…
- Nyeri perut sebelah kanan atas, perut terasa begah/kembung, pipis atau warna urine seperti teh, feses warna pucat
- Flu, mual, lemas, kehilangan nafsu makan, nyeri perut, mata atau kulit berwarna kuning, tinja berwarna pucat, dan urine berwarna gelap…
- Mengalami gejala seperti flu, misalnya mual, muntah, demam, dan lemas. Feses berwarna pucat…

## Example Rows
- Row 125: Nyeri perut sebelah kanan atas, perut terasa begah/kembung, pipis seperti teh, feses warna pucat
- Row 126: Demam. Merasa letih. Nafsu makan buruk. Kelelahan. Mual atau muntah. Nyeri lambung. Nyeri sendi atau otot…
- Row 127: Nyeri perut sebelah kanan atas, perut terasa begah/kembung, pipis atau warna urine seperti teh, feses warna pucat
- Row 128: Flu, mual, lemas, kehilangan nafsu makan, nyeri perut, mata atau kulit berwarna kuning, tinja berwarna pucat…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-059-Hepatitis-A|Hepatitis A]]

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
