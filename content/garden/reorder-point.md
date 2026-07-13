---
title: "Reorder Point"
cluster: "Inventory & Planning"
definition: "The inventory level that triggers a new purchase order, sized to cover expected demand during lead time plus a safety buffer."
tags: ["inventory", "forecasting"]
---

## Example

A SKU sells 42 units a day on average, with a 9-day supplier lead time and 120 units of safety stock:

```
reorder_point = (42 × 9) + 120 = 498 units
```

When on-hand plus on-order inventory drops to 498, a new order is placed — not when the shelf is already empty.

The safety stock component is where most of the judgment lives: too little, and ordinary demand variability causes stockouts; too much, and it's cash sitting on a shelf. See [Bullwhip Effect](/garden/bullwhip-effect/) for how that judgment gets distorted moving upstream through a supply chain.
