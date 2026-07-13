---
title: Drug Library
type: medical
status: active
owner: Dr. Ferdi Iskandar
source: source/stok_obat.json + source/drug_mapping.json
---

# Drug Library

## Dataset Summary
- Stock items: 277
- Puskesmas: BALOWERTI
- Drug mappings: 75

## Ready-to-Use Fields
### Stock file
- `id`
- `kode_obat`
- `nama_obat`
- `kelompok`
- `satuan`
- `harga_beli`
- `harga_jual`
- `stok_tersedia`
- `status`

### Mapping file
- `generik`
- `alias`
- `stok_match`
- `kategori`

## How Abby Should Use It
1. Normalize the medication request to a generic name.
2. Match aliases to stock names.
3. Check availability before recommending.
4. Flag shortages or non-stock items early.
5. Separate therapeutic advice from inventory facts.

## Suggested Answer Frame
- Requested drug
- Generic equivalent
- Stock match
- Availability
- Caution / shortage note

## Notes
This file is the working layer; the raw stock and mapping data remain in `source/`.
