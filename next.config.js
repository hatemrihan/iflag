/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    // Make case-sensitive paths optional
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new (require('path').resolve)());
    return config;
  },
};

module.exports = nextConfig; 