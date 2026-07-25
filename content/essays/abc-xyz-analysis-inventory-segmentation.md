---
title: "ABC-XYZ Analysis: A Practical Guide to Inventory Segmentation for Demand Planning"
date: 2026-07-25
categories: ["Demand Planning"]
tags: ["inventory", "forecasting", "abc-analysis", "xyz-analysis", "segmentation"]
summary: "ABC tells you what matters financially. XYZ tells you what you can actually forecast. Together they form the foundation of every sensible inventory strategy."
math: true
---

## Background

Inventory management is more than keeping enough stock to cover demand. Every week you're balancing service level targets, inventory investment, forecast accuracy, and operational bandwidth — and those four things pull in opposite directions.

The ABC-XYZ Matrix is the simplest tool I know for escaping that tension. It segments products two ways — by financial importance (ABC) and by demand predictability (XYZ) — so you can apply different planning strategies to different product groups instead of one rule for everything.

If you work in SAP IBP, Oracle, Dynamics, or even just Excel, ABC-XYZ is one of the first things you should set up in S&OP.

## ABC Analysis: What's Actually Worth Your Time

ABC analysis ranks products by **annual consumption value**:

$$ \text{Annual Consumption Value} = \text{Annual Demand} \times \text{Unit Cost} $$

| Category | % of SKUs | % of Inventory Value | Characteristics |
|----------|-----------|---------------------|-----------------|
| A | 10–20% | 70–80% | Highest business impact |
| B | 20–30% | 15–25% | Medium importance |
| C | 50–70% | 5–10% | Low-value, high-volume |

**A Items** — a handful of products that drive most of the value. High-value fasteners, aerospace components, stainless steel specialties, critical spares. These get frequent reviews, accurate forecasting, tight inventory controls, and senior management visibility.

**B Items** — moderate value products. Monthly reviews, standard replenishment, balanced service levels. They matter, but they don't demand daily attention.

**C Items** — most of your SKU count, almost none of the dollar value. Standard washers, common screws, low-cost consumables. These should run on autopilot — min-max, kanban, two-bin systems.

## XYZ Analysis: What You Can Actually Predict

While ABC measures value, XYZ measures how predictable demand is. The standard metric is the **Coefficient of Variation (CV)**:

$$ CV = \frac{\sigma}{\mu} $$

Lower CV means more stable demand.

| Category | Demand Pattern | Forecast Difficulty |
|----------|---------------|-------------------|
| X | Stable | Easy |
| Y | Seasonal or moderate variation | Moderate |
| Z | Highly irregular / lumpy | Difficult |

**X Items** — consistent monthly demand, small fluctuations, high forecast accuracy. Standard hex bolts, common nuts, frequently ordered industrial products. Use statistical forecasting: moving average, exponential smoothing, ARIMA, Prophet.

**Y Items** — reasonably predictable but influenced by seasonality, promotions, construction cycles, or maintenance shutdowns. Requires a mix of statistical forecasting and planner judgement.

**Z Items** — erratic demand with long quiet periods and sudden large orders. Defence fasteners, mining project components, custom-engineered products. Traditional forecasting fails here. Rely on customer collaboration, sales intelligence, project pipelines, and make-to-order strategies.

## The ABC-XYZ Matrix

ABC tells you *which products are financially important*. XYZ tells you *which products are easy or hard to forecast*. Combine them:

| | X (Stable) | Y (Moderate) | Z (Erratic) |
|---|---|---|---|
| **A** | AX | AY | AZ |
| **B** | BX | BY | BZ |
| **C** | CX | CY | CZ |

Each cell needs a different policy:

| Segment | Inventory Policy | Forecasting Method | Safety Stock | Focus |
|---------|----------------|-------------------|-------------|-------|
| **AX** | Tight control | Advanced statistical | Low–Moderate | Forecast accuracy & turnover |
| **AY** | Flexible replenishment | Seasonal forecasting | Moderate | Monitor trends & seasonal demand |
| **AZ** | Customer-driven planning | Sales & project input | Higher where justified | Minimise stock risk, maintain service |
| **BX** | Standard replenishment | Statistical forecasting | Moderate | Efficient inventory management |
| **BY** | Periodic review | Statistical + planner adjustment | Moderate | Balance inventory & responsiveness |
| **BZ** | Conservative stocking | Collaborative planning | Higher if critical | Avoid obsolescence |
| **CX** | Automated replenishment | Simple forecasting | Low | Reduce planning effort |
| **CY** | Min-max or reorder point | Basic forecasting | Moderate | Operational simplicity |
| **CZ** | Make-to-order where possible | Minimal forecasting | Very Low | Reduce inventory investment |

## A Fastener Distributor Example

| Product | ABC | XYZ | Strategy |
|---------|-----|-----|----------|
| M12 Grade 8.8 Bolt (standard) | A | X | Statistical forecasting, weekly review |
| Stainless Steel Anchor Bolt | A | Y | Monitor construction activity, adjust forecasts |
| Titanium Aerospace Bolt | A | Z | Customer collaboration, project-based planning |
| Standard Flat Washer | C | X | Automated replenishment, min-max |
| Custom Dywidag Rod | B | Z | Make-to-order or minimal stock |

Notice how policies diverge even within the same ABC category — demand behaviour overrides value alone.

## Why This Matters

The real benefit of ABC-XYZ isn't the classification itself; it's that it forces you to stop managing every SKU the same way. You focus planner effort where it delivers the greatest return, automate where it doesn't, and match your inventory strategy to the actual demand pattern your data shows.

Done well, it improves forecast accuracy, reduces excess inventory, increases turnover, lowers working capital, and supports a cleaner S&OP process.

## What's Next

In the next post I'll walk through how to build this in Excel and Power BI with real inventory data — automatic SKU classification, CV calculation, and a dynamic dashboard.
