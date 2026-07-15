---
title: "Demand Planning KPIs: Learning Notes on Forecast Accuracy Metrics"
date: 2026-07-15
categories: ["Forecasting"]
tags: ["forecasting", "demand-planning", "kpi"]
summary: "Eight forecast KPIs that come up constantly in demand planning — with the formula, the business meaning, and the trap hidden inside each one."
math: true
---

## Background

Anyone can recite the MAPE formula. What separates a planner from a spreadsheet is knowing *why* the business should care about each metric, and *when* each one lies to you. These are my working notes on the eight forecast KPIs that come up constantly in demand planning — with the formula, the business meaning, and the trap hidden inside each one.

Notation used throughout: $A_t$ = actual demand in period $t$, $F_t$ = forecast for period $t$, $n$ = number of periods.

## MAPE — the metric everyone knows (and misuses)

$$MAPE = \frac{1}{n} \sum_{t=1}^{n} \left\vert \frac{A_t - F_t}{A_t} \right\vert \times 100\%$$

**What it tells the business:** on average, how far off were we, as a percentage? It's the easiest error metric to explain to a non-technical stakeholder, which is exactly why it's everywhere.

**The trap:** it divides by actual demand, so it breaks completely on any period where $A_t = 0$. It also punishes over-forecasting harder than under-forecasting — an over-forecast can produce an error above 100%, while an under-forecast error tops out at 100%. A planner optimising for MAPE will quietly learn to forecast low.

**Use it for:** high-volume products with steady, non-zero demand, and any report headed to people who don't want to see a formula.

## WMAPE — MAPE that respects volume

$$WMAPE = \frac{\sum_{t=1}^{n} \vert A_t - F_t \vert}{\sum_{t=1}^{n} A_t}$$

**What it tells the business:** the same "how far off" question, but weighted by volume, so a 300% miss on an item that sells 4 units a year doesn't wreck the scorecard for a category that's otherwise well forecast.

**The trap:** the weighting cuts both ways. A low-volume item that's strategically critical — or carries most of the margin — can have terrible accuracy that WMAPE hides completely behind the big movers.

**Use it for:** aggregate reporting across a diverse portfolio: a product category, a region, a whole network.

## Bias — the direction of your error

$$Bias = \frac{1}{n} \sum_{t=1}^{n} (A_t - F_t)$$

**What it tells the business:** whether the errors lean one way. Consistently positive means you're under-forecasting (stockouts, expedited freight). Consistently negative means over-forecasting (dead stock, tied-up capital).

**The trap:** positive and negative errors cancel. A bias of zero doesn't mean a good forecast — it can mean you were badly wrong in both directions in equal amounts.

**Use it for:** detecting systemic behaviour, like a sales team that always over-promises. Never read bias alone; always pair it with an absolute metric like MAD or MAPE.

## MAD — error in physical units

$$MAD = \frac{1}{n} \sum_{t=1}^{n} \vert A_t - F_t \vert$$

**What it tells the business:** the average miss in actual units — "we're off by 500 bolts a month." That's a number you can plan warehouse space and safety stock around.

**The trap:** it doesn't scale across products. Being 50 units off is a disaster on an item selling 100 a month and a rounding error on one selling 10,000.

**Use it for:** SKU-level operational planning. If you're managing long overseas procurement lead times, MAD gives you the unit buffer that feeds directly into safety stock calculations.

## RMSE — the metric that hates big misses

$$RMSE = \sqrt{\frac{1}{n} \sum_{t=1}^{n} (A_t - F_t)^2}$$

**What it tells the business:** the standard deviation of forecast errors. Squaring before averaging means one huge miss hurts far more than several small ones.

**The trap:** the output isn't intuitive for business audiences. It's a diagnostic tool, not a boardroom number.

**Use it for:** evaluating ML forecasting pipelines — it's a standard loss function in libraries like scikit-learn and XGBoost. In business terms, reach for RMSE when a single massive error costs disproportionately more than many small ones.

## Forecast Value Add — does each step actually help?

$$FVA = \text{Accuracy of process step} - \text{Accuracy of naive baseline}$$

**What it tells the business:** whether a step in the forecasting process improved anything. The naive baseline is usually "next period equals this period." If a planner manually overrides the statistical forecast, FVA shows whether that override added value or destroyed it.

**The trap:** it demands disciplined tracking of every forecast version (baseline, statistical, planner override, consensus). And politically, it can be awkward — FVA frequently reveals that human overrides make the forecast *worse*.

**Use it for:** justifying the ROI of planning software, and identifying which manual touches in your S&OP process should be eliminated.

## Forecast Accuracy % — the positive spin

$$Accuracy = \max(0,\ 100\% - MAPE)$$

(Many companies substitute WMAPE here.)

**What it tells the business:** the same information as MAPE, framed as a win instead of a miss.

**The trap:** there's no industry-standard definition. Your 85% and a competitor's 85% could be built on entirely different formulas, so the comparison is meaningless without the underlying maths.

**Use it for:** executive dashboards and vendor scorecards — anywhere a positive framing is expected. Just document which formula sits underneath it.

## Tracking Signal — the smoke alarm

$$TS = \frac{\sum (A_t - F_t)}{MAD}$$

**What it tells the business:** whether errors are random noise or a systematic drift. When the signal breaches a threshold (typically ±4), the forecast model is broken and needs review.

**The trap:** one anomaly — say, a single bulk order from one customer — can trip the alarm without any real shift in baseline demand.

**Use it for:** automated exception alerts. It's the early-warning system that tells a planner to review an SKU before it turns into a stockout or an overstock write-down.

## Quick reference

| Metric | Best for | Watch out for |
|---|---|---|
| MAPE | Stakeholder communication, steady demand | Zero-demand periods; penalises over-forecasting |
| WMAPE | Portfolio-level reporting | Hides poor accuracy on strategic low-volume items |
| Bias | Detecting systematic over/under-forecasting | Errors cancel out; never read alone |
| MAD | SKU-level planning, safety stock | Doesn't scale across products |
| RMSE | ML model evaluation, big-miss sensitivity | Not intuitive for business audiences |
| FVA | Auditing the forecasting process itself | Heavy tracking overhead; political friction |
| Accuracy % | Dashboards and scorecards | No standard definition — always state the formula |
| Tracking Signal | Automated exception alerts | False alarms from one-off anomalies |

## Takeaway

No single metric is honest on its own. MAPE without bias hides direction. Bias without MAD hides magnitude. WMAPE without SKU-level review hides your strategic items. The planners who get hired — and the ones who keep inventory off the write-down list — are the ones who know which metric to reach for, and which lie it's about to tell them.
