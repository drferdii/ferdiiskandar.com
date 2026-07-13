---
title: Gingivitis (Radang Gusi)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 11
total_weight: 187
---

# Gingivitis (Radang Gusi)

## Corpus Signal
- Sample rows: 11
- Total weight: 187
- Infection labels: Infeksi Bakteri — 8 row, Infeksi Virus — 3 row

## Representative Symptom Phrases
- Gusi bengkak, gusi kemerahan, gusi berdarah
- Kenaikan cairan gingival, gusi merah dan bengkak, berdarah ketika gosok gigi atau pemeriksaan pada gigi, konsistensi lunak
- Gusi mudah berdarah ketika menyikat gigi atau membersihkan sela gigi menggunakan benang (flossing). Warna gusi merah kehitaman…
- Gusi bengkak, gusi kemerahan, gusi berdarah, Bau napas tidak sedap.
- Kenaikan cairan gingival atau gusi , gusi merah dan bengkak, berdarah ketika gosok gigi atau pemeriksaan pada gigi, konsistensi lunak…

## Example Rows
- Row 111: Gusi bengkak, gusi kemerahan, gusi berdarah
- Row 112: Kenaikan cairan gingival, gusi merah dan bengkak, berdarah ketika gosok gigi atau pemeriksaan pada gigi…
- Row 113: Gusi mudah berdarah ketika menyikat gigi atau membersihkan sela gigi menggunakan benang (flossing)…
- Row 114: Gusi bengkak, gusi kemerahan, gusi berdarah, Bau napas tidak sedap.

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-157-Periodontitis-Akut|Periodontitis Akut]]

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
