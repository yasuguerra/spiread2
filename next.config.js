// NOTE: Security & CORS headers have been moved exclusively to middleware.js
// to avoid duplication and conflicting directives (e.g. X-Frame-Options / CSP).
// Keep this config lean for build/runtime tweaks only.

const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Re‑enable optimization later if you host an image loader
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  onDemandEntries: {
    maxInactiveAge: 10000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
