---
title: Disease Library
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/penyakit.json
---

# Disease Library

## Dataset Summary
- Total diseases: 159
- Coverage: 100%
- Clinical data: 159
- Version: 2.0.0

## Ready-to-Use Fields
Each disease entry can be read as:
- identity: `id`, `kki_no`, `nama`, `nama_en`, `icd10`
- clinical level: `kompetensi`, `body_system`, `can_refer`
- reasoning: `definisi`, `gejala_klinis`, `pemeriksaan_fisik`, `diagnosis_banding`
- safety: `komplikasi`, `red_flags`, `kriteria_rujukan`
- management: `terapi`

## How Abby Should Use It
1. Identify the most likely syndrome or complaint.
2. Check red flags first.
3. Review differential diagnosis and complications.
4. Decide whether referral is needed.
5. Draft the answer in a structured medical format.

## Suggested Answer Frame
- Working diagnosis
- Differentials
- Red flags
- Immediate actions
- Referral decision
- Notes on uncertainty

## Notes
This file is the working layer; the full records remain in `source/penyakit.json`.
Full atomic notes live in [[Diseases/README|Disease Notes Catalog]].
