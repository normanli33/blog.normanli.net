---
title: "Why Your Safety Stock Is Lying to You"
date: 2026-07-02
categories: ["Forecasting"]
tags: ["inventory", "forecasting"]
summary: "Every planner inherits the same textbook formula for safety stock. Almost nobody checks whether their demand actually looks the way the formula assumes it does."
math: true
---

## Background

Every planner inherits the same formula for safety stock. It gets handed down in a spreadsheet, nobody rewrites it, and it quietly assumes something about your demand that is almost never true.

$$SS = Z \cdot \sigma_{LT} \cdot \sqrt{L}$$

Here, $Z$ is a service-level factor, $\sigma_{LT}$ is the standard deviation of demand during lead time, and $L$ is the lead time itself. It's a clean formula. It also assumes demand during lead time is normally distributed and independent day to day[^1].

## What the formula assumes

Three assumptions are doing all the work:

- Demand is symmetric around its mean — no long tail of occasional large orders.
- Day-to-day demand is independent — Tuesday's order tells you nothing about Wednesday's.
- Lead time itself is fixed, not a distribution of its own.

For a stable, high-volume SKU sold to many small customers, these hold up reasonably well. For anything lumpy — spares, promotional items, B2B accounts that order in batches — they don't.

## Where it breaks

Take a SKU with occasional large orders from a single distributor. The mean and standard deviation both go up, so the formula dutifully inflates your safety stock. But it's solving the wrong problem: you don't have "more variable normal demand," you have two different demand regimes layered on top of each other.

| Regime | Frequency | Typical order | Formula's response |
|---|---|---|---|
| Baseline retail | Daily | 5–20 units | Correctly sized |
| Distributor batch | Monthly | 200–400 units | Inflates *everyone's* safety stock |

The result: safety stock creeps up site-wide to cover an event that only ever happens on one account, on one week of the month.

## A better estimate

Splitting demand by customer type before computing variance, then sizing safety stock per segment, gets closer to the truth than one global number ever will. It's more setup work — but it's the difference between safety stock that protects against real variability and safety stock that's just padding for a formula's bad assumptions.

## Takeaways

- Check the shape of your demand before trusting the formula that sizes your buffer.
- A single safety-stock number across mixed demand regimes overcorrects for the rare case and undercorrects for the common one.
- Segmenting by demand pattern, not just by SKU, usually pays for itself within a quarter.

[^1]: Assuming normally-distributed, independent daily demand — rarely true for slow movers or promotional SKUs.
