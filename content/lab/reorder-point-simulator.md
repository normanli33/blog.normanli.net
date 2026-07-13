---
title: "Reorder-Point Simulator"
date: 2026-06-30
status: "active"
stack: "Python + Streamlit"
repo: "https://github.com/normanli/reorder-point-simulator"
tags: ["inventory", "python"]
---

## The problem

Planners kept asking "what happens to stockouts if we drop safety stock by 10%" and getting an answer three days later, after a spreadsheet exercise. This simulator answers it in a few seconds.

## Approach

A discrete-event simulation over historical daily demand: feed in a demand series, a lead time distribution, and a reorder policy, and it plays the policy forward against real (not assumed-normal) demand.

```python
def simulate(demand_series, lead_time_days, reorder_point, order_qty):
    on_hand, on_order, stockout_days = 100, 0, 0
    for day_demand in demand_series:
        on_hand -= day_demand
        if on_hand < 0:
            stockout_days += 1
            on_hand = 0
        if on_hand + on_order <= reorder_point:
            on_order += order_qty
    return stockout_days
```

Wrapped in a Streamlit sidebar so a planner can drag the reorder point and safety stock sliders and watch stockout days update live, against their own SKU's actual order history rather than a normal-distribution assumption.

## Result

Adopted by two planners for pre-review of policy changes before they go into the ERP — cuts the "let's just try it and see" cycle from days to minutes.
