import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [],
  },

  // Custom port is set via CLI flag (-p 8000), not here
};

export default nextConfig;
