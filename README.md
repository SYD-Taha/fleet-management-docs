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
npm run start    # dev server: http://localhost:3000/fleet-management-docs/
npm run build    # production build → build/
npm run serve    # serve the production build
```

## Re-running the LaTeX → Markdown conversion

The Markdown in `docs/` was generated from the LaTeX source in `thesis-source/` using `scripts/convert-latex.mjs`. To regenerate:

```bash
npm run convert
```

Requires Pandoc 3.x installed. Hand-cleaning is required after conversion (citations, custom macros, MDX-incompatible patterns).

## Repository structure

- `docs/` — converted Markdown chapters
- `src/` — custom React components and pages (Hero, ChapterCard, VideoEmbed, landing/demo/download)
- `static/` — figures and PDF
- `thesis-source/` — original LaTeX source
- `scripts/convert-latex.mjs` — one-time LaTeX→Markdown converter

## Deployment

Push to `main` → GitHub Actions → GitHub Pages. See `.github/workflows/deploy.yml`.

**One-time GitHub setting:** Repository → Settings → Pages → **Source: GitHub Actions**.

## License

Academic work submitted in partial fulfillment of BS Computer Science. All rights reserved by the authors and University of Karachi.
