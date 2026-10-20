import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

// The native apps (APP_BUILD=1) ship without the 18+ deck, so they can be rated 12+ (issue #54)
const isAppBuild = process.env.APP_BUILD === '1';
// Any SITE_LOCALE other than "da" builds an international site (Goodtalk on goodtalkcards.com for "en")
// from the shared *.intl.tsx route tree; texts and cards come from src/locales/<locale>/ (issue #30)
const locale = process.env.SITE_LOCALE ?? 'da';
const isIntl = locale !== 'da';
const adultAlias = { '@/data/questions/voksne': './src/data/questions/voksne.app.ts' };

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: isIntl ? ['intl.tsx', 'intl.ts'] : ['tsx', 'ts'],
  ...(isAppBuild && { turbopack: { resolveAlias: adultAlias } }),
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
