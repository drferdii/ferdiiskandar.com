---
title: Typhoid (Tifus)
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 9
total_weight: 207
---

# Typhoid (Tifus)

## Corpus Signal
- Sample rows: 9
- Total weight: 207
- Infection labels: Infeksi Bakteri — 6 row, Infeksi Virus — 3 row

## Representative Symptom Phrases
- Demam tinggi yang meningkat secara perlahan mulai sore hari hingga dini hari. Tubuh menggigil. Denyut jantung lemah (bradycardia)…
- Demam yang lama-kelamaan meningkat hingga menjadi empat puluh derajat Celcius. Sakit kepala. Batuk. Tubuh lemas. Mimisan…
- Demam yang makin lama makin tinggi. Sakit kepala. Nyeri otot. Sakit perut. Tidak nafsu makan…
- Demam yang meningkat secara bertahap tiap hari hingga mencapai tiga puluh sembilan sampai empat puluh derajat Celcius…
- Demam meningkat. Demam lebih tinggi pada malam hari. Nyeri otot. Sakit kepala. Merasa tidak enak badan. Pembesaran ginjal dan hati…

## Example Rows
- Row 363: Demam tinggi yang meningkat secara perlahan mulai sore hari hingga dini hari. Tubuh menggigil…
- Row 364: Demam yang lama-kelamaan meningkat hingga menjadi empat puluh derajat Celcius. Sakit kepala. Batuk. Tubuh lemas…
- Row 365: Demam yang makin lama makin tinggi. Sakit kepala. Nyeri otot. Sakit perut. Tidak nafsu makan…
- Row 366: Demam yang meningkat secara bertahap tiap hari hingga mencapai tiga puluh sembilan sampai empat puluh derajat Celcius…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-050-Demam-tifoid|Demam tifoid]]

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
