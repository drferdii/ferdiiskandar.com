---
title: Label Quality Notes
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/dataset_final-sample.xlsx
---

# Label Quality Notes

## Why This Note Exists
The corpus is useful, but the infection labels are not fully clean. Abby should not assume taxonomy correctness from `jenis_infeksi`.

## Diseases With Multiple Infection Labels
- Gingivitis (Radang Gusi) → {'Infeksi Bakteri': 8, 'Infeksi Virus': 3}
- Gonore (Kencing Nanah) → {'Infeksi Virus': 7, 'Infeksi Bakteri': 4}
- Herpes Zoster → {'Infeksi Fungus': 3, None: 4}
- Histoplasmosis (Infeksi Jamur Paru-Paru) → {'Infeksi Fungus': 3, 'Infeksi Virus': 4}
- Infeksi Saluran Kemih → {'Infeksi Protozoa': 4, 'Infeksi Bakteri': 5}
- Konjungtivitis (Penyakit Mata Merah) → {'Infeksi Protozoa': 5, 'Infeksi Bakteri': 8}
- Pneumonia (Radang Paru-Paru) → {'Infeksi Bakteri': 5, 'Infeksi Virus': 3}
- Typhoid (Tifus) → {'Infeksi Bakteri': 6, 'Infeksi Virus': 3}

## Normalization Rule
- Prefer `nama_penyakit` as the canonical disease label.
- Use `tanda_dan_gejala` for clinical similarity.
- Use `jenis_infeksi` only for coarse grouping.

## Example Caveats
- Some disease names appear under both bacterial and viral labels.
- Some rows have missing `jenis_infeksi` values.
- Validation should focus on symptom match, not label purity alone.
