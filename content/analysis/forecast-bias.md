---
title: "Forecast accuracy is not enough"
date: 2026-06-18
description: "Accuracy compresses different planning failures into one number. Bias shows which direction the system is consistently getting wrong."
tags: ["Forecasting", "Demand planning"]
summary: "Why bias tells a more useful operational story—and how to act on it."
---

## The problem

A forecast can look acceptable in aggregate while repeatedly creating the same operational failure. Average error measures size; it does not reveal direction.

> **Decision principle:** use accuracy to understand magnitude and bias to understand behaviour.

## A practical model

Track weighted absolute percentage error alongside signed forecast error. Segment both by product family, planner, horizon, and demand pattern.

| Signal | What it reveals | Useful response |
|---|---|---|
| High error, low bias | Volatility or weak signal | Review model and aggregation |
| Low error, high bias | Consistent directional miss | Correct systematic assumptions |
| High error, high bias | Structural forecasting issue | Rebuild process and ownership |

## Recommendation

Review bias as a distribution, not only as a portfolio average. Opposing errors can cancel each other and hide where intervention is required.

## Key takeaways

- Accuracy and bias answer different questions.
- Segmentation matters more than a single headline score.
- Metrics only create value when paired with a decision rule.

