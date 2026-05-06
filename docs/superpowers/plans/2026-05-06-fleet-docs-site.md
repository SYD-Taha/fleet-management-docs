# Fleet Management Docs Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken single-page GitHub Pages setup at https://github.com/SYD-Taha/fleet-management-docs with a modern Docusaurus 3 documentation site styled in a Mintlify-like aesthetic, sourced from the existing LaTeX thesis.

**Architecture:** Docusaurus 3 (TypeScript) with KaTeX for math, local-search plugin for full-text search, custom React components for the landing/demo/download pages, and GitHub Actions deploying to GitHub Pages. The 9 LaTeX chapters are converted to Markdown via Pandoc using a one-time script, then hand-cleaned. The 385 MB demo video is hosted on YouTube (Unlisted) and embedded.

**Tech Stack:** Node 20, Docusaurus 3, TypeScript, MDX, KaTeX (`remark-math` + `rehype-katex`), `@easyops-cn/docusaurus-search-local`, Pandoc, GitHub Actions.

**Working directory:** `d:/Studies/FYP/doc site/` (also referred to as the project root). LaTeX source currently in `Final_Year_Project_Thesis_Template__University_of_Sargodha/`; will be renamed to `thesis-source/` in Task 1.

**Prerequisites the engineer must install:**
- Node.js 20+ (`node --version`)
- npm 10+
- Pandoc 3.x (`pandoc --version`) — https://pandoc.org/installing.html
- Git

---

## File Structure (final state)

```
fleet-management-docs/
├── docusaurus.config.ts       # site config, plugins, theme
├── sidebars.ts                # sidebar definition
├── tsconfig.json
├── package.json
├── package-lock.json
├── docs/
│   ├── intro.md               # converted Chapter 1
│   ├── literature-review.md
│   ├── system-description.md
│   ├── hardware.md
│   ├── backend.md
│   ├── frontend.md
│   ├── ai.md
│   ├── vehicle-simulator.md
│   ├── conclusions.md
│   ├── references.md
│   └── appendix.md
├── src/
│   ├── pages/
│   │   ├── index.tsx          # custom landing
│   │   ├── demo.tsx           # video page
│   │   └── download.tsx
│   ├── components/
│   │   ├── Hero/index.tsx
│   │   ├── Hero/styles.module.css
│   │   ├── ChapterCard/index.tsx
│   │   ├── ChapterCard/styles.module.css
│   │   └── VideoEmbed/index.tsx
│   └── css/
│       └── custom.css         # Mintlify-style overrides
├── static/
│   ├── img/                   # all figures (one subfolder per chapter)
│   └── pdf/
│       └── fleet-management-thesis.pdf
├── scripts/
│   └── convert-latex.mjs      # one-time LaTeX→Markdown converter
├── thesis-source/             # original LaTeX preserved for reference
├── .github/
│   └── workflows/
│       └── deploy.yml
├── README.md
├── .gitignore
└── docs/superpowers/          # this spec & plan (kept in repo)
```

---

## Task 1: Initialize repo structure and Docusaurus scaffold

**Files:**
- Create: `package.json`, `docusaurus.config.ts`, `sidebars.ts`, `tsconfig.json`, `.gitignore`
- Modify: rename `Final_Year_Project_Thesis_Template__University_of_Sargodha/` → `thesis-source/`
- Delete: `index.html` (the broken single-page site)

- [ ] **Step 1: Verify project root and back up current state**

Run from `d:/Studies/FYP/doc site/`:
```powershell
git status
```
Expected: clean tree or only the spec/plan additions tracked. If repo not initialized, run `git init && git add docs/ && git commit -m "chore: add design spec and plan"`.

- [ ] **Step 2: Rename LaTeX folder to `thesis-source/`**

```powershell
Rename-Item "Final_Year_Project_Thesis_Template__University_of_Sargodha" "thesis-source"
```
Verify: `Test-Path thesis-source/main.tex` returns `True`.

- [ ] **Step 3: Initialize npm project**

```powershell
npm init -y
```

- [ ] **Step 4: Install Docusaurus 3 core dependencies**

```powershell
npm install @docusaurus/core@^3.6.0 @docusaurus/preset-classic@^3.6.0 @mdx-js/react@^3.0.0 react@^18.0.0 react-dom@^18.0.0 clsx@^2.0.0 prism-react-renderer@^2.3.0
```

- [ ] **Step 5: Install dev dependencies (TypeScript, types)**

```powershell
npm install --save-dev @docusaurus/module-type-aliases@^3.6.0 @docusaurus/tsconfig@^3.6.0 @docusaurus/types@^3.6.0 typescript@^5.4.0 @types/react@^18.0.0
```

- [ ] **Step 6: Install math (KaTeX) and local-search plugins**

```powershell
npm install remark-math@^6.0.0 rehype-katex@^7.0.0
npm install @easyops-cn/docusaurus-search-local@^0.45.0
```

- [ ] **Step 7: Add `katex` CSS dependency**

```powershell
npm install katex@^0.16.0
```

- [ ] **Step 8: Create `package.json` scripts section**

Open `package.json` and replace the `scripts` field with:
```json
"scripts": {
  "docusaurus": "docusaurus",
  "start": "docusaurus start",
  "build": "docusaurus build",
  "swizzle": "docusaurus swizzle",
  "deploy": "docusaurus deploy",
  "clear": "docusaurus clear",
  "serve": "docusaurus serve",
  "convert": "node scripts/convert-latex.mjs",
  "typecheck": "tsc"
}
```

- [ ] **Step 9: Create `tsconfig.json`**

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    "baseUrl": "."
  },
  "exclude": [".docusaurus", "build"]
}
```

- [ ] **Step 10: Create `.gitignore`**

```
# Dependencies
node_modules/
# Build output
build/
.docusaurus/
.cache-loader/
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.vscode/
.idea/
```

- [ ] **Step 11: Delete the broken `index.html`**

```powershell
Remove-Item index.html -ErrorAction SilentlyContinue
```

- [ ] **Step 12: Commit**

```powershell
git add package.json package-lock.json tsconfig.json .gitignore; git rm -f index.html 2>$null; git mv "Final_Year_Project_Thesis_Template__University_of_Sargodha" thesis-source 2>$null; if ($?) { git commit -m "chore: scaffold Docusaurus 3 project; rename LaTeX folder to thesis-source" }
```

(If git mv fails because the rename was done outside git, just `git add -A` the rename and commit.)

---

## Task 2: Create base Docusaurus configuration

**Files:**
- Create: `docusaurus.config.ts`, `sidebars.ts`
- Create: `docs/intro.md` (placeholder so Docusaurus boots)

- [ ] **Step 1: Create `docusaurus.config.ts`**

```ts
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI Powered Fleet Management',
  tagline: 'Final Year Project — University of Karachi, 2025',
  favicon: 'img/favicon.ico',

  url: 'https://syd-taha.github.io',
  baseUrl: '/fleet-management-docs/',
  organizationName: 'SYD-Taha',
  projectName: 'fleet-management-docs',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  markdown: { mermaid: false },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          remarkPlugins: [(await import('remark-math')).default],
          rehypePlugins: [(await import('rehype-katex')).default],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Fleet Management',
      logo: { alt: 'Logo', src: 'img/logo.svg' },
      items: [
        { type: 'docSidebar', sidebarId: 'thesisSidebar', position: 'left', label: 'Documentation' },
        { to: '/demo', label: 'Demo', position: 'left' },
        { to: '/download', label: 'Download', position: 'left' },
        { href: 'https://github.com/SYD-Taha/fleet-management-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'References', to: '/docs/references' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'Demo Video', to: '/demo' },
            { label: 'Download PDF', to: '/download' },
            { label: 'GitHub', href: 'https://github.com/SYD-Taha/fleet-management-docs' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Syed Taha Jameel, Rimsha Masood, Saman Aslam, Zoya Ali. University of Karachi.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

- [ ] **Step 2: Create `sidebars.ts`**

```ts
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  thesisSidebar: [
    'intro',
    'literature-review',
    'system-description',
    'hardware',
    'backend',
    'frontend',
    'ai',
    'vehicle-simulator',
    'conclusions',
    'references',
    'appendix',
  ],
};

export default sidebars;
```

- [ ] **Step 3: Create placeholder `docs/intro.md`**

```markdown
---
sidebar_position: 1
title: Introduction
---

# Introduction

Placeholder — this will be replaced by Task 6 with the converted Chapter 1 content.
```

- [ ] **Step 4: Create `src/css/custom.css` (minimal placeholder, replaced in Task 10)**

```css
:root {
  --ifm-color-primary: #4F46E5;
  --ifm-color-primary-dark: #4338CA;
  --ifm-color-primary-darker: #3730A3;
  --ifm-color-primary-darkest: #312E81;
  --ifm-color-primary-light: #6366F1;
  --ifm-color-primary-lighter: #818CF8;
  --ifm-color-primary-lightest: #A5B4FC;
  --ifm-code-font-size: 95%;
}

[data-theme='dark'] {
  --ifm-color-primary: #818CF8;
  --ifm-color-primary-dark: #6366F1;
  --ifm-color-primary-darker: #4F46E5;
  --ifm-color-primary-darkest: #4338CA;
  --ifm-color-primary-light: #A5B4FC;
  --ifm-color-primary-lighter: #C7D2FE;
  --ifm-color-primary-lightest: #E0E7FF;
}
```

- [ ] **Step 5: Add minimal placeholder assets**

Create `static/img/` directory. Copy any PNG as `static/img/logo.svg` placeholder, OR create a 1×1 SVG:
```powershell
New-Item -ItemType Directory -Force static/img | Out-Null
Set-Content static/img/logo.svg '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4F46E5"/></svg>'
Copy-Item static/img/logo.svg static/img/favicon.ico -ErrorAction SilentlyContinue
```
(A real favicon and social card go in later — placeholder now.)

- [ ] **Step 6: Run dev server and verify it boots**

```powershell
npm run start
```
Expected: opens `http://localhost:3000/fleet-management-docs/` showing default Docusaurus home + the placeholder Intro page.
Expected console: no errors, possibly a warning about missing pages — fine.
Stop server with Ctrl+C.

- [ ] **Step 7: Commit**

```powershell
git add docusaurus.config.ts sidebars.ts docs/ src/ static/
git commit -m "feat: add Docusaurus base config, sidebar, and placeholder content"
```

---

## Task 3: Wire local search plugin

**Files:**
- Modify: `docusaurus.config.ts`

- [ ] **Step 1: Add the search plugin to `docusaurus.config.ts`**

Add a `plugins` field to the config object (after `presets`):
```ts
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcut: true,
        searchBarShortcutHint: true,
      },
    ],
  ],
```

Note: `require.resolve` requires CommonJS interop. If the file is `.ts` ESM, replace with:
```ts
plugins: [['@easyops-cn/docusaurus-search-local', { /* same opts */ }]],
```

- [ ] **Step 2: Build to confirm search index generates**

```powershell
npm run build
```
Expected: build succeeds; output mentions `Generating search index`. Build directory `build/` contains a search index file.

- [ ] **Step 3: Run built site and verify search**

```powershell
npm run serve
```
Open `http://localhost:3000/fleet-management-docs/`. Verify a search box appears in the navbar and typing returns results from the placeholder content.

- [ ] **Step 4: Commit**

```powershell
git add docusaurus.config.ts package.json package-lock.json
git commit -m "feat: enable local full-text search plugin"
```

---

## Task 4: Build the LaTeX → Markdown converter script

**Files:**
- Create: `scripts/convert-latex.mjs`

This is a one-time script that runs Pandoc per chapter, produces Markdown with Docusaurus frontmatter, and copies figures.

- [ ] **Step 1: Verify Pandoc is installed**

```powershell
pandoc --version
```
Expected: `pandoc 3.x.x` or higher.

- [ ] **Step 2: Create `scripts/convert-latex.mjs`**

```js
#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { mkdirSync, copyFileSync, readdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const SRC = 'thesis-source';
const DOCS = 'docs';
const IMG = 'static/img';

const chapters = [
  { src: 'chapter1/Introduction.tex',           slug: 'intro',                title: 'Introduction',         pos: 1 },
  { src: 'chapter2/LiteratureReview.tex',       slug: 'literature-review',    title: 'Literature Review',    pos: 2 },
  { src: 'chapter3/SystemDescription.tex',      slug: 'system-description',   title: 'System Description',   pos: 3 },
  { src: 'chapter4/Hardware.tex',               slug: 'hardware',             title: 'Hardware',             pos: 4 },
  { src: 'chapter5/backend.tex',                slug: 'backend',              title: 'Backend',              pos: 5 },
  { src: 'chapter6/frontend.tex',               slug: 'frontend',             title: 'Frontend',             pos: 6 },
  { src: 'chapter7/Artificial_Intelligence.tex',slug: 'ai',                   title: 'Artificial Intelligence', pos: 7 },
  { src: 'chapter8/Vehicle_Simulator.tex',      slug: 'vehicle-simulator',    title: 'Vehicle Simulator',    pos: 8 },
  { src: 'chapter9/Conclusions_and_FutureWork.tex', slug: 'conclusions',      title: 'Conclusions and Future Work', pos: 9 },
];

mkdirSync(DOCS, { recursive: true });
mkdirSync(IMG, { recursive: true });

for (const ch of chapters) {
  const inFile = join(SRC, ch.src);
  if (!existsSync(inFile)) {
    console.warn(`SKIP missing: ${inFile}`);
    continue;
  }
  const outFile = join(DOCS, `${ch.slug}.md`);
  console.log(`Converting ${inFile} -> ${outFile}`);

  // Run pandoc
  const md = execSync(
    `pandoc "${inFile}" -f latex -t gfm+tex_math_dollars --wrap=none`,
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
  );

  // Copy figs/ to static/img/<slug>/ and rewrite paths
  const srcFigs = join(SRC, ch.src.split('/')[0], 'figs');
  const dstFigs = join(IMG, ch.slug);
  let rewritten = md;
  if (existsSync(srcFigs)) {
    mkdirSync(dstFigs, { recursive: true });
    for (const f of readdirSync(srcFigs)) {
      copyFileSync(join(srcFigs, f), join(dstFigs, f));
    }
    // Rewrite Markdown image refs: figs/foo.png -> /img/<slug>/foo.png
    rewritten = rewritten.replace(/!\[([^\]]*)\]\(([^)]*figs\/)?([^)\/]+)\)/g,
      (_m, alt, _p, fname) => `![${alt}](/img/${ch.slug}/${fname})`);
  }

  const frontmatter = `---\nsidebar_position: ${ch.pos}\ntitle: ${JSON.stringify(ch.title)}\n---\n\n# ${ch.title}\n\n`;
  writeFileSync(outFile, frontmatter + rewritten);
}

// Convert appendix
const appendixIn = join(SRC, 'backmatter/Appendix.tex');
if (existsSync(appendixIn)) {
  const md = execSync(`pandoc "${appendixIn}" -f latex -t gfm+tex_math_dollars --wrap=none`,
    { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  const srcFigs = join(SRC, 'backmatter/figs');
  const dstFigs = join(IMG, 'appendix');
  let rewritten = md;
  if (existsSync(srcFigs)) {
    mkdirSync(dstFigs, { recursive: true });
    for (const f of readdirSync(srcFigs)) copyFileSync(join(srcFigs, f), join(dstFigs, f));
    rewritten = rewritten.replace(/!\[([^\]]*)\]\(([^)]*figs\/)?([^)\/]+)\)/g,
      (_m, alt, _p, fname) => `![${alt}](/img/appendix/${fname})`);
  }
  writeFileSync(join(DOCS, 'appendix.md'),
    `---\nsidebar_position: 11\ntitle: Appendix\n---\n\n# Appendix\n\n` + rewritten);
}

// Convert bibliography to references.md (citeproc emits an HTML/MD bib list)
const bibTex = join(SRC, 'bibliography.bib');
if (existsSync(bibTex)) {
  // Generate a stub document that triggers citeproc to render full bibliography
  const stubTex = `\\nocite{*}`;
  writeFileSync('.tmp_bib_stub.tex', stubTex);
  try {
    const md = execSync(
      `pandoc .tmp_bib_stub.tex --citeproc --bibliography="${bibTex}" -f latex -t gfm --wrap=none`,
      { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }
    );
    writeFileSync(join(DOCS, 'references.md'),
      `---\nsidebar_position: 10\ntitle: References\n---\n\n# References\n\n` + md);
  } finally {
    execSync('del .tmp_bib_stub.tex', { stdio: 'ignore' });
  }
}

console.log('Done. Review docs/*.md and clean up any LaTeX-isms.');
```

- [ ] **Step 3: Make `scripts/` directory and run a dry test (optional)**

```powershell
node --check scripts/convert-latex.mjs
```
Expected: no syntax errors.

- [ ] **Step 4: Commit (script only — output runs in next task)**

```powershell
git add scripts/convert-latex.mjs
git commit -m "feat: add Pandoc-based LaTeX-to-Markdown converter script"
```

---

## Task 5: Run conversion and inspect Chapter 1 (Introduction)

**Files:**
- Create: `docs/intro.md` (overwrite placeholder), figures under `static/img/intro/`

- [ ] **Step 1: Run the converter**

```powershell
npm run convert
```
Expected: console logs `Converting thesis-source/chapter1/Introduction.tex -> docs/intro.md` for all 9 chapters plus appendix and references. No fatal errors.

- [ ] **Step 2: Inspect `docs/intro.md`**

Open the file. Look for:
- LaTeX commands Pandoc didn't translate (e.g. `\citep{...}`, `\ref{...}`, custom macros)
- Broken table layouts (HTML tables are fine)
- Figures with placeholder paths

- [ ] **Step 3: Hand-clean Chapter 1**

For each issue, edit the markdown directly:
- Replace unresolved `\citep{key}` with `[^key]` and add a footnote at end of file referencing the citation, or remove if unrecoverable.
- Replace unresolved `\ref{...}` with the section title link or strip.
- For inline math that wasn't converted, wrap manually in `$...$` (KaTeX delimiter).
- Verify each `![alt](/img/intro/...)` path matches a file in `static/img/intro/`.

- [ ] **Step 4: Run dev server and visit `/docs/intro`**

```powershell
npm run start
```
Open `http://localhost:3000/fleet-management-docs/docs/intro`. Verify:
- Headings render correctly
- Images load
- Math (if any) renders via KaTeX
- No broken-link warnings in terminal

- [ ] **Step 5: Commit**

```powershell
git add docs/intro.md static/img/intro/
git commit -m "feat: convert and clean Chapter 1 (Introduction)"
```

---

## Task 6: Hand-clean Chapters 2–5

**Files:**
- Modify: `docs/literature-review.md`, `docs/system-description.md`, `docs/hardware.md`, `docs/backend.md`
- Modify: figures under `static/img/{literature-review,system-description,hardware,backend}/`

- [ ] **Step 1: Open `docs/literature-review.md` and clean per same rules as Task 5**

Same pass: citations, refs, equations, image paths, table sanity.

- [ ] **Step 2: Verify in dev server**

Visit `/docs/literature-review`. Confirm renders cleanly.

- [ ] **Step 3: Repeat for `system-description.md`**

Larger chapter (360 lines) — pay special attention to architecture diagrams (figures), system component tables, and any sub-section structure.

- [ ] **Step 4: Verify `system-description` renders**

Visit `/docs/system-description`. Confirm.

- [ ] **Step 5: Repeat for `hardware.md`**

This chapter has the most figures (21). Sanity-check every image path.

- [ ] **Step 6: Verify `hardware` renders**

Visit `/docs/hardware`. Scroll the whole page. Confirm all 21 figures load.

- [ ] **Step 7: Repeat for `backend.md`**

Likely contains code blocks (REST/MQTT examples). Ensure code fences are intact and language tags applied where helpful (` ```js`, ` ```python`, etc.).

- [ ] **Step 8: Verify `backend` renders**

Visit `/docs/backend`. Confirm.

- [ ] **Step 9: Commit**

```powershell
git add docs/ static/img/
git commit -m "feat: convert and clean Chapters 2-5"
```

---

## Task 7: Hand-clean Chapters 6–9

**Files:**
- Modify: `docs/frontend.md`, `docs/ai.md`, `docs/vehicle-simulator.md`, `docs/conclusions.md`
- Modify: figures under matching `static/img/<slug>/` folders

- [ ] **Step 1: Clean `frontend.md`** — same pass; expect React component snippets and UI screenshots.

- [ ] **Step 2: Verify** — visit `/docs/frontend`.

- [ ] **Step 3: Clean `ai.md`** — pay attention to ML equations (KaTeX) and feature/algorithm tables. The chapter references RandomForest model details and weighted scoring formulas.

- [ ] **Step 4: Verify** — visit `/docs/ai`.

- [ ] **Step 5: Clean `vehicle-simulator.md`** — likely has MQTT message diagrams and code.

- [ ] **Step 6: Verify** — visit `/docs/vehicle-simulator`.

- [ ] **Step 7: Clean `conclusions.md`** — short chapter; quick pass.

- [ ] **Step 8: Verify** — visit `/docs/conclusions`.

- [ ] **Step 9: Commit**

```powershell
git add docs/ static/img/
git commit -m "feat: convert and clean Chapters 6-9"
```

---

## Task 8: Clean references and appendix

**Files:**
- Modify: `docs/references.md`, `docs/appendix.md`
- Modify: figures under `static/img/appendix/`

- [ ] **Step 1: Inspect `docs/references.md`**

The output of `pandoc --citeproc` produces a `<div class="references">` block per entry. Verify each bibliography entry rendered. If formatting is ugly, switch the CSL style by adding `--csl=ieee.csl` (download from https://github.com/citation-style-language/styles) and re-running.

- [ ] **Step 2: Clean `docs/appendix.md`**

Same hand-clean rules as chapter pages.

- [ ] **Step 3: Verify both render**

Visit `/docs/references` and `/docs/appendix`. Confirm.

- [ ] **Step 4: Commit**

```powershell
git add docs/references.md docs/appendix.md static/img/appendix/
git commit -m "feat: add references and appendix pages"
```

---

## Task 9: Apply Mintlify-style custom CSS

**Files:**
- Modify: `src/css/custom.css`

- [ ] **Step 1: Replace `src/css/custom.css` with Mintlify-style overrides**

```css
/* Mintlify-style overrides for Docusaurus 3 */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --ifm-font-family-base: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --ifm-font-family-monospace: 'JetBrains Mono', 'SF Mono', Menlo, monospace;

  --ifm-color-primary: #4F46E5;
  --ifm-color-primary-dark: #4338CA;
  --ifm-color-primary-darker: #3730A3;
  --ifm-color-primary-darkest: #312E81;
  --ifm-color-primary-light: #6366F1;
  --ifm-color-primary-lighter: #818CF8;
  --ifm-color-primary-lightest: #A5B4FC;

  --ifm-background-color: #FFFFFF;
  --ifm-background-surface-color: #F9FAFB;

  --ifm-heading-font-weight: 700;
  --ifm-h1-font-size: 2.25rem;
  --ifm-h2-font-size: 1.625rem;
  --ifm-h3-font-size: 1.25rem;
  --ifm-line-height-base: 1.65;

  --ifm-code-font-size: 92%;
  --ifm-code-background: rgba(79, 70, 229, 0.08);
  --ifm-code-padding-horizontal: 0.35rem;
  --ifm-code-padding-vertical: 0.15rem;

  --ifm-navbar-background-color: rgba(255, 255, 255, 0.85);
  --ifm-navbar-shadow: 0 1px 0 rgba(0,0,0,0.06);

  --ifm-toc-border-color: transparent;
  --docsearch-primary-color: var(--ifm-color-primary);
}

[data-theme='dark'] {
  --ifm-color-primary: #818CF8;
  --ifm-color-primary-dark: #6366F1;
  --ifm-color-primary-darker: #4F46E5;
  --ifm-color-primary-darkest: #4338CA;
  --ifm-color-primary-light: #A5B4FC;
  --ifm-color-primary-lighter: #C7D2FE;
  --ifm-color-primary-lightest: #E0E7FF;

  --ifm-background-color: #0B0F1A;
  --ifm-background-surface-color: #111827;
  --ifm-navbar-background-color: rgba(11, 15, 26, 0.85);
  --ifm-code-background: rgba(129, 140, 248, 0.15);
}

/* Sticky blurred navbar */
.navbar {
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
}

/* Tighter content column for readability */
.theme-doc-markdown {
  max-width: 760px;
  margin: 0 auto;
}

/* Sidebar polish */
.menu__link {
  font-size: 0.92rem;
  border-radius: 0.5rem;
}
.menu__link--active {
  background: var(--ifm-color-primary-lightest);
  color: var(--ifm-color-primary-darkest);
}
[data-theme='dark'] .menu__link--active {
  background: rgba(129, 140, 248, 0.18);
  color: var(--ifm-color-primary-lightest);
}

/* Headings */
h1 { letter-spacing: -0.02em; }
h2 { letter-spacing: -0.01em; margin-top: 2.5rem; }
h3 { margin-top: 1.75rem; }

/* Admonitions: more Mintlify */
.theme-admonition {
  border: 1px solid var(--ifm-color-emphasis-300);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

/* Code block aesthetic */
.prism-code {
  border-radius: 0.75rem;
  font-size: 0.88rem;
}

/* Right TOC */
.table-of-contents {
  font-size: 0.85rem;
}
.table-of-contents__link--active {
  color: var(--ifm-color-primary);
  font-weight: 600;
}

/* Tables */
table {
  font-size: 0.92rem;
}
```

- [ ] **Step 2: Run dev server and visually inspect**

```powershell
npm run start
```
Visit `/docs/intro` and `/docs/hardware`. Verify:
- Inter font loaded
- Indigo accent on links
- Dark mode by default
- Light mode toggle works
- Sidebar items have rounded hover states
- Code blocks have rounded corners

- [ ] **Step 3: Commit**

```powershell
git add src/css/custom.css
git commit -m "style: apply Mintlify-style theme overrides"
```

---

## Task 10: Build the Hero component

**Files:**
- Create: `src/components/Hero/index.tsx`, `src/components/Hero/styles.module.css`

- [ ] **Step 1: Create `src/components/Hero/index.tsx`**

```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.gradient} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Final Year Project · University of Karachi · 2025</p>
        <h1 className={styles.title}>
          AI Powered Fleet Management <br />
          <span className={styles.accent}>and Visibility System</span>
        </h1>
        <p className={styles.lead}>
          A distributed microservices platform combining rule-based and machine-learning dispatch,
          real-time GPS tracking, and IoT integration for intelligent vehicle assignment.
        </p>
        <div className={styles.cta}>
          <Link className={styles.btnPrimary} to="/docs/intro">Read the documentation</Link>
          <Link className={styles.btnSecondary} to="/demo">Watch demo</Link>
          <Link className={styles.btnGhost} to="/download">Download PDF</Link>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/Hero/styles.module.css`**

```css
.hero {
  position: relative;
  padding: 6rem 1.5rem 4rem;
  overflow: hidden;
  text-align: center;
}
.gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(60% 60% at 50% 20%, rgba(79,70,229,0.18), transparent 70%);
  pointer-events: none;
}
.inner {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
}
.eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ifm-color-primary);
  margin-bottom: 1.25rem;
}
.title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 1.5rem;
}
.accent {
  background: linear-gradient(90deg, #4F46E5, #06B6D4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.lead {
  font-size: 1.125rem;
  max-width: 640px;
  margin: 0 auto 2rem;
  color: var(--ifm-color-emphasis-700);
}
.cta {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
.btnPrimary, .btnSecondary, .btnGhost {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.25rem;
  border-radius: 0.6rem;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btnPrimary {
  background: var(--ifm-color-primary);
  color: white;
}
.btnPrimary:hover { color: white; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(79,70,229,0.35); }
.btnSecondary {
  background: var(--ifm-color-emphasis-200);
  color: var(--ifm-color-emphasis-900);
}
.btnSecondary:hover { color: var(--ifm-color-emphasis-900); transform: translateY(-1px); }
.btnGhost {
  background: transparent;
  color: var(--ifm-color-emphasis-800);
  border: 1px solid var(--ifm-color-emphasis-300);
}
.btnGhost:hover { color: var(--ifm-color-emphasis-900); }
```

- [ ] **Step 3: No verification yet — used in Task 12. Commit.**

```powershell
git add src/components/Hero/
git commit -m "feat: add Hero component for landing page"
```

---

## Task 11: Build the ChapterCard component

**Files:**
- Create: `src/components/ChapterCard/index.tsx`, `src/components/ChapterCard/styles.module.css`

- [ ] **Step 1: Create `src/components/ChapterCard/index.tsx`**

```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Props {
  title: string;
  description: string;
  to: string;
  number: number;
}

export default function ChapterCard({ title, description, to, number }: Props) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.number}>0{number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/ChapterCard/styles.module.css`**

```css
.card {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.85rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
  height: 100%;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border-color: var(--ifm-color-primary-light);
  text-decoration: none;
}
.number {
  font-family: var(--ifm-font-family-monospace);
  font-size: 0.8rem;
  color: var(--ifm-color-primary);
  letter-spacing: 0.08em;
}
.title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: var(--ifm-color-emphasis-900);
}
.desc {
  font-size: 0.9rem;
  color: var(--ifm-color-emphasis-700);
  margin: 0;
  line-height: 1.5;
}
.arrow {
  margin-top: 0.75rem;
  font-size: 1.1rem;
  color: var(--ifm-color-primary);
  font-weight: 600;
}
```

- [ ] **Step 3: Commit**

```powershell
git add src/components/ChapterCard/
git commit -m "feat: add ChapterCard component"
```

---

## Task 12: Build the custom landing page

**Files:**
- Create: `src/pages/index.tsx`, `src/pages/index.module.css`

- [ ] **Step 1: Create `src/pages/index.tsx`**

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import ChapterCard from '@site/src/components/ChapterCard';
import styles from './index.module.css';

const chapters = [
  { n: 1, title: 'Introduction',         desc: 'Problem context, motivation, project objectives.', to: '/docs/intro' },
  { n: 2, title: 'Literature Review',    desc: 'Prior work in fleet dispatch and routing.',         to: '/docs/literature-review' },
  { n: 3, title: 'System Description',   desc: 'Microservices architecture and data flow.',         to: '/docs/system-description' },
  { n: 4, title: 'Hardware',             desc: 'ESP32/Arduino IoT devices and MQTT integration.',   to: '/docs/hardware' },
  { n: 5, title: 'Backend',              desc: 'Node.js/Express API, MongoDB, JWT auth.',           to: '/docs/backend' },
  { n: 6, title: 'Frontend',             desc: 'React real-time dashboard with WebSocket updates.', to: '/docs/frontend' },
  { n: 7, title: 'AI Engine',            desc: 'RandomForest model + weighted-scoring dispatch.',   to: '/docs/ai' },
  { n: 8, title: 'Vehicle Simulator',    desc: 'Hardware emulator for MQTT testing.',               to: '/docs/vehicle-simulator' },
  { n: 9, title: 'Conclusions',          desc: 'Outcomes, limitations, and future work.',           to: '/docs/conclusions' },
];

const team = [
  { name: 'Syed Taha Jameel', id: 'B20102169' },
  { name: 'Rimsha Masood',    id: 'B23110004008' },
  { name: 'Saman Aslam',      id: 'B23110004009' },
  { name: 'Zoya Ali',         id: 'B21110006168' },
];

export default function Home() {
  return (
    <Layout
      title="AI Powered Fleet Management"
      description="Final Year Project — Distributed microservices platform with intelligent dispatch, real-time GPS tracking, and IoT integration."
    >
      <Hero />

      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.h2}>Documentation</h2>
          <p className={styles.sectionLead}>Nine chapters covering architecture, hardware, software, AI, and evaluation.</p>
          <div className={styles.grid}>
            {chapters.map(c => (
              <ChapterCard key={c.n} number={c.n} title={c.title} description={c.desc} to={c.to} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>Team</h2>
          <p className={styles.sectionLead}>Department of Computer Science, University of Karachi · Supervisor: Dr. Humera Tariq</p>
          <div className={styles.team}>
            {team.map(m => (
              <div key={m.id} className={styles.teamCard}>
                <strong>{m.name}</strong>
                <span>{m.id}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
```

- [ ] **Step 2: Create `src/pages/index.module.css`**

```css
.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
}
.section {
  margin-top: 4rem;
}
.h2 {
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.sectionLead {
  color: var(--ifm-color-emphasis-700);
  margin-bottom: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.team {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.teamCard {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.75rem;
}
.teamCard span {
  font-family: var(--ifm-font-family-monospace);
  font-size: 0.8rem;
  color: var(--ifm-color-emphasis-600);
  margin-top: 0.25rem;
}
```

- [ ] **Step 3: Run dev server and verify landing page**

```powershell
npm run start
```
Open `http://localhost:3000/fleet-management-docs/`. Verify:
- Hero renders with gradient and three buttons
- Chapter grid shows 9 cards with hover effect
- Team section shows 4 members
- Light/dark toggle works
- Mobile width (resize browser to ~400px) — buttons wrap, grid collapses to 1 column

- [ ] **Step 4: Commit**

```powershell
git add src/pages/index.tsx src/pages/index.module.css
git commit -m "feat: add custom landing page with hero, chapter grid, team"
```

---

## Task 13: Demo page with VideoEmbed component

**Files:**
- Create: `src/components/VideoEmbed/index.tsx`, `src/pages/demo.tsx`, `src/pages/demo.module.css`

- [ ] **Step 1: Create `src/components/VideoEmbed/index.tsx`**

```tsx
import React from 'react';

interface Props {
  youtubeId?: string;
  title?: string;
}

export default function VideoEmbed({ youtubeId, title = 'Demo video' }: Props) {
  if (!youtubeId) {
    return (
      <div style={{
        aspectRatio: '16/9',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--ifm-background-surface-color)',
        border: '1px dashed var(--ifm-color-emphasis-300)',
        borderRadius: '0.85rem',
        color: 'var(--ifm-color-emphasis-700)',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <div>
          <strong>Demo video coming soon.</strong>
          <p style={{ margin: '0.5rem 0 0' }}>The video will be embedded here once published to YouTube.</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '0.85rem', overflow: 'hidden' }}>
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/demo.tsx`**

```tsx
import React from 'react';
import Layout from '@theme/Layout';
import VideoEmbed from '@site/src/components/VideoEmbed';
import styles from './demo.module.css';

// TODO: replace with actual YouTube video ID once uploaded as Unlisted.
// Example: 'dQw4w9WgXcQ' from https://youtube.com/watch?v=dQw4w9WgXcQ
const YOUTUBE_ID: string | undefined = undefined;

export default function Demo() {
  return (
    <Layout title="Demo" description="Demonstration video for the AI Powered Fleet Management System">
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>System Demo</h1>
          <p>End-to-end walkthrough of the fleet management platform: real-time tracking, AI dispatch, and IoT integration.</p>
        </header>
        <VideoEmbed youtubeId={YOUTUBE_ID} title="Fleet Management Demo" />
      </main>
    </Layout>
  );
}
```

- [ ] **Step 3: Create `src/pages/demo.module.css`**

```css
.main {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}
.header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.header h1 {
  font-size: 2.25rem;
  letter-spacing: -0.02em;
}
.header p {
  color: var(--ifm-color-emphasis-700);
  max-width: 580px;
  margin: 0.75rem auto 0;
}
```

- [ ] **Step 4: Verify in dev server**

Visit `/demo`. Expected: page renders with placeholder card "Demo video coming soon." When the user provides the YouTube ID, the engineer must update `YOUTUBE_ID` in `demo.tsx` (and the same in landing if embedded there later).

- [ ] **Step 5: Commit**

```powershell
git add src/components/VideoEmbed/ src/pages/demo.tsx src/pages/demo.module.css
git commit -m "feat: add demo page with YouTube embed (placeholder until URL provided)"
```

---

## Task 14: PDF handling and download page

**Files:**
- Create: `static/pdf/fleet-management-thesis.pdf` (moved from project root)
- Create: `src/pages/download.tsx`, `src/pages/download.module.css`

- [ ] **Step 1: Inspect the PDF in repo root**

```powershell
Get-Item Ai_Powered_Fleet_Management_and_Visibility_System.pdf | Select-Object Name, Length
```
Expected: file exists with size in bytes. If `Length` > 100,000,000 (100 MB), this file cannot live in a normal git commit on GitHub Pages — see Step 2b.

- [ ] **Step 2a: If PDF is < 100 MB — move into static/pdf/**

```powershell
New-Item -ItemType Directory -Force static/pdf | Out-Null
Move-Item Ai_Powered_Fleet_Management_and_Visibility_System.pdf static/pdf/fleet-management-thesis.pdf
```

- [ ] **Step 2b: If PDF is > 100 MB — host as GitHub Release asset**

Manual step:
1. Go to https://github.com/SYD-Taha/fleet-management-docs/releases/new
2. Tag: `v1.0`, Title: `Thesis PDF`, attach the `.pdf` file as a release asset.
3. Copy the asset's direct URL (right-click → Copy link).
4. Skip Step 3 below — instead, use the release URL as the download link in `download.tsx`.
5. Delete the PDF from the working directory: `Remove-Item Ai_Powered_Fleet_Management_and_Visibility_System.pdf`

- [ ] **Step 3: Create `src/pages/download.tsx`**

If using local hosting (Step 2a):
```tsx
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './download.module.css';

const PDF_URL = '/fleet-management-docs/pdf/fleet-management-thesis.pdf';

export default function Download() {
  return (
    <Layout title="Download" description="Download the thesis PDF">
      <main className={styles.main}>
        <h1>Download</h1>
        <p>The full thesis is available as a PDF for offline reading.</p>
        <div className={styles.card}>
          <div>
            <strong>AI Powered Fleet Management and Visibility System</strong>
            <p className={styles.meta}>Final Year Project · University of Karachi · December 2025</p>
          </div>
          <Link className={styles.btn} href={PDF_URL} download>Download PDF</Link>
        </div>
      </main>
    </Layout>
  );
}
```

If using GitHub Release (Step 2b), replace `PDF_URL` with the release asset URL from Step 2b.

- [ ] **Step 4: Create `src/pages/download.module.css`**

```css
.main {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 1.5rem 6rem;
}
.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-color-emphasis-200);
  border-radius: 0.85rem;
  margin-top: 2rem;
}
.meta {
  font-size: 0.85rem;
  color: var(--ifm-color-emphasis-600);
  margin: 0.25rem 0 0;
}
.btn {
  background: var(--ifm-color-primary);
  color: white;
  padding: 0.7rem 1.25rem;
  border-radius: 0.6rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}
.btn:hover { color: white; opacity: 0.9; }
```

- [ ] **Step 5: Verify**

`npm run start` → visit `/download`. Click "Download PDF" → verify file downloads (or release link opens, depending on path chosen).

- [ ] **Step 6: Commit**

```powershell
git add src/pages/download.tsx src/pages/download.module.css
# If 2a was used, also:
git add static/pdf/fleet-management-thesis.pdf
git commit -m "feat: add download page; move PDF to static (or link release asset)"
```

---

## Task 15: GitHub Actions deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Configure repo settings**

Manual step on GitHub:
1. Settings → Pages → Source: **GitHub Actions** (not "Deploy from branch").
2. Save.

- [ ] **Step 3: Commit and push**

```powershell
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow to deploy Docusaurus site to Pages"
git push origin main
```

- [ ] **Step 4: Verify deployment**

In GitHub: Actions tab → watch the workflow run. After ~3-5 minutes, visit `https://syd-taha.github.io/fleet-management-docs/`. Verify:
- Site loads
- Navigation works
- Search works
- All 9 chapters accessible
- PDF download link works
- Demo page renders

If broken, check workflow logs and fix.

---

## Task 16: Rewrite the README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md`**

```markdown
# AI Powered Fleet Management and Visibility System — Documentation Site

Final Year Project documentation site, University of Karachi, 2025.

🌐 **Live site:** https://syd-taha.github.io/fleet-management-docs/

## Project

A distributed microservices platform combining rule-based and machine-learning vehicle dispatch, real-time GPS tracking via OSRM, and IoT integration through MQTT-connected ESP32/Arduino devices.

## Team

- Syed Taha Jameel (B20102169)
- Rimsha Masood (B23110004008)
- Saman Aslam (B23110004009)
- Zoya Ali (B21110006168)

**Supervisor:** Dr. Humera Tariq, Department of Computer Science, University of Karachi

## Local development

```bash
npm ci
npm run start    # dev server on http://localhost:3000/fleet-management-docs/
npm run build    # production build → build/
npm run serve    # serve the production build
```

## Re-running the LaTeX → Markdown conversion

The Markdown in `docs/` was generated from the LaTeX source in `thesis-source/` using `scripts/convert-latex.mjs`. To regenerate:

```bash
npm run convert
```

This requires Pandoc 3.x installed. Hand-cleaning is required after conversion (citations, custom macros, etc.).

## Repository structure

- `docs/` — converted Markdown chapters
- `src/` — custom React components and pages
- `static/` — figures and PDF
- `thesis-source/` — original LaTeX source
- `scripts/convert-latex.mjs` — one-time converter

## Deployment

`main` branch → GitHub Actions → GitHub Pages (see `.github/workflows/deploy.yml`).

## License

Academic work submitted in partial fulfillment of BS Computer Science. All rights reserved by the authors and University of Karachi.
```

- [ ] **Step 2: Commit**

```powershell
git add README.md
git commit -m "docs: rewrite README with project info, dev instructions, deploy notes"
```

---

## Task 17: Final polish and verification pass

**Files:**
- Various — fix issues found during pass

- [ ] **Step 1: Build the production site locally**

```powershell
npm run build
```
Expected: build succeeds, no broken-link errors. If `onBrokenLinks: 'warn'` shows warnings, decide per-link whether to fix or accept.

- [ ] **Step 2: Serve and walk every page**

```powershell
npm run serve
```
Click through:
- `/` (landing) — hero + chapter grid + team
- Each of 9 chapter pages — confirm headings, figures, equations, tables render
- `/docs/references` — bibliography legible
- `/docs/appendix` — renders
- `/demo` — placeholder (or video if URL provided)
- `/download` — link works

For each page, also:
- Toggle dark/light mode → confirm both render correctly
- Search a term that should appear (e.g. "MQTT") → confirm hit
- Resize browser to 375px width → confirm mobile layout

- [ ] **Step 3: Run Lighthouse**

In Chrome DevTools → Lighthouse → Generate report on the landing page.
Targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 90

If Performance < 90, common fixes: convert any large PNGs in `static/img/` to WebP via `npx @squoosh/cli --webp '{}' static/img/**/*.png`.
If Accessibility < 95, common fixes: missing alt text on images (search `![](` in `docs/`), low color contrast.

- [ ] **Step 4: TypeScript check**

```powershell
npm run typecheck
```
Expected: zero errors.

- [ ] **Step 5: Fix anything found**

Loop on any issue surfaced in steps 1-4 until clean.

- [ ] **Step 6: Commit fixes**

```powershell
git add -A
git commit -m "polish: final QA pass — fix broken links, alt text, typecheck"
```

---

## Task 18: Update PDF/video URLs once user provides them

**Files:**
- Modify: `src/pages/demo.tsx`, possibly `src/pages/index.tsx` (if hero links to video), `src/pages/download.tsx` (if release URL changed)

- [ ] **Step 1: Wait for user to provide YouTube Unlisted URL**

User uploads the 385 MB `.mp4` to YouTube as Unlisted, sends the URL (e.g. `https://www.youtube.com/watch?v=ABC123XYZ`).

- [ ] **Step 2: Extract YouTube ID and update**

In `src/pages/demo.tsx`, replace:
```tsx
const YOUTUBE_ID: string | undefined = undefined;
```
With (using the actual ID from the URL):
```tsx
const YOUTUBE_ID = 'ABC123XYZ';
```

- [ ] **Step 3: If using GitHub Release for PDF, ensure URL is correct in `download.tsx`**

- [ ] **Step 4: Verify locally then push**

```powershell
npm run start
# Visit /demo, confirm YouTube player loads
git add src/pages/demo.tsx src/pages/download.tsx
git commit -m "feat: wire actual YouTube demo URL and PDF link"
git push
```

GitHub Actions redeploys automatically.

---

## Self-Review Checklist (verified)

**1. Spec coverage:**
- §1 Goals → entire plan
- §2 Source Material → Tasks 4-8 cover all chapters, frontmatter, references, appendix, figures
- §3 Tech Stack → Tasks 1-3 install all listed dependencies
- §4 Aesthetic → Task 9 (CSS), Task 10 (Hero), Task 11 (Cards)
- §5 Site Map → Sidebar (Task 2), landing (Task 12), demo (Task 13), download (Task 14)
- §6 Conversion Pipeline → Tasks 4-8
- §7 Demo Video → Task 13 + Task 18
- §8 PDF Handling → Task 14
- §9 Repo Layout → Tasks 1-15 collectively produce final structure
- §10 Deployment → Task 15
- §11 Out of Scope → respected (no versioning, i18n, blog)
- §12 Open Items → Task 18 covers user-provided URLs; PDF investigation in Task 14
- §13 Success Criteria → verified in Task 17

**2. Placeholder scan:** No "TBD", "TODO" outside legitimate user-action markers in Task 14b/18 and the demo placeholder ID. All code blocks complete.

**3. Type consistency:** Component prop names (`youtubeId`, `title`, `to`, `number`, `description`) are consistent. CSS module class names match between `.tsx` and `.module.css` files.

---
