---
title: Tetanus
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 7
total_weight: 105
---

# Tetanus

## Corpus Signal
- Sample rows: 7
- Total weight: 105
- Infection labels: Infeksi Bakteri — 7 row

## Representative Symptom Phrases
- Kelelahan di sekujur tubuh. Berkeringat dingin. Kesulitan menelan. Sensitif, bahkan takut akan air (hidrofobia)…
- Peningkatan kadar neutrofil, salah satu jenis sel darah putih. Kejang otot. Kesemutan…
- Sakit kepala. Penglihatan terganggu. Kejang otot. Rasa sakit di sekitar mata.
- Kejang dan kekakuan pada otot rahang (trismus); Kekakuan otot leher; Kesulitan menelan; Otot perut menjadi kaku…
- Kontraksi otot disertai nyeri umumnya pada rahang bawah dan leher disebabkan memiliki riwayat luka…

## Example Rows
- Row 327: Kelelahan di sekujur tubuh. Berkeringat dingin. Kesulitan menelan. Sensitif, bahkan takut akan air (hidrofobia)…
- Row 328: Peningkatan kadar neutrofil, salah satu jenis sel darah putih. Kejang otot. Kesemutan…
- Row 329: Sakit kepala. Penglihatan terganggu. Kejang otot. Rasa sakit di sekitar mata.
- Row 330: Kejang dan kekakuan pada otot rahang (trismus); Kekakuan otot leher; Kesulitan menelan; Otot perut menjadi kaku…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-002-Tetanus|Tetanus]]

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
