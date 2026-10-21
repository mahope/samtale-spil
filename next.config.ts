import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

// The native apps (APP_BUILD=1) ship without the 18+ deck, so they can be rated 12+ (issue #54)
const isAppBuild = process.env.APP_BUILD === '1';
// Any SITE_LOCALE other than "da" builds an international site (Goodtalk on goodtalkcards.com for "en")
// from the shared *.intl.tsx route tree (issue #30). Unknown values fail the build, so a typo can
// never turn snakkespil.dk into the international site.
const LOCALES = ['da', 'en'];
const locale = process.env.SITE_LOCALE || 'da';
if (!LOCALES.includes(locale)) throw new Error(`SITE_LOCALE must be one of ${LOCALES.join(', ')}, got "${locale}"`);
const isIntl = locale !== 'da';
// APP_VARIANT=voksen builds the separate 18+ app (issue #57) from the *.voksen.tsx route tree:
// only adult and couple decks, behind an age gate. It needs the adult deck, so not with APP_BUILD.
const VARIANTS = ['', 'voksen'];
const variant = process.env.APP_VARIANT || '';
if (!VARIANTS.includes(variant)) throw new Error(`APP_VARIANT must be empty or "voksen", got "${variant}"`);
if (variant === 'voksen' && (isIntl || isAppBuild)) throw new Error('APP_VARIANT=voksen needs SITE_LOCALE=da and no APP_BUILD');
const adultAlias = { '@/data/questions/voksne': './src/data/questions/voksne.app.ts' };
// Every app is its own app shell (src/components/app), not the website in a frame: a tab bar and
// native navigation from a route tree of its own. Snakkespil (APP_BUILD=1, Danish) builds
// *.app.tsx, Goodtalk (APP_BUILD=1 with SITE_LOCALE=en) *.intlapp.tsx, and the 18+ app *.voksen.tsx.
// The websites (no APP_BUILD) keep page.tsx and *.intl.tsx.
const isAppShell = isAppBuild && !isIntl && variant === '';
const isIntlApp = isAppBuild && isIntl;
// In the apps the games go back to the first tab ("/"), which is where /spil/ or /play/ lives on the site
const appShellAlias = { '@/locale/ui': `./src/locales/${locale}/ui.app.ts` };
const hasShell = isAppShell || isIntlApp || variant === 'voksen';
// "@/locale/*" points at src/locales/<locale>/ (tsconfig maps it to Danish for type checks)
const localeAlias = {
  '@/locale/ui': `./src/locales/${locale}/ui.ts`,
  '@/locale/site': `./src/locales/${locale}/site.ts`,
  '@/locale/decks': locale === 'da' ? './src/locales/da/decks.ts' : `./src/locales/${locale}/decks/index.ts`,
  '@/locale/marks': `./src/locales/${locale}/marks.ts`,
  '@/locale/games': `./src/locales/${locale}/games.ts`,
  '@/locale/guides': `./src/locales/${locale}/guides.ts`,
  ...(locale !== 'da' && { '@/data/followUps': `./src/locales/${locale}/followUps.ts` }),
};

const nextConfig: NextConfig = {
  output: 'export',
  ...(isIntl && !isAppBuild && { pageExtensions: ['intl.tsx', 'intl.ts'] }),
  ...(isIntlApp && { pageExtensions: ['intlapp.tsx', 'intlapp.ts'] }),
  ...(variant === 'voksen' && { pageExtensions: ['voksen.tsx', 'voksen.ts'] }),
  ...(isAppShell && { pageExtensions: ['app.tsx', 'app.ts'] }),
  turbopack: {
    resolveAlias: { ...localeAlias, ...(isAppBuild ? adultAlias : {}), ...(hasShell ? appShellAlias : {}) },
  },
  images: {
    unoptimized: true
  },
  // Every route exports as <route>/index.html, so nginx serves it without rewrites
  trailingSlash: true,
  
  // Performance optimizations
  experimental: {
    // Enable optimized package imports for motion
    optimizePackageImports: ['motion'],
  },
  
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: isProd ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Enable gzip compression
  compress: true,
  
  // Optimize powered by header
  poweredByHeader: false,
  
  // Strict mode for better debugging
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
