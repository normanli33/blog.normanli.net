---
title: "KL Divergence"
cluster: "Data & ML"
definition: "KL divergence measures how much information is lost when one probability distribution is used to approximate another."
tags: ["statistics", "machine-learning", "probability"]
math: true
---

KL divergence—Kullback–Leibler divergence—measures how different one probability distribution is from another.

For discrete distributions $P$ and $Q$:

$$
D_{\mathrm{KL}}(P\|Q)
=
\sum_x P(x)\log\left(\frac{P(x)}{Q(x)}\right)
$$

It can be interpreted as:

> The extra information loss incurred when using $Q$ to approximate the true distribution $P$.

## Simple Example

Suppose the true coin distribution is:

$$
P(\text{heads})=0.8, \qquad P(\text{tails})=0.2
$$

but the model predicts:

$$
Q(\text{heads})=0.5, \qquad Q(\text{tails})=0.5
$$

Then:

$$
D_{\mathrm{KL}}(P\|Q)
=
0.8\log\frac{0.8}{0.5}
+
0.2\log\frac{0.2}{0.5}
$$

Using natural logarithms:

$$
D_{\mathrm{KL}}(P\|Q) \approx 0.193
$$

A KL divergence of **0** means the two distributions are identical. A larger value means $Q$ is a poorer approximation of $P$.

## Important Properties

### 1. KL divergence is not symmetric

$$
D_{\mathrm{KL}}(P\|Q)
\neq
D_{\mathrm{KL}}(Q\|P)
$$

Therefore, KL divergence is not a true mathematical distance.

### 2. KL divergence is always non-negative

$$
D_{\mathrm{KL}}(P\|Q) \geq 0
$$

Equality holds only when $P$ and $Q$ are identical, apart from events with zero probability.

### 3. Zero probabilities can produce infinity

If $P(x)>0$ but $Q(x)=0$, then:

$$
D_{\mathrm{KL}}(P\|Q)=\infty
$$

This happens because the model assigns zero probability to an event that can actually occur.

## Connection to Machine Learning

KL divergence is widely used in:

- Classification models
- Variational autoencoders
- Language models
- Bayesian inference
- Knowledge distillation
- Reinforcement learning

It is closely related to cross-entropy:

$$
H(P,Q)=H(P)+D_{\mathrm{KL}}(P\|Q)
$$

When the true distribution $P$ is fixed, its entropy $H(P)$ is also fixed. Therefore, minimizing cross-entropy is equivalent to minimizing the KL divergence between the true distribution and the model prediction.

## Summary

KL divergence measures how much information is lost when one probability distribution is used to approximate another. It is especially useful for comparing a model's predicted probability distribution with a target or true distribution.
