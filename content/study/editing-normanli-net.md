---
title: "Editing normanli.net — Publishing Workflow"
description: "How to write, edit, and publish content on my personal knowledge site."
date: 2026-07-13
tags:
  - meta
  - workflow
---

Quick reference for maintaining the blog at [normanli.net](https://normanli.net).

## Tech stack

- **Static site:** Hugo (v0.68.3 locally, newer on Cloudflare)
- **Hosting:** Cloudflare Pages (auto-deploys from GitHub)
- **Repo:** `normanli33/blog.normanli.net` (master branch)
- **Theme:** Custom minimal (content-first design, inspired by Simon Willison)
  - Muted terracotta accent (`--accent: #b8543a`), warm cream background
  - Narrow reading width (720px), chronological entry stream
  - System `prefers-color-scheme` for dark mode (no toggle)
  - Serif body (`Source Serif 4`), sans headings (`Manrope`)
  - Self-hosted fonts (9 TTF files, no CDN calls)

## Content sections

| Section | URL | What goes there |
|---------|-----|-----------------|
| `analysis/` | `/analysis/...` | Long-form deep dives |
| `projects/` | `/projects/...` | Project case studies |
| `knowledge/` | `/knowledge/...` | Short reference concepts |
| `study/` | `/study/...` | Course / personal study notes |
| `about/` | `/about/` | Single about page |

## Style reference

- **Homepage:** Intro paragraph + chronological stream of recent entries (no hero, no cards, no CTA)
- **Article page:** Date, reading time, section, tags → title → serif body content (no TOC, no author aside)
- **Listing page:** Section title + description → chronological entry stream with dates on the left

## Quick edit (fix a typo)

```bash
cd ~/blog.normanli.net
vim content/analysis/forecast-bias.md   # edit the file
hugo --minify                           # verify it builds
git add -A && git commit -m "Fix typo" && git push
```

Cloudflare auto-deploys in ~30 seconds.

## Writing a new article

```bash
hugo new analysis/your-topic.md     # creates from archetype
# or create manually:
vim content/study/new-course.md
```

## Required frontmatter

```yaml
---
title: "Your Title"
description: "One-line summary shown on listing cards and in search."
date: 2026-07-13
tags:
  - forecasting
  - inventory
---
```

Tags generate the pill badges on listing cards and feed `/tags/` pages. No tags = card falls back to section name.

## Build + preview locally

```bash
hugo --minify          # builds to public/
hugo server            # dev server at localhost:1313 (live reload)
```

## Full deploy loop

```bash
cd ~/blog.normanli.net
hugo --minify          # always verify first
git add -A
git commit -m "Brief description of changes"
git push               # Cloudflare auto-deploys master branch
```

## What NOT to do

- **Don't edit `public/`** — it's build output, overwritten on every `hugo` run.
- **Don't use Cloudflare dashboard for content changes** — they'll be overwritten by next deploy.
- **Don't edit theme HTML/CSS** unless changing the design. Most content edits are just markdown files.

## Pro tips

- The CSS file is at `static/css/main.css` — self-hosted fonts, no Google Fonts calls.
- All font files are at `static/fonts/` (9 TTF files: Manrope, Source Serif 4, DM Mono).
- Config is `config.toml` (renamed from `hugo.toml` for local Hugo v0.68.3 compatibility).
