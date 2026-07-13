---
title: Dataset Format Guide
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
---

# Dataset Format Guide

## Columns
- `no` — row number or sample id.
- `jenis_infeksi` — coarse infection label; may be noisy.
- `nama_penyakit` — disease label.
- `tanda_dan_gejala` — free-text symptom description.
- `Jumlah` — sample count or weight attached to the row.

## How Abby Should Read It
1. Start with `nama_penyakit`.
2. Extract symptom keywords from `tanda_dan_gejala`.
3. Use `Jumlah` only as a weak frequency signal.
4. Treat `jenis_infeksi` as a hint, not a decision rule.
5. When labels conflict, prefer disease-name consistency and symptom fit.

## Practical Use
- symptom matching
- disease ranking support
- phrasing normalization
- drafting structured clinical examples
