/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint configuratie
  eslint: {
    ignoreDuringBuilds: true,
  },
  // CORS configuratie voor API routes
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  // Images configuratie voor externe bronnen
  images: {
    domains: ['lh3.googleusercontent.com', 'lh4.googleusercontent.com', 'lh5.googleusercontent.com', 'lh6.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  // Environment variables configuratie
  //env: {
  //  DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
  //  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  //  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  //},
  // TypeScript configuratie
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimalisaties
  poweredByHeader: false,
  reactStrictMode: true,
  // Build en output configuratie
  output: 'standalone',
};

module.exports = nextConfig;