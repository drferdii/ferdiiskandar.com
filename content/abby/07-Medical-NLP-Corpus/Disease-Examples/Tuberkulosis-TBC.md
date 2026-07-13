---
title: Tuberkulosis (TBC)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 5
total_weight: 105
---

# Tuberkulosis (TBC)

## Corpus Signal
- Sample rows: 5
- Total weight: 105
- Infection labels: Infeksi Bakteri — 5 row

## Representative Symptom Phrases
- Demam dan keringat malam. Batuk produktif yang berlangsung lebih dari tiga minggu. Hemoptisis. Malaise. Adenopati. Penurunan berat badan…
- Batuk lebih dari tiga minggu, sesak napas atau nyeri dada, dahak berdarah, keringat malam, nafsu makan berkurang, berat badan menurun
- Demam, keringat malam, batuk nyeri dada pleuritic, obstruksi saluran pernapasan
- Batuk. Pada tahap selanjutnya, batuk bisa menghasilkan dahak berwarna abu-abu atau kuning yang bisa bercampur dengan darah…
- Batuk lebih dari tiga minggu, sesak napas atau nyeri dada, dahak berdarah, keringat malam, nafsu makan berkurang, berat badan menurun…

## Example Rows
- Row 334: Demam dan keringat malam. Batuk produktif yang berlangsung lebih dari tiga minggu. Hemoptisis. Malaise. Adenopati…
- Row 335: Batuk lebih dari tiga minggu, sesak napas atau nyeri dada, dahak berdarah, keringat malam, nafsu makan berkurang…
- Row 336: Demam, keringat malam, batuk nyeri dada pleuritic, obstruksi saluran pernapasan
- Row 337: Batuk. Pada tahap selanjutnya, batuk bisa menghasilkan dahak berwarna abu-abu atau kuning yang bisa bercampur dengan dar…

## Canonical Disease Note
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
