/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
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
  
  // Gebruik een normale server build zonder standalone en outputFileTracing
  // Dit voorkomt problemen met het kopiëren van bestanden in paden met haakjes zoals '(public)'
  // output: 'standalone',
  // outputFileTracing: false,

  // Webpack configuratie voor node: protocol en polyfills
  webpack: (config, { isServer }) => {
    // Voeg alias toe voor @ paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
      'node:process': 'process/browser',
      'node:crypto': 'crypto-browserify',
      'node:stream': 'stream-browserify',
      'node:util': 'util/',
      'node:zlib': 'browserify-zlib',
      'node:http': 'stream-http',
      'node:https': 'https-browserify',
      'node:net': false,
      'node:tls': false,
      'node:fs': false,
      process: 'process/browser',
    }

    // Server-side specifieke configuratie
    if (isServer) {
      return config
    }

    // Voorkom dat firebase-admin wordt gebundeld voor de client
    config.module.rules.push({
      test: /firebase-admin/,
      use: 'null-loader'
    })

    // Node.js core modules fallbacks
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      tls: false,
      net: false,
      http2: false,
      dns: false,
      child_process: false,
      perf_hooks: false,
      async_hooks: false,
      process: require.resolve('process/browser'),
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer'),
      assert: require.resolve('assert/')
    }

    // Globale variabelen
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      })
    )

    // Gebruik NodePolyfillPlugin voor eenvoudigere polyfill configuratie
    config.plugins.push(new NodePolyfillPlugin())

    return config
  }
}

module.exports = nextConfig 