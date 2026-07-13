---
title: "A Demand Planner's Guide to LLM Evals"
date: 2026-06-18
categories: ["AI"]
tags: ["ai", "python"]
summary: "Evaluating a prompt change is a forecasting problem in disguise: you need a baseline, a held-out test set, and a way to tell signal from noise."
---

## Background

I started using an LLM to draft first-pass exception explanations for a forecast override queue — "why did the system flag this SKU." The first version was fine. The tenth version, after ten rounds of prompt tweaks, was also "fine," and I had no way to tell if it was actually better than the first.

That's a forecasting problem wearing a different hat: you need a baseline, a held-out test set, and a way to separate real improvement from noise.

## Building an eval harness

The harness is intentionally boring. A fixed set of 40 real exception cases, each with a human-written "acceptable explanation," scored by a rubric instead of vibes:

```python
def score_explanation(candidate: str, rubric: dict) -> float:
    checks = [
        rubric["mentions_driver"](candidate),
        rubric["correct_direction"](candidate),
        rubric["no_hallucinated_numbers"](candidate),
    ]
    return sum(checks) / len(checks)

results = [score_explanation(run(prompt, case), RUBRIC) for case in test_cases]
print(f"Mean score: {sum(results) / len(results):.2f}")
```

Every prompt change runs against the same 40 cases before it ships. No exceptions, including for changes that "obviously" help.

## What actually moved the needle

Two things mattered far more than clever prompt phrasing:

1. **Giving the model the actual override history**, not just the current exception — most "hallucinated" explanations were really just missing context.
2. **Splitting one long instruction into a checklist** the model could work through, rather than one paragraph of requirements.

What didn't matter: reordering the same instructions, adding more adjectives about tone, or switching phrasing that "felt" more precise. The eval set caught this every time — several changes that read better on the page scored the same or worse.

## Takeaways

- Treat prompt changes like forecast model changes: measure against a fixed test set, not against your own read of a few examples.
- Most quality problems trace back to missing context, not phrasing.
- A boring, unglamorous eval harness beats an elegant prompt you can't actually validate.
