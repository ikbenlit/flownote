/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const path = require('path')

const nextConfig = {
  // ESLint configuratie
  eslint: {
    ignoreDuringBuilds: true
  },

  // CORS configuratie voor API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },

  // Environment variables configuratie
  env: {
    DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL
  },

  // TypeScript en transpilatie configuratie
  typescript: {
    // !! WAARSCHUWING: Zet dit op true zodra alle type errors zijn opgelost
    ignoreBuildErrors: true,
  },

  // Optimalisaties
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Build en output configuratie
  distDir: '.next',
  
  // Gebruik standalone build voor server-side rendering
  output: 'standalone',
  
  // Specifieke packages van server-side bundling uitsluiten
  transpilePackages: ['next'],
  
  // Minimale webpack configuratie met alleen de essentiële polyfills
  webpack: (config, { isServer }) => {
    // Voeg alias toe voor @ paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }

    // Server-side specifieke configuratie
    if (isServer) {
      // Voorkom dat firebase-admin wordt gebundeld voor de client
      config.module.rules.push({
        test: /firebase-admin/,
        use: 'null-loader'
      })
      
      return config
    }

    // Client-side specifieke configuratie
    // Alleen de minimale set van Node.js polyfills die echt nodig zijn
    // voor de OpenAI client en WebSocket communicatie
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Only the essential modules for network requests
      // OpenAI client en Deepgram WebSocket API gebruiken deze
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      
      // Basis utilities nodig voor OpenAI fetch requests
      buffer: require.resolve('buffer'),
      
      // Overige minimaal benodigde modules
      process: require.resolve('process/browser'),
      
      // Zet alle andere Node.js core modules op 'false'
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      util: false,
      assert: false,
      tls: false,
      net: false,
      zlib: false,
      http2: false,
      dns: false,
      child_process: false,
      perf_hooks: false,
      async_hooks: false,
    }

    // Alleen de essentiële globale variabelen
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    )

    return config
  }
}

module.exports = nextConfig 