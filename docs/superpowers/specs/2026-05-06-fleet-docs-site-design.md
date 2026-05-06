# Fleet Management FYP — Modern Documentation Site Design

**Date:** 2026-05-06
**Repo:** https://github.com/SYD-Taha/fleet-management-docs
**Author:** Syed Taha (FYP author)
**Status:** Approved (pending final spec review)

---

## 1. Goals

Replace the current broken GitHub Pages setup (a single `index.html` linking to a non-functional PDF) with a modern, searchable, mobile-friendly documentation site for the AI-Powered Fleet Management and Visibility System FYP thesis.

Primary outcomes:
- Readable on any device, with deep links per chapter and section
- Fast full-text search across the whole thesis
- Looks like a polished product doc site, not a uploaded `.tex` dump
- Original PDF + demo video remain accessible
- Deployable from the same GitHub repo via GitHub Actions to GitHub Pages

## 2. Source Material

LaTeX project under `Final_Year_Project_Thesis_Template__University_of_Sargodha/`:

- **Frontmatter:** title page, copyright, dedication, certificate, acknowledgments, declaration, abstract, contents, lists of figures/tables, acronyms, symbols
- **Chapters (9):**
  1. Introduction (~247 lines)
  2. Literature Review (~31 lines)
  3. System Description (~360 lines)
  4. Hardware (~375 lines)
  5. Backend
  6. Frontend
  7. Artificial Intelligence (~352 lines)
  8. Vehicle Simulator (~339 lines)
  9. Conclusions and Future Work (~46 lines)
- **Backmatter:** appendix, bibliography (`bibliography.bib`)
- **Figures:** ~73 images across `chapter*/figs/` and `backmatter/figs/`

Additional assets:
- `Ai_Powered_Fleet_Management_and_Visibility_System.pdf` — original compiled PDF
- `Ai powered Fleet Management and Visibility Video.mp4` — 385 MB demo video (will not be hosted in repo; YouTube unlisted)

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Docusaurus 3** (TypeScript config) | Best default theme, MDX, sidebar/versioning native, Pages-ready |
| Math | `remark-math` + `rehype-katex` (KaTeX) | Thesis has equations |
| Search | `@easyops-cn/docusaurus-search-local` | Free, no signup, indexes content at build |
| Styling | Docusaurus Infima CSS variables + custom `custom.css` | No Tailwind needed; smaller surface |
| Conversion | Pandoc (`latex → gfm+tex_math_dollars`) | Industry standard, ~90% accurate |
| Hosting | GitHub Pages | Free, already configured |
| CI/CD | GitHub Actions (`peaceiris/actions-gh-pages` or official Pages action) | Standard pattern |

## 4. Aesthetic — "Mintlify-style"

- **Layout:** 3-column on desktop — left sidebar nav, center content (max ~720 px), right "On this page" outline
- **Typography:** Inter (UI/body) + JetBrains Mono (code). Slightly compact line-height. Sharp, modern.
- **Color:** Deep indigo / electric blue primary (`#4F46E5`-ish). Accent gradient on hero. Dark-mode default with light-mode toggle.
- **Components:**
  - Hero with gradient background + title + abstract excerpt + CTA buttons (Read docs / Watch demo / Download PDF)
  - Card grid for chapter navigation on landing page
  - Callouts: note / tip / warning / info (Docusaurus admonitions, restyled)
  - Copy-to-clipboard on code blocks
  - Backdrop-blur sticky header with prominent search

## 5. Site Map

```
/                       Landing — hero, abstract, 9 chapter cards, demo video, team, PDF download
/docs/introduction      Chapter 1
/docs/literature-review Chapter 2
/docs/system-description Chapter 3
/docs/hardware          Chapter 4
/docs/backend           Chapter 5
/docs/frontend          Chapter 6
/docs/ai                Chapter 7
/docs/vehicle-simulator Chapter 8
/docs/conclusions       Chapter 9
/docs/references        Generated from bibliography.bib
/docs/appendix          Backmatter
/demo                   Embedded demo video + brief context
/download               Direct PDF download (and optional video download)
```

Frontmatter pages (acknowledgments, declaration, certificate) live as collapsible "About this thesis" sub-section in sidebar.

## 6. Conversion Pipeline (one-time, scripted)

A `scripts/convert.mjs` (or shell script) that:

1. For each `chapterN/*.tex`:
   - Run `pandoc <file> -f latex -t gfm+tex_math_dollars --wrap=none -o docs/<slug>.md`
   - Inject Docusaurus frontmatter (`title`, `sidebar_position`, `description`)
2. Copy `chapterN/figs/*` → `static/img/<slug>/` and rewrite image paths in markdown
3. Run `pandoc backmatter/bibliography.tex --citeproc --bibliography=bibliography.bib -t gfm -o docs/references.md`
4. Convert appendix similarly
5. Hand-clean pass: fix custom LaTeX commands Pandoc misses (e.g. project-specific macros from `packages.sty`), table layouts, equation labels, captions

Original LaTeX preserved in `thesis-source/` (renamed from current folder).

## 7. Demo Video Hosting

- **Decision:** YouTube Unlisted upload (file is 385 MB — exceeds GitHub's 100 MB/file limit)
- **Embed:** standard YouTube iframe in `/demo` page and on landing page hero (click-to-play, not autoplay)
- **User action required:** upload video to YouTube as Unlisted, provide URL. Site builds with placeholder until URL provided.
- **Fallback:** if user prefers not to use YouTube, attach `.mp4` as a GitHub Release asset and link as download (no inline player).

## 8. PDF Handling

- Move `Ai_Powered_Fleet_Management_and_Visibility_System.pdf` → `static/pdf/fleet-management-thesis.pdf`
- Link from landing page hero ("Download PDF") and `/download`
- Investigate why current Pages serve fails:
  - If file >100 MB: use GitHub Release asset, link out
  - If LFS pointer: either remove from LFS and commit raw, or host externally
  - Verify Pages source branch/folder configuration

## 9. Repository Layout (post-migration)

```
fleet-management-docs/
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
├── tsconfig.json
├── docs/                       # converted Markdown chapters
│   ├── introduction.md
│   ├── literature-review.md
│   ├── ... (9 chapters)
│   ├── references.md
│   └── appendix.md
├── src/
│   ├── pages/
│   │   ├── index.tsx           # custom landing
│   │   ├── demo.tsx            # video page
│   │   └── download.tsx
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── ChapterCard.tsx
│   │   └── VideoEmbed.tsx
│   └── css/
│       └── custom.css          # Mintlify-style overrides
├── static/
│   ├── img/                    # all figures from LaTeX
│   └── pdf/
│       └── fleet-management-thesis.pdf
├── scripts/
│   └── convert-latex.mjs       # one-time LaTeX→MD converter
├── thesis-source/              # original LaTeX, kept for reference
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md                   # rewritten — project info + dev instructions
└── .gitignore
```

## 10. Deployment

GitHub Actions workflow on push to `main`:

1. Checkout
2. Setup Node 20
3. `npm ci`
4. `npm run build`
5. Deploy `build/` to GitHub Pages (official `actions/deploy-pages`)

Custom domain optional — keeps current `*.github.io` URL by default.

## 11. Out of Scope (this iteration)

- Versioning (single version only)
- i18n / multiple languages
- Blog section
- Comments / discussions
- Algolia DocSearch (using local search instead)
- Analytics (can add later)

## 12. Open Items / User Actions

- [ ] Upload demo video to YouTube as Unlisted, share URL
- [ ] Confirm whether the existing PDF is in Git LFS or just oversized (will check during execution)
- [ ] Confirm primary accent color preference (default: indigo `#4F46E5`)
- [ ] Provide team member names + roles for landing page (or omit "team" section)

## 13. Success Criteria

- Site loads on `https://syd-taha.github.io/fleet-management-docs/` (or chosen URL)
- All 9 chapters readable with proper figures, equations, tables
- Search bar finds content across chapters
- Mobile-friendly (looks correct on phone)
- Dark/light mode both work
- PDF download link works
- Demo video embed works (once URL provided)
- Lighthouse Performance ≥ 90, Accessibility ≥ 95
