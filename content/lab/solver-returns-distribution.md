---
title: "Excel Solver - Returns-Distribution Fitter"
date: 2026-07-27
status: "active"
stack: "Excel Solver"
tags: ["supply-chain", "excel", "forecasting"]
---

## The problem

When assets are issued each week and returned over subsequent weeks—such as containers, pallets, tools, and other returnable equipment—planners need a model that captures the return-lag distribution.

In practice, return timing is often represented by a fixed cycle time based on experience. However, this assumption may not reflect actual return behaviour and can lead to inaccurate return forecasts, inventory imbalances, or unnecessary asset purchases.

This workbook estimates the return-lag distribution from historical issue-and-return data by minimising the root mean squared error, or RMSE, between forecast and actual returns.

## Approach

This Excel Solver workbook fits a normal distribution to weekly issue-and-return data.

The proportion of units returning at each weekly lag is modelled using a discrete normal distribution. Solver then searches for the combination of mean return lag, standard deviation, and recovery rate that minimises the RMSE between forecast and actual returns.

The workbook contains three main components:

1. **1_Normal_Model** — Normal PDF/CDF → discrete weekly lag weights, truncated at a configurable max lag
2. **2_Issues_Returns** — Convolution of issues × lag weights to produce a forecast, compared against actual returns with RMSE/MAE/Bias
3. **3_Solver_Fit** — Solver control panel: changing cells (μ, σ², r), objective (minimise RMSE), constraints, and run

## Download

[📥 solver-returns-distribution.xlsx](/files/solver-returns-distribution.xlsx)

The workbook includes 51 weeks of synthetic data generated using the following parameters:

- Mean return lag: **2.4 weeks**
- Standard deviation: **1.1 weeks**
- Recovery rate: **92%**
- Random noise: approximately **3%**

This example allows you to observe whether Solver can recover parameter values close to those used to generate the sample data.

To use your own data, replace:

- **Column B:** Weekly issues
- **Column J:** Actual weekly returns

The formulas will update automatically, after which Solver can be run again to refit the distribution.
## Discussion
This workbook is a simplified model of an issue-and-return process. Its main purpose is not to produce a highly accurate operational forecast, but to estimate and review the underlying return cycle.

The fitted mean, dispersion, and recovery rate can provide useful insights into questions such as:

- How long assets typically remain in circulation
- How widely return times vary
- What proportion of issued assets is eventually recovered
- Whether the return cycle is changing over time

The forecasting accuracy of this model may be limited because it assumes that return behaviour follows a stable normal distribution. Actual returns may also be affected by seasonality, operational delays, customer behaviour, missing assets, and changes in issue volumes.
