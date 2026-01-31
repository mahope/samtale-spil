import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // For GitHub Pages deployment
  basePath: isGitHubPages ? '/samtale-spil' : '',
  assetPrefix: isGitHubPages ? '/samtale-spil/' : '',
};

export default nextConfig;
