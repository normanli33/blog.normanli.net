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
- **Exogenous regressors** — `onpromotion` flag fed into the model, plus Fourier terms and New Year/Christmas dummies in the grid-search variant
- **Back-transformation** — `expm1` to invert `log1p`, clipped at zero so confidence intervals never go negative
- **Order selection** — grid search over AR/MA orders scored by AICc *and* a 28-day holdout MAPE, trusting models only where both rankings agree
- **Holiday features** — reusable `create_holiday_features()` builder producing today / day-before / day-after flags for any country and region

## Result

A working end-to-end notebook: forecast with 95% confidence interval plotted against test actuals, scored with MAE / RMSE / MAPE / NRMSE on the real sales scale, and residual diagnostics that pinpoint exactly where the model is blind (holiday clusters). The walkthrough is written up as an essay, and the runnable notebook is available to download:

- [Full writeup](/essays/store-sales-forecasting-sarimax-walkthrough/) — step-by-step with all plots
- [Original notebook](/files/store-sales-time-series-forecast-SARIMAX.ipynb) — runnable Jupyter notebook
- [Companion guide](/essays/understanding-sarimax-outputs-diagnostic-guide/) — how to read the SARIMAX summary itself
