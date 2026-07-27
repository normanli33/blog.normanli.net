---
title: "Solver Returns-Distribution Fitter"
date: 2026-07-27
status: "active"
stack: "Excel Solver"
tags: ["supply-chain", "excel", "forecasting"]
---

## The problem

When units are issued each week and come back over the following weeks — containers, pallets, tools, returnable assets — you need a model that captures the lag distribution. Planners usually guess a fixed return window, which is wrong. This workbook fits an actual distribution to your data.

## Approach

A structured Excel Solver workbook that fits a normal distribution to weekly issue-and-return data. The share of units returning at each lag is modelled as a normal distribution — Solver searches for the mean, variance, and recovery rate that minimise the RMSE between forecast and actual returns.

**Three linked sheets:**

1. **1_Normal_Model** — Normal PDF/CDF → discrete weekly lag weights, truncated at a configurable max lag
2. **2_Issues_Returns** — Convolution of issues × lag weights to produce a forecast, compared against actual returns with RMSE/MAE/Bias
3. **3_Solver_Fit** — Solver control panel: changing cells (μ, σ², r), objective (minimise RMSE), constraints, and run

## Download

[📥 solver-returns-distribution.xlsx](/files/solver-returns-distribution.xlsx)

The workbook ships with 51 weeks of synthetic data generated from μ=2.4, σ=1.1, r=92%, plus 3% noise — so you can see Solver converge back near those values. Replace columns B (Issues) and J (Actual returns) with your own data and the model refits automatically.

Enable Solver add-in first: *File → Options → Add-ins → Excel Add-ins → tick Solver Add-in*.
