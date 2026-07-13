# Norman Li — personal knowledge system

A Hugo-based professional knowledge base and portfolio for supply chain, analytics, and applied AI.

## Run locally

1. Install Hugo Extended 0.120 or newer.
2. Run `hugo server -D` from this directory.
3. Open `http://localhost:1313`.

Create a production build with `hugo --minify`. The generated `public/` directory can be deployed directly to Cloudflare Pages; use `hugo --minify` as the build command and `public` as the output directory.

## Before publishing

- Replace `normanli.dev` in `hugo.toml` with the final domain.
- Replace the placeholder email and LinkedIn/GitHub links in the layouts.
- Self-host the fonts or replace the Google Fonts import.
- Add the real resume and downloadable project assets.
- Add social preview images and analytics configuration.

The full information architecture, page wireframes, design tokens, user journeys, component inventory, responsive rules, and expansion plan are in [DESIGN.md](DESIGN.md).
