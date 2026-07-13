---
title: "Regex first, LLM fallback: a document extraction pattern that cut our API cost 92%"
date: 2026-05-18
slug: "regex-first-llm-fallback"
number: 13
tags: [automation, python]
dek: "Deterministic where possible, probabilistic where necessary."
draft: false
---

## Problem

Freight forwarder and supplier emails carry a dozen reference types — PO
numbers, invoice numbers, container numbers, HAWB, vessel names. Sending every
email to an LLM works, but at volume the cost and latency are hard to justify
for fields that follow rigid formats.

## Background

Most reference types are near-regular languages. A container number is four
letters and seven digits with a check digit; an Australian PO in our system is
a fixed prefix plus six digits. The hard residue is the unstructured 10–15% —
references buried in prose, typos, or scanned attachments.

## Analysis

The pattern that held up in production: a regex pass extracts everything
matching a validated format, and only documents with *missing expected fields*
escalate to the LLM, with the regex hits included in the prompt as context.
Results land in a tall SQLite table keyed by document hash, so re-processing
is idempotent.

## Recommendation

Treat the LLM as the exception handler, not the parser. Every field that can
be validated deterministically should be, because a regex never hallucinates
a PO number.

## Lessons learned

The 92% cost reduction was pleasant but the real win was auditability: when a
planner asks *where did this number come from*, "line 3, pattern PO-\d{6}" is
a better answer than "the model said so".
