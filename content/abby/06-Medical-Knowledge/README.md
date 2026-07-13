---
title: Medical Knowledge Hub
type: index
status: active
owner: Dr. Ferdi Iskandar
source: source/*.json
---

# Medical Knowledge Hub

This folder is the working layer for Abby's medical knowledge.

## Fast Retrieval Order
1. [[Disease-Library]] — diagnosis, red flags, referral criteria.
2. [[Diseases/README|Disease Notes Catalog]] — atomic per-disease notes.
3. [[Disease-System-Index]] — body-system routing layer.
4. [[Data-Normalization-Notes]] — label normalization caveats.
5. [[Drug-Library]] — medication availability and stock-aware recommendations.
6. [[Coding-and-Epidemiology]] — ICD-10 lookup and local prevalence weighting.
7. [[Clinical-Usage-Guide]] — how to use this hub in answers.

## Related Sources
- Medical NLP corpus ([[../07-Medical-NLP-Corpus/README|Medical NLP Corpus]])
- Disease example notes ([[./Diseases/README|Disease Notes Catalog]])

## Source Files
- `source/penyakit.json` — 159 diseases
- `source/stok_obat.json` — 277 stock items
- `source/icd10.json` — 18543 ICD-10 records
- `source/icd10-indonesia.json` — 107 Indonesia ICD-10 entries
- `source/drug_mapping.json` — 75 generic-to-stock mappings
- `source/epidemiology_weights_v2.json` — 1930 weighted ICD-10 priors

## Abby Usage Rules
- Lead with patient safety and red flags.
- Use stock data before giving medication suggestions.
- Use epidemiology weights only for ranking, never as proof.
- Prefer concise, structured outputs.

## Maintenance Rule
When new medical data arrives, add it to `source/` first, then update the matching markdown note.
