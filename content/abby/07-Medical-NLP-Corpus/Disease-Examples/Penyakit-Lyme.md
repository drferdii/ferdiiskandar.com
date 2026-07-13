---
title: Penyakit Lyme
type: corpus-disease-note
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
sample_rows: 10
total_weight: 200
---

# Penyakit Lyme

## Corpus Signal
- Sample rows: 10
- Total weight: 200
- Infection labels: Infeksi Bakteri — 10 row

## Representative Symptom Phrases
- Erythema chronicum migrans (ECM): makula atau papula berwarna merah yang umumnya ditemukan pada tempat gigitan kutu dan tumbuh hingga beruku…
- Meningoensefalitis yang berfluktuasi-kelainan neurologi disertai neuropati perifer dan kranial…
- Artritis disertai pembengkakan yang nyata; tanda klinis ini dimulai beberapa minggu atau beberapa bulan kemudian…
- Demam. Menggigil. Sakit kepala. Nyeri otot. Pembesaran kelenjar getah bening. Kelelahan. Sakit tenggorokan. Gangguan penglihatan.
- Artritis pada salah satu atau lebih dari satu sendi, terutama sendi besar seperti lutut. Mati rasa pada tungkai dan lengan. Aritmia…

## Example Rows
- Row 280: Erythema chronicum migrans (ECM): makula atau papula berwarna merah yang umumnya ditemukan pada tempat gigitan kutu dan…
- Row 281: Meningoensefalitis yang berfluktuasi-kelainan neurologi disertai neuropati perifer dan kranial…
- Row 282: Artritis disertai pembengkakan yang nyata; tanda klinis ini dimulai beberapa minggu atau beberapa bulan kemudian…
- Row 408: Demam. Menggigil. Sakit kepala. Nyeri otot. Pembesaran kelenjar getah bening. Kelelahan. Sakit tenggorokan…

## Canonical Disease Note
- [[../../06-Medical-Knowledge/Diseases/DIS-128-Reaksi-gigitan-serangga|Reaksi gigitan serangga]]

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
