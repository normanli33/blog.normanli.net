---
title: "TIL: pandas .explode() for BOM flattening"
date: 2026-07-08
---
TIL: `pandas.DataFrame.explode()` solves the bill-of-materials flattening problem cleanly — one list-column per parent, exploded into one row per component, no manual loop.
