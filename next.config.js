/** @type {import('next').NextConfig} */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"],
  },
  compiler: {
    styledComponents: true,
  },
  // ESLint-Warnungen für den Build ignorieren
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Füge den MiniCssExtractPlugin mit korrekter Konfiguration hinzu
    config.plugins.push(
      new MiniCssExtractPlugin({
        // Konfiguriere den Output-Pfad richtig
        filename: 'static/css/[contenthash].css',
        chunkFilename: 'static/css/[contenthash].css',
        ignoreOrder: true, // Ignoriere Warnungen über Konflikte in der Reihenfolge
      })
    );
    return config;
  },
};

module.exports = nextConfig;
