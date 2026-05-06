import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
          exclude: [
            'superpowers/**',
            // Uncleaned raw Pandoc output — re-enabled per chapter as Tasks 6-8 clean each.
            'literature-review.md',
            'system-description.md',
            'hardware.md',
            'backend.md',
            'frontend.md',
            'ai.md',
            'vehicle-simulator.md',
            'conclusions.md',
            'references.md',
            'appendix.md',
          ],
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
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
