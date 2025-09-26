// next.config.js
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

module.exports = {
  output: "export",           // needed for GH Pages
  images: { unoptimized: true },
  basePath: base,             // "" or "/auto-shop"
  assetPrefix: base,          // "" or "/auto-shop"
};
