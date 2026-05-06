#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  mkdirSync, copyFileSync, readdirSync, existsSync,
  writeFileSync, unlinkSync, readFileSync,
} from 'node:fs';
import { join } from 'node:path';

const SRC = 'thesis-source';
const DOCS = 'docs';
const IMG = 'static/img';

// Resolve pandoc binary: prefer PATH, fall back to typical Windows install paths.
function resolvePandoc() {
  const candidates = [
    'pandoc',
    'C:/Users/tjami/AppData/Local/Pandoc/pandoc.exe',
    'C:/Program Files/Pandoc/pandoc.exe',
    process.env.PANDOC_PATH,
  ].filter(Boolean);
  for (const cand of candidates) {
    try {
      execFileSync(cand, ['--version'], { stdio: 'ignore' });
      return cand;
    } catch { /* try next */ }
  }
  throw new Error('pandoc not found — install via `winget install JohnMacFarlane.Pandoc` or set PANDOC_PATH');
}
const PANDOC = resolvePandoc();
console.log(`Using pandoc: ${PANDOC}`);

const chapters = [
  { src: 'chapter1/Introduction.tex',                   slug: 'intro',                title: 'Introduction',                pos: 1 },
  { src: 'chapter2/LiteratureReview.tex',               slug: 'literature-review',    title: 'Literature Review',           pos: 2 },
  { src: 'chapter3/SystemDescription.tex',              slug: 'system-description',   title: 'System Description',          pos: 3 },
  { src: 'chapter4/Hardware.tex',                       slug: 'hardware',             title: 'Hardware',                    pos: 4 },
  { src: 'chapter5/backend.tex',                        slug: 'backend',              title: 'Backend',                     pos: 5 },
  { src: 'chapter6/frontend.tex',                       slug: 'frontend',             title: 'Frontend',                    pos: 6 },
  { src: 'chapter7/Artificial_Intelligence.tex',        slug: 'ai',                   title: 'Artificial Intelligence',     pos: 7 },
  { src: 'chapter8/Vehicle_Simulator.tex',              slug: 'vehicle-simulator',    title: 'Vehicle Simulator',           pos: 8 },
  { src: 'chapter9/Conclusions_and_FutureWork.tex',     slug: 'conclusions',          title: 'Conclusions and Future Work', pos: 9 },
];

mkdirSync(DOCS, { recursive: true });
mkdirSync(IMG, { recursive: true });

// Sanitize a LaTeX chapter fragment so pandoc can parse it as a self-contained doc.
// Many chapters in this repo include a stray \begin{document} (or even \documentclass)
// without a matching \end{document}; some are pure body fragments. Normalize by
// stripping preamble-y things and ensuring a single matched begin/end document pair.
function sanitizeLatex(src) {
  let s = src;
  // Drop preamble directives that don't belong inside a chapter body.
  s = s.replace(/^\s*\\documentclass\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\usepackage\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\input\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\include\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\bibliography\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\bibliographystyle\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\maketitle\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\title\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\author\b[^\n]*\n/gm, '');
  s = s.replace(/^\s*\\date\b[^\n]*\n/gm, '');
  // Remove existing begin/end document so we can wrap exactly one pair.
  s = s.replace(/\\begin\{document\}/g, '');
  s = s.replace(/\\end\{document\}/g, '');
  return `\\documentclass{article}\n\\begin{document}\n${s.trim()}\n\\end{document}\n`;
}

function pandocToMd(inFile) {
  const raw = readFileSync(inFile, 'utf8');
  const sanitized = sanitizeLatex(raw);
  const tmp = `${inFile}.__tmp_sanitized.tex`;
  writeFileSync(tmp, sanitized);
  try {
    return execFileSync(
      PANDOC,
      [tmp, '-f', 'latex', '-t', 'gfm+tex_math_dollars', '--wrap=none'],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
    );
  } finally {
    if (existsSync(tmp)) unlinkSync(tmp);
  }
}

// Rewrite image refs to /img/<slug>/<filename>
function rewriteImagePaths(md, slug) {
  return md.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_m, alt, src) => {
      // Strip any leading directory components, keep just the basename
      const basename = src.split(/[\\/]/).pop();
      return `![${alt}](/img/${slug}/${basename})`;
    }
  );
}

for (const ch of chapters) {
  const inFile = join(SRC, ch.src);
  if (!existsSync(inFile)) {
    console.warn(`SKIP missing: ${inFile}`);
    continue;
  }
  const outFile = join(DOCS, `${ch.slug}.md`);
  console.log(`Converting ${inFile} -> ${outFile}`);

  const md = pandocToMd(inFile);

  // Copy figs/ to static/img/<slug>/
  const chapterDir = ch.src.split('/')[0]; // e.g. "chapter1"
  const srcFigs = join(SRC, chapterDir, 'figs');
  const dstFigs = join(IMG, ch.slug);
  let rewritten = md;
  if (existsSync(srcFigs)) {
    mkdirSync(dstFigs, { recursive: true });
    for (const f of readdirSync(srcFigs)) {
      copyFileSync(join(srcFigs, f), join(dstFigs, f));
    }
    rewritten = rewriteImagePaths(md, ch.slug);
  } else {
    console.warn(`  (no figs/ for ${ch.slug})`);
  }

  const frontmatter =
    `---\nsidebar_position: ${ch.pos}\ntitle: ${JSON.stringify(ch.title)}\n---\n\n# ${ch.title}\n\n`;
  writeFileSync(outFile, frontmatter + rewritten);
}

// Appendix
const appendixIn = join(SRC, 'backmatter/Appendix.tex');
if (existsSync(appendixIn)) {
  console.log(`Converting ${appendixIn} -> docs/appendix.md`);
  const md = pandocToMd(appendixIn);
  const srcFigs = join(SRC, 'backmatter/figs');
  const dstFigs = join(IMG, 'appendix');
  let rewritten = md;
  if (existsSync(srcFigs)) {
    mkdirSync(dstFigs, { recursive: true });
    for (const f of readdirSync(srcFigs)) copyFileSync(join(srcFigs, f), join(dstFigs, f));
    rewritten = rewriteImagePaths(md, 'appendix');
  }
  writeFileSync(
    join(DOCS, 'appendix.md'),
    `---\nsidebar_position: 11\ntitle: Appendix\n---\n\n# Appendix\n\n` + rewritten
  );
}

// Bibliography → docs/references.md (citeproc emits a markdown bibliography list)
const bibFile = join(SRC, 'bibliography.bib');
if (existsSync(bibFile)) {
  console.log(`Generating references.md from ${bibFile}`);
  const stub = '_tmp_bib_stub.tex';
  writeFileSync(stub, '\\nocite{*}\n');
  try {
    const md = execFileSync(
      PANDOC,
      [stub, '--citeproc', `--bibliography=${bibFile}`, '-f', 'latex', '-t', 'gfm', '--wrap=none'],
      { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
    );
    writeFileSync(
      join(DOCS, 'references.md'),
      `---\nsidebar_position: 10\ntitle: References\n---\n\n# References\n\n` + md
    );
  } finally {
    if (existsSync(stub)) unlinkSync(stub);
  }
}

console.log('\nDone. Review docs/*.md for LaTeX-isms (citations, custom commands, equations).');
