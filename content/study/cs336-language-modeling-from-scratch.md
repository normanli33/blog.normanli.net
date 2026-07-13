---
title: "CS336 — Language Modeling from Scratch"
description: "Stanford course on building a language model from scratch — data, architecture, training, scaling, alignment."
date: 2026-07-13
tags:
  - deep-learning
  - nlp
  - transformers
  - llm
---

**Course:** [Stanford CS336](https://cs336.stanford.edu/) — Spring 2026  
**Instructors:** Percy Liang & Tatsunori Hashimoto  
**Unit value:** 5 units — implementation-heavy

> "We will lead students through every aspect of language model creation, including data collection and cleaning for pre-training, transformer model construction, model training, and evaluation before deployment."

## Prerequisites

- Proficiency in Python (minimal scaffolding, order-of-magnitude more code than typical AI classes)
- PyTorch + systems concepts (memory hierarchy, GPU efficiency)
- Calculus, Linear Algebra, Probability
- Machine Learning (CS221/CS229/CS224N or equivalent)

## Assignments

| # | Topic | Key Skills |
|---|-------|------------|
| 1 | Basics | Tokenisation, embeddings, transformer forward pass |
| 2 | Systems | Kernel optimisation, memory-efficient attention, distributed training |
| 3 | Scaling | Multi-GPU training, pipeline & tensor parallelism |
| 4 | Data | Data collection, cleaning, deduplication, mixing strategies |
| 5 | Alignment & RL | RLHF, DPO, reasoning-oriented RL |

## Logistics

- **Lectures:** Mon/Wed 3:00–4:20pm PT (Skilling Auditorium)
- **Recordings:** [YouTube playlist](https://www.youtube.com/playlist?list=PLoROMvodv4rOwGM7CItm7WzqBR4Y9J1xL)
- **GPU:** Cloud compute for self-study (follow-along at home)

## Why this course matters

Most LLM courses treat the model as a black box API. CS336 is the opposite — you implement everything from scratch, mirroring the approach of an OS course where you build a full operating system. This gives you:

- Deep intuition for why transformers work the way they do
- Hands-on experience with distributed training infra
- Ability to reason about data quality and scaling decisions
- Foundation to build, fine-tune, or debug real production models

## Resource links

- [Course website](https://cs336.stanford.edu/)
- [Previous offerings drop-down for past materials](https://cs336.stanford.edu/)
- [Stanford NLP Group](https://nlp.stanford.edu/)
- [Stanford CRFM](https://crfm.stanford.edu/)
