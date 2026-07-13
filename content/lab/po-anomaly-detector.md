---
title: "PO Anomaly Detector"
date: 2026-04-10
status: "shipped"
stack: "SQL + Power BI"
repo: "https://github.com/normanli/po-anomaly-detector"
tags: ["procurement", "sql", "power-bi"]
---

## The problem

Duplicate and near-duplicate purchase orders were slipping through — same vendor, same amount, submitted twice within a few days. Manual review only caught them after the second payment cleared.

## Approach

A nightly SQL job flags PO pairs within the same vendor where amount and description are within a similarity threshold and the submission dates are close together, surfaced in a Power BI report the procurement team checks each morning.

```sql
select a.po_id, b.po_id as possible_duplicate_of, a.vendor_id, a.amount
from purchase_orders a
join purchase_orders b
  on a.vendor_id = b.vendor_id
  and a.po_id < b.po_id
  and abs(a.amount - b.amount) < 1.00
  and abs(datediff(day, a.submitted_at, b.submitted_at)) <= 5;
```

## Result

Caught 14 duplicate submissions in the first quarter of use, worth roughly $180k in prevented double payments — now a standing morning check rather than an after-the-fact audit finding.
