---
title: "Store Sales Forecasting with SARIMAX: A Full Walkthrough"
date: 2026-08-05
categories: ["Forecasting"]
tags: ["time-series", "sarimax", "statsmodels", "python", "forecasting", "jupyter"]
summary: "A complete SARIMAX forecasting pipeline on the Store Sales dataset — from EDA and stationarity testing through model fitting, back-transformation, residual diagnostics, grid search, and holiday regressors."
math: true
---

*This is the hands-on companion to my earlier post, [Understanding SARIMAX Outputs](/essays/understanding-sarimax-outputs-diagnostic-guide/). That article explains how to read a model summary; this one walks through the full pipeline that produces one — on real store sales data, from raw CSV to a forecast with confidence intervals.*

The dataset is the Kaggle [Store Sales Forecasting](https://www.kaggle.com/competitions/store-sales-forecasting) competition data (Corporación Favorita, an Ecuadorian grocery retailer): daily sales for 54 stores across 33 product families, plus an `onpromotion` flag and a holiday calendar. The full pipeline below is written as a Jupyter notebook; here it is as a single narrative.

## 1. Setup

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error, root_mean_squared_error

import statsmodels.api as sm
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller, acf, pacf
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.arima_process import ArmaProcess
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX

import warnings
```

## 2. Load the data

```python
oil = pd.read_csv("oil.csv")                              # daily oil prices
sample_submission = pd.read_csv("sample_submission.csv")
df = pd.read_csv("train.csv")                             # store × family × day sales
holidays = pd.read_csv("holidays_events.csv")
```

The training table has one row per store, family, and date. `df.info()` shows the usual mix — `store_nbr`, `family`, `onpromotion` (number of promoted items that day), and `sales`.

## 3. Exploratory analysis: pick a series

First, total sales by product family:

```python
sns.barplot(data=df, x="family", y="sales", estimator="sum", errorbar=None)
plt.xticks(rotation=90, ha="right")
plt.show()
```

![Total sales by product family](/images/sarimax-family-total-sales.png)

GROCERY I dominates — it's the everyday-staples category, so it has the highest volume and the most stable weekly pattern. That makes it a good candidate for a first SARIMAX model. I also pick a single store (store 46) so we're modelling one clean daily series rather than a panel:

```python
category = "GROCERY I"
store_number = 46

df["date"] = pd.to_datetime(df["date"])
store_cat_sales = df[(df["family"] == category) & (df["store_nbr"] == store_number)]

series = store_cat_sales.set_index("date").sort_index()[["sales", "onpromotion"]]
series = series.asfreq('D').interpolate('time')
```

`asfreq('D')` forces a regular daily frequency (the raw data only has rows for days a store actually traded), and `interpolate('time')` fills any remaining gaps sensibly.

![First 90 days of GROCERY I, store 46](/images/sarimax-first-90-days.png)

The weekly cycle is immediately visible: a strong weekend pattern, repeating every 7 days.

## 4. Stationarity: visual, then statistical

The core question before any ARIMA-style model: **is the series stationary?** (Constant mean, constant variance, no trend or seasonality left.) Look at the raw series versus two transforms:

```python
fig, ax = plt.subplots(3, 1, figsize=(12, 6))
sns.lineplot(data=series, ax=ax[0])
sns.lineplot(data=series.diff(1), ax=ax[1])
sns.lineplot(data=series.diff(7), ax=ax[2])

ax[0].set_title("total sales")
ax[1].set_title("total sales - seasonal diff(1)")
ax[2].set_title("total sales - seasonal diff(7)")
plt.tight_layout()
plt.show()
```

![Raw, first-differenced, and seasonally-differenced sales](/images/sarimax-differencing.png)

- **Raw:** trend + strong weekly seasonality + holiday spikes → clearly non-stationary.
- **diff(1):** trend gone, but the weekly cycle is still visibly pulsing.
- **diff(7):** comparing each day to the same day last week removes the weekly pattern — what's left looks like noise. This is the transform the model will ultimately want.

Confirm with the ACF/PACF of the seasonally differenced series, and the ADF test:

```python
diffed = series["sales"].diff(7).dropna()

fig, axes = plt.subplots(2, 1, figsize=(12, 4))
plot_acf(diffed, lags=60, ax=axes[0], title="ACF — Seasonal difference (7)")
plot_pacf(diffed, lags=60, ax=axes[1], title="PACF — Seasonal difference (7)", method="ywm")
plt.tight_layout()
plt.show()
```

![ACF and PACF after seasonal differencing](/images/sarimax-acf-pacf.png)

```python
def adf_report(x, label=""):
    results = adfuller(x.dropna(), autolag="AIC")
    print(f"--- ADF test: {label} ---")
    print(f"ADF statistic: {results[0]:.4f}")
    print(f"p-value: {results[1]:.4f}")
    for k, v in results[4].items():
        print(f"  critical value ({k}): {v:.4f}")
    if results[1] < 0.05:
        print("=> Reject H0: series looks stationary\n")
    else:
        print("=> Fail to reject H0: series looks non-stationary\n")

adf_report(series["sales"], "total_sales")
adf_report(series["sales"].diff(7), "total_sales first difference")
```

The ADF test on the raw series fails to reject the unit root (non-stationary), while the seasonally differenced series comfortably rejects it (p < 0.05). That justifies a seasonal difference of 7 — i.e. `D=1, s=7` in the model order.

## 5. Fit SARIMAX with an exogenous regressor

Two refinements before fitting:

1. **Log transform.** Sales are large and right-skewed; `log1p` stabilises variance and makes errors interpretable in percentage terms.
2. **Exogenous `onpromotion`.** Promotions drive sales; feeding the flag as `exog` lets the model absorb those spikes instead of leaving them in the residuals.

```python
test_size = 60

# log transformation for large sales numbers
series[series["sales"] == 0] = np.nan
series.loc[series["onpromotion"].isna(), "onpromotion"] = 0

series["log_sales"] = np.log(series["sales"] + 1)

train = series.iloc[:-test_size].copy()
test = series.iloc[-test_size:].copy()

model = SARIMAX(
    train["log_sales"],
    order=(1, 1, 1),
    seasonal_order=(0, 1, 1, 7),
    enforce_stationarity=False,
    enforce_invertibility=False,
    exog=train["onpromotion"]
)
results = model.fit()
print(results.summary())
```

The summary output is exactly what the [interpretation guide](/essays/understanding-sarimax-outputs-diagnostic-guide/) walks through — coefficients, p-values, AIC/BIC, residual diagnostics.

![On-promotion regressor over time](/images/sarimax-onpromotion.png)

## 6. Forecast and invert the transform

Forecasting on the log scale, then inverting with `expm1` (the exact inverse of `log1p`) to get back to real sales units — and clipping at zero so the confidence interval never goes negative:

```python
test_exog = test[["onpromotion"]]

forecast_object = results.get_forecast(steps=len(test), exog=test_exog)
log_forecast = forecast_object.predicted_mean
confidence_int_log = forecast_object.conf_int()

# Invert log transformation back to original scale (expm1(x) = exp(x) - 1)
y_pred = np.expm1(log_forecast)
lower_bound = np.expm1(confidence_int_log.iloc[:, 0])
upper_bound = np.expm1(confidence_int_log.iloc[:, 1])

# Clip bounds and predictions at zero to prevent impossible negative sales
y_pred = np.maximum(y_pred, 0)
lower_bound = np.maximum(lower_bound, 0)

# Accuracy metrics on the real sales scale
y_true = test["sales"]
mae = mean_absolute_error(y_true, y_pred)
rmse = root_mean_squared_error(y_true, y_pred)

mean_sales = test["sales"].mean()
mape = np.mean(np.abs((test["sales"] - y_pred) / test["sales"])) * 100
nrmse = (rmse / mean_sales) * 100

print(f"MAE  : {mae:.2f}")
print(f"RMSE : {rmse:.2f}")
print(f"Average Daily Sales: {mean_sales:.2f}")
print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
print(f"Normalized RMSE (NRMSE): {nrmse:.2f}%")
```

```python
plt.figure(figsize=(12, 6))

plt.plot(train.index[-180:], train["sales"].tail(180),
         label="Train (Recent)", color="#2b5c8f")
plt.plot(test.index, y_true, label="Test Actuals", color="#333333", linewidth=2)
plt.plot(test.index, y_pred, label="SARIMA Forecast",
         color="#d95f02", linewidth=2, linestyle="--")
plt.fill_between(test.index, lower_bound, upper_bound,
                 color="#d95f02", alpha=0.2, label="95% Confidence Interval")

plt.title("SARIMA Sales Forecast vs. Test Actuals", fontsize=14, fontweight="bold")
plt.xlabel("Date"); plt.ylabel("Sales")
plt.legend(loc="upper left"); plt.grid(True, linestyle=":", alpha=0.6)
plt.tight_layout()
plt.show()
```

![SARIMA forecast vs. test actuals with 95% confidence interval](/images/sarimax-forecast-vs-actual.png)

The forecast tracks the weekly rhythm of the actuals well, and the 95% band widens slightly over the 60-day horizon as uncertainty compounds — exactly what you'd expect.

## 7. Residual diagnostics

A good model leaves nothing but noise in the residuals:

```python
residuals = pd.DataFrame(results.resid)

fig, axes = plt.subplots(1, 2, figsize=(15, 5))
axes[0].plot(residuals); axes[0].set_title('Residuals Over Time')
axes[1].hist(residuals, bins=30); axes[1].set_title('Histogram of Residuals')
plt.tight_layout()
plt.show()
```

![Residuals over time and histogram](/images/sarimax-residuals.png)

```python
resid = results.resid
resid.abs().nlargest(10)     # dates of the remaining worst residuals
series["sales"].head(15)     # what do the first days of Jan 2013 look like?
```

The worst residuals cluster around holidays (the first days of January, Christmas week) — the model's biggest miss is exactly where the [over-differencing and holiday-shock warnings](/essays/understanding-sarimax-outputs-diagnostic-guide/) predicted problems. That motivates the next two sections.

## 8. Grid search over model orders

Rather than trusting one order, sweep a grid of AR/MA orders — fixing differencing at what the diagnostics established (`d=1, D=1, s=7`) — and score each candidate two ways: **AICc** (in-sample, penalised for parameter count) and a **28-day holdout MAPE** (out-of-sample). Prefer models where both rankings agree.

```python
import itertools
import warnings
from statsmodels.tsa.statespace.sarimax import SARIMAX
warnings.filterwarnings("ignore")

SEASON = 7
D_FIXED = 1
DD_FIXED = 1
FOURIER_K = 4
HORIZON = 28

P_RANGE  = range(0, 4)   # non-seasonal AR
Q_RANGE  = range(0, 3)   # non-seasonal MA
PP_RANGE = range(0, 2)   # seasonal AR
QQ_RANGE = range(0, 2)   # seasonal MA

def make_exog(index, origin, K=FOURIER_K):
    t = (index - origin).days.values.astype(float)
    cols = {}
    for k in range(1, K + 1):
        cols[f"sin{k}"] = np.sin(2 * np.pi * k * t / 365.25)
        cols[f"cos{k}"] = np.cos(2 * np.pi * k * t / 365.25)
    X = pd.DataFrame(cols, index=index)
    X["newyear"] = ((index.month == 1) & (index.day <= 2)).astype(int)
    X["xmas"]    = ((index.month == 12) & (index.day.isin([24, 25, 26]))).astype(int)
    return X

def aicc(res):
    k, n = res.params.size, res.nobs
    return res.aic + (2 * k * (k + 1)) / max(n - k - 1, 1)

def mape(actual, pred):
    return float((np.abs((actual - pred) / actual)).mean() * 100)

def evaluate(y, X, order, sorder):
    full = SARIMAX(y, exog=X, order=order, seasonal_order=sorder,
                   enforce_stationarity=False,
                   enforce_invertibility=False).fit(disp=False)
    score = aicc(full)

    y_tr, X_tr = y.iloc[:-HORIZON], X.iloc[:-HORIZON]
    y_te, X_te = y.iloc[-HORIZON:], X.iloc[-HORIZON:]
    r = SARIMAX(y_tr, exog=X_tr, order=order, seasonal_order=sorder,
                enforce_stationarity=False,
                enforce_invertibility=False).fit(disp=False)
    pred = np.exp(r.get_forecast(HORIZON, exog=X_te).predicted_mean)
    oos = mape(np.exp(y_te), pred)
    return score, oos, full.params.size

combos = list(itertools.product(P_RANGE, Q_RANGE, PP_RANGE, QQ_RANGE))
results = []
for p, q, P, Q in combos:
    order, sorder = (p, D_FIXED, q), (P, DD_FIXED, Q, SEASON)
    try:
        score, oos, npar = evaluate(y, X, order, sorder)
        results.append((order, sorder, score, oos, npar))
    except Exception:
        pass

res_df = (pd.DataFrame(results, columns=["order", "seasonal_order", "AICc", "holdout_MAPE", "n_params"])
          .sort_values("AICc").reset_index(drop=True))
print(res_df.head(5).to_string(index=False))
res_df.to_csv("sarima_gridsearch_results.csv", index=False)
```

The grid adds **Fourier terms** (sine/cosine pairs for annual seasonality) plus New Year and Christmas dummies as exogenous regressors — the same holiday-shock absorption recommended in the diagnostic guide. Two notes from the notebook worth keeping: the search fixes differencing rather than sweeping it (searching `d`/`D` tends to rediscover what the ADF test already told you), and a rolling multi-window backtest (`USE_ROLLING=True`) is the more robust — but slower — variant.

## 9. Holiday regressors with the `holidays` package

Finally, a reusable piece: build proper holiday flags (today / day-before / day-after) from the `holidays` package, for any country and region. Here it generates features for Sydney (AU/NSW) and Los Angeles (US/CA):

```python
import holidays

def create_holiday_features(index, country, subdiv, prefix):
    index = pd.DatetimeIndex(index).normalize()
    years = range(index.min().year, index.max().year + 1)

    holiday_calendar = holidays.country_holidays(
        country=country, subdiv=subdiv, years=years, observed=True
    )
    holiday_dates = set(holiday_calendar.keys())

    features = pd.DataFrame(index=index)
    features[f"{prefix}_holiday_today"] = [
        int(date.date() in holiday_dates) for date in index
    ]
    features[f"{prefix}_day_before_holiday"] = [
        int((date + pd.Timedelta(days=1)).date() in holiday_dates) for date in index
    ]
    features[f"{prefix}_day_after_holiday"] = [
        int((date - pd.Timedelta(days=1)).date() in holiday_dates) for date in index
    ]
    return features.astype(float)

X_sydney = create_holiday_features(index=y.index, country="AU", subdiv="NSW", prefix="sydney")
X_la     = create_holiday_features(index=y.index, country="US", subdiv="CA", prefix="la")
```

## Summary

The pipeline, end to end:

1. **Pick one clean series** (a high-volume family at a single store) and force a regular daily frequency.
2. **Establish stationarity visually and statistically** — differencing plots, ACF/PACF, and the ADF test justify `d=1, D=1, s=7`.
3. **Fit SARIMAX on log-transformed sales** with `onpromotion` as an exogenous regressor.
4. **Forecast, invert with `expm1`, clip at zero**, and score with MAE/RMSE/MAPE on the original scale.
5. **Read the residuals** — holiday-date clusters tell you where the model is blind.
6. **Grid-search orders** on AICc + holdout MAPE, adding Fourier and holiday regressors.

The full notebook is the companion to the [SARIMAX interpretation guide](/essays/understanding-sarimax-outputs-diagnostic-guide/) — the guide tells you how to read the summary, this walkthrough tells you how to produce a summary worth reading.

---

📄 **Prefer reading offline?** [Download the original notebook](/files/store-sales-time-series-forecast-SARIMAX.ipynb) — runnable Jupyter notebook, same code.
