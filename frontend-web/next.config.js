/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sta CORS toe voor de API routes
  async headers() {
    return [
      {
        // Matching all API routes
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
  // Zorg dat environment variables beschikbaar zijn
  env: {
    DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
  },
  // Expliciete poort configuratie
  serverOptions: {
    port: 3000
  }
}

module.exports = nextConfig; 