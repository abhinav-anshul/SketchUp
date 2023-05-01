/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fsRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gjciftliksnfvfdzdxuo.supabase.co",
        port: "",
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
