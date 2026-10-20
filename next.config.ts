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
const adultAlias = { '@/data/questions/voksne': './src/data/questions/voksne.app.ts' };
// "@/locale/*" points at src/locales/<locale>/ (tsconfig maps it to Danish for type checks)
const localeAlias = {
  '@/locale/ui': `./src/locales/${locale}/ui.ts`,
  '@/locale/site': `./src/locales/${locale}/site.ts`,
};

const nextConfig: NextConfig = {
  output: 'export',
  ...(isIntl && { pageExtensions: ['intl.tsx', 'intl.ts'] }),
  turbopack: { resolveAlias: { ...localeAlias, ...(isAppBuild ? adultAlias : {}) } },
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
