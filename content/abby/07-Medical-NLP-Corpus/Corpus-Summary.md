---
title: Corpus Summary
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx + source/dataset_final-test.xlsx
---

# Corpus Summary

## Training / Sample Dataset
- Rows: 163
- Unique diseases: 23
- Infection-type labels: {'Infeksi Virus': 38, 'Infeksi Bakteri': 106, 'Infeksi Fungus': 6, 'Infeksi Protozoa': 9, None: 4}

## Most Frequent Diseases
- Konjungtivitis (Penyakit Mata Merah) — 13 rows
- Gingivitis (Radang Gusi) — 11 rows
- Gonore (Kencing Nanah) — 11 rows
- Appendicitis (Radang Usus Buntu) — 10 rows
- Faringitis (Peradangan Faring) — 10 rows
- Penyakit Lyme — 10 rows
- Infeksi Saluran Kemih — 9 rows
- Typhoid (Tifus) — 9 rows
- Meningitis — 8 rows
- Pneumonia (Radang Paru-Paru) — 8 rows

## Key Observations
- The dataset is class-imbalanced: a few diseases dominate the sample counts.
- The `jenis_infeksi` field is inconsistent across several disease names.
- `nama_penyakit` and symptom text carry more useful signal than the coarse infection label.
- 8 diseases appear under multiple `jenis_infeksi` values.

## Test Dataset
- Rows: 4
- Diseases: {'Herpes Zoster': 4}
- The test file is a tiny Herpes Zoster slice and should be treated as a spot-check, not a broad validation set.
