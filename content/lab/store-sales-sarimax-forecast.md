---
title: "Store Sales SARIMAX Forecast"
date: 2026-08-05
status: "shipped"
stack: "Python + statsmodels"
demo: "https://normanli.net/essays/store-sales-forecasting-sarimax-walkthrough/"
tags: ["time-series", "sarimax", "statsmodels", "python", "forecasting"]
---

## The problem

Daily sales at a grocery chain follow a strong weekly rhythm, but promotions and holidays throw spikes at it that a naive forecast can't see coming. Baseline forecasts either ignore the weekly seasonality entirely or get blindsided by holiday demand.

## Approach

A SARIMAX pipeline on the Store Sales dataset (GROCERY I at a single store, ~4.5 years of daily sales):

- **Log transform + seasonal differencing** — `log1p` for variance stabilisation, `d=1, D=1, s=7` established via ACF/PACF and the ADF test
- **Exogenous regressor** — the `onpromotion` flag fed into the model via `exog`
- **Back-transformation** — `expm1` to invert `log1p`, clipped at zero so confidence intervals never go negative
- **Residual diagnostics** — residuals over time and histogram checked right after fitting, before trusting any forecast
- **Scoring** — MAE / RMSE / MAPE / NRMSE computed on the real sales scale against a 60-day holdout

## Result

A working end-to-end notebook: forecast with 95% confidence interval plotted against test actuals, scored on the real sales scale, with residual diagnostics to sanity-check the model. The walkthrough is written up as an essay, and the runnable notebook is available to download:

- [Full writeup](/essays/store-sales-forecasting-sarimax-walkthrough/) — step-by-step with all plots
- [Original notebook](/files/store-sales-time-series-forecast-SARIMAX.ipynb) — runnable Jupyter notebook
- [Companion guide](/essays/understanding-sarimax-outputs-diagnostic-guide/) — how to read the SARIMAX summary itself
