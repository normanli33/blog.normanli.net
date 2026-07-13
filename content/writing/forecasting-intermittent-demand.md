---
title: "Forecasting intermittent demand: why our MAPE was lying to us"
date: 2026-06-30
slug: "forecasting-intermittent-demand"
number: 14
tags: [forecasting, python]
dek: "A metric that rewards forecasting zero, and what we measured instead."
math: true
draft: false
---

## Problem

Around 60% of the SKUs in our fastener catalogue sell fewer than twelve times
a year. When we evaluated candidate models on MAPE, the "winner" was
consistently the one that forecast close to zero for these items — which is
exactly the forecast that causes a stockout the one week a mining customer
orders four thousand M14 locknuts.

The metric wasn't measuring what the business cared about. Before comparing
any more models, we had to fix the yardstick.

## Background

MAPE divides each error by the actual value, so periods with zero or near-zero
demand either blow up or get excluded. For intermittent series this
systematically favours under-forecasting.[^1] The forecasting literature has
known this for decades — Croston's method exists precisely because smoothing
intermittent series directly gives you a biased, useless signal.

The scaled alternative is MASE, which divides by the in-sample naive MAE and
therefore stays defined at zero demand:

$$\text{MASE} = \frac{\frac{1}{h}\sum_{t=1}^{h}|e_t|}{\frac{1}{n-m}\sum_{t=m+1}^{n}|y_t - y_{t-m}|}$$

## Analysis

We re-scored three candidates on the same 18-month holdout using scale-free
metrics:

```python
# scaled errors: denominator is the in-sample naive MAE,
# so zero-demand periods stay well-defined
from utilsforecast.losses import mase, rmsse

score = mase(holdout, models=["lgbm", "croston", "chronos"],
             seasonality=52, train_df=train)
```

| Model             | MASE | RMSSE | Stockout weeks |
|-------------------|-----:|------:|---------------:|
| LightGBM (global) | 0.81 |  0.77 |             31 |
| Croston / SBA     | 0.93 |  0.88 |             44 |
| Naive (52-week)   | 1.00 |  1.00 |             58 |

Under MAPE, Croston had looked 15 points "better" than LightGBM. Under MASE —
and, more importantly, under simulated stockout weeks — the ranking reversed.
The global LightGBM model was learning cross-SKU seasonality that the
per-series methods could not see.

## Recommendation

Report MASE and RMSSE as the primary metrics for any portfolio containing
intermittent series, and always pair them with one business-denominated
number — we use simulated stockout weeks at current safety-stock policy.
A metric a planner can't argue with in a S&OP meeting isn't finished.

## Lessons learned

The model comparison was the easy part; the two weeks of real work were
agreeing on the yardstick. If I started again I would define the evaluation
contract — metrics, holdout window, and the stockout simulation — before
training anything at all.

[^1]: See Hyndman & Koehler (2006), *Another look at measures of forecast
accuracy*, for the case for scaled errors.
