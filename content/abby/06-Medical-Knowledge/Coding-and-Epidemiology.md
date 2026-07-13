---
title: Coding and Epidemiology
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/icd10.json + source/icd10-indonesia.json + source/epidemiology_weights_v2.json
---

# Coding and Epidemiology

## Dataset Summary
- ICD-10 records: 18543
- Indonesian ICD-10 entries: 107
- Weighted priors: 1930
- Local cases: 45030
- Unique ICD-10 in weights: 1930

## Ready-to-Use Fields
### ICD-10 master
- `kode`
- `nama_en`
- `version`

### ICD-10 Indonesia
- `code`
- `description`
- `description_en`
- `description_id`
- `is_billable`

### Epidemiology weights
- local prior weight per ICD-10 code
- source and period metadata
- methodology for prevalence-based ranking

## How Abby Should Use It
1. Normalize diagnosis terms into ICD-10 codes.
2. Prefer Indonesian descriptions when writing human-facing notes.
3. Use local weights to rank likely diagnoses.
4. Never treat prevalence weighting as confirmation.
5. Keep coding and clinical reasoning separate but linked.

## Suggested Answer Frame
- Possible ICD-10 code
- Indonesian label
- Local likelihood rank
- Why it fits
- What still needs clinical confirmation

## Notes
The full code base stays in `source/`; this note is the working layer for retrieval.
