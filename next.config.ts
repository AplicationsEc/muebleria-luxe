/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 Esto debe estar activo
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/felipeAlmEspa/luxeApi/**",
      },
    ],
  },
  basePath: "/PrimeApp",
  assetPrefix: "/PrimeApp",
};

export default nextConfig;
