/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export", // Habilita exportación estática
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/felipeAlmEspa/luxeApi/**",
      },
    ],
  },
  basePath: "/PrimeApp", // importante para que los paths funcionen
  assetPrefix: "/PrimeApp", // para que cargue los assets correctamente
};

export default nextConfig;
