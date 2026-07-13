# Norman Li knowledge system

## Product position

This is a professional knowledge system, not a chronological blog. The primary promise is: **structured thinking that turns operational complexity into clear decisions**.

## Information architecture

- Home — positioning, proof, selected work, connected topics, latest thinking, contact
- Analysis — durable long-form reasoning grouped by Supply Chain, Forecasting, Business Analysis, Data, AI, Python, SQL, Power BI, Finance, and Health Data
- Projects — outcome-oriented case studies following Problem → Background → Data → Methodology → Analysis → Results → Lessons
- Knowledge base — short, interlinked concept pages with definitions, examples, references, and backlinks
- Notes — smaller observations and learning logs; intentionally secondary in navigation
- About — biography, principles, timeline, skills, certificates, stack, roadmap, and resume
- Contact — lightweight direct contact and professional profiles

## Core journeys

1. Recruiter: Home → selected case study → About → resume/contact.
2. Practitioner: Search/topic → knowledge definition → related analysis → project evidence.
3. Returning reader: Latest analysis → related concepts → next article.
4. Collaborator: Home positioning → project methodology → contact.

## Page wireframes

### Home

`Sticky navigation → positioning hero → credibility strip → selected work (1 large + 2 compact) → connected knowledge topics → latest analysis → focused CTA → footer`

### Article

`Reading progress → breadcrumb/metadata → title + thesis → sticky TOC | readable article | author context → references → previous/next → related work`

### Project

`Outcome-led hero → constraints/role/tools → problem → evidence/method → visuals → measurable result → lessons → repository/downloads`

### Knowledge topic

`Definition → concise example → deeper explanation → related topic graph → articles using concept → references`

### About

`Professional thesis → approach → experience timeline → principles → skills/certificates → learning roadmap → resume + profiles`

## Design system

- Type: Manrope for interface and headlines, Source Serif 4 for long reading, DM Mono for metadata and code.
- Scale: display 54–108px, page title 44–76px, section title 36–60px, body 16px, reading body 18px.
- Colour: off-white `#f8f9fb`, white `#ffffff`, ink `#111827`, slate `#657084`, line `#dfe3ea`, blue `#2864dc`; complete dark-mode tokens are defined alongside them.
- Spacing: 4px base, with primary intervals at 8, 12, 16, 24, 36, 56, and 90px.
- Radius: 8–14px for controls/cards; 20px reserved for major campaign surfaces.
- Motion: 200ms feedback only; disabled under reduced-motion preferences.

## Component library

Global navigation, mobile navigation, command search, theme toggle, buttons, tags, metadata rows, feature cards, listing cards, topic rows, article rows, CTA panel, breadcrumbs, reading progress, sticky TOC, author card, prose tables, callouts, code treatments, and footer.

## Responsive behaviour

- Mobile-first tap targets and linear reading order.
- At 900px, navigation collapses, cards stack, and article side rails become inline/hidden.
- At 600px, display scale compresses, actions become full-width, and metadata reflows.
- Content remains usable at 320px without horizontal page scrolling.

## Accessibility and performance

- Semantic landmarks, skip link, keyboard search, visible focus behaviour, AA-oriented tokens, reduced-motion support, and no interaction that requires hover.
- Static Hugo output, minimal dependency-free JavaScript, native lazy loading for future images, generated JSON search index, RSS, sitemap, canonical URLs, and responsive layouts.
- Self-host the three font families before production to remove the Google Fonts request and improve privacy/performance.

## Expansion roadmap

1. Replace sample profile/contact links and add a real resume.
2. Add taxonomies and richer related-content logic using Hugo page references.
3. Add Fuse.js ranking, autocomplete highlighting, and a generated backlink graph.
4. Add Mermaid and KaTeX only on pages that request them through front matter.
5. Add responsive image render hooks and an image lightbox.
6. Add project download/repository components and reusable chart embeds.
7. Add schema.org Article/Person/Breadcrumb JSON-LD and full Open Graph assets.
8. Add Cloudflare Web Analytics and a Lighthouse CI budget.
9. Add PlantUML as an optional pre-build step rather than a client-side dependency.
