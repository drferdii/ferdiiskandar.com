---
title: Data Normalization Notes
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/penyakit.json
---

# Data Normalization Notes

## Why This Note Exists
The raw disease dataset is usable, but some labels are not fully consistent. Abby should normalize them before making cross-note comparisons.

## Known Label Variants to Normalize
- `KARDIOVASKULAR` → `SISTEM KARDIOVASKULAR`
- `SISTEM PENCERNAAN` → `SALURAN PENCERNAAN`
- `SISTEM JIWA` → `PSIKIATRI`
- `SISTEM ENDOKRIN, METABOLIK, NUTRISI` → `SISTEM ENDOKRIN`

## Important Data Caveats
- The field `can_refer` is currently not informative for routing because the current dataset appears to mark entries uniformly as false.
- For clinical reasoning, prefer `red_flags`, `kriteria_rujukan`, and `kompetensi` over any single binary routing flag.
- Use `icd10` and `nama` together when resolving the final label.

## Recommended Rule
If a label looks inconsistent across files, normalize it in the markdown layer rather than editing the raw source immediately.
