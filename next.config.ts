import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const isProd = process.env.NODE_ENV === 'production';

// The native apps (APP_BUILD=1) ship without the 18+ deck, so they can be rated 12+ (issue #54)
const isAppBuild = process.env.APP_BUILD === '1';
const adultAlias = { '@/data/questions/voksne': './src/data/questions/voksne.app.ts' };

const nextConfig: NextConfig = {
  output: 'export',
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
