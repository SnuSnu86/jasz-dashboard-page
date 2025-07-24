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
    // CSS-Regel finden und anpassen
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );
    
    if (cssRule) {
      // Stelle sicher, dass die CSS-Module korrekt verarbeitet werden
      cssRule.use = [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: '[local]--[hash:base64:5]',
            },
          },
        },
        'postcss-loader',
      ];
    }
    
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
