---
title: "LLM Eval Harness"
cluster: "AI & Data"
definition: "A repeatable test set and scoring rubric for checking whether a prompt or model change actually improved output quality, rather than just reading differently."
tags: ["ai", "python"]
---

## Example

A fixed set of representative inputs, each with a rubric of pass/fail checks rather than a single subjective quality score:

```python
RUBRIC = {
    "mentions_driver": lambda text: "because" in text.lower(),
    "correct_direction": lambda text: expected_direction in text,
    "no_hallucinated_numbers": lambda text: not contains_unverified_number(text),
}
```

Every candidate prompt runs against the same fixed set before it ships, so a change is judged against a stable baseline instead of a handful of examples that happened to look good.
