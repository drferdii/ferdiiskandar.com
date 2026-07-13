---
title: Medical NLP Corpus
type: index
status: active
owner: Dr. Ferdi Iskandar
source: source/*.xlsx + source/*.tagger
---

# Medical NLP Corpus

This folder contains the symptom-to-disease corpus used to support Abby's medical reasoning.

## Fast Retrieval Order
1. [[Corpus-Summary]] — dataset size, class balance, and top labels.
2. [[Disease-Examples/README|Disease Examples]] — per-disease retrieval notes.
3. [[Dataset-Format-Guide]] — how to interpret the columns.
4. [[Label-Quality-Notes]] — label noise and normalization caveats.
5. [[Model-Notes]] — CRF tagger artifact notes.

## Source Files
- `source/dataset_final-sample.xlsx` — 163 rows, 23 diseases.
- `source/dataset_final-test.xlsx` — 4 rows, 1 disease.
- `source/all_indo_man_tag_corpus_model.crf.tagger` — binary CRF tagger model artifact.

## Abby Usage Rules
- Treat `nama_penyakit` and `tanda_dan_gejala` as the primary signal.
- Treat `jenis_infeksi` as noisy metadata, not ground truth.
- Use the corpus for pattern matching, phrasing, and disease ranking support.
- Do not infer clinical certainty from corpus labels alone.

## Maintenance Rule
If a new corpus file is added, summarize it here first and move the raw artifact into `source/`.
The disease-example notes live in [[Disease-Examples/README|Disease Examples]].
