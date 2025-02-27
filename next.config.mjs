/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wristbandaud.blob.core.windows.net",
      },
    ],
  },
  output: "standalone",
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
