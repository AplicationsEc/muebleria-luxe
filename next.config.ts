/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática: genera HTML + assets en la carpeta /out
  output: "export",

  // Prefijos para que funcione correctamente en GitHub Pages
  basePath: "/muebleria-luxe",
  assetPrefix: "/muebleria-luxe",
  // Permitir imágenes remotas desde raw.githubusercontent.com
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/felipeAlmEspa/luxeApi/**",
      },
    ],
  },
};

export default nextConfig;
