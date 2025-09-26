// ESM: next.config.mjs  (or use .cjs with module.exports)
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: base,
  assetPrefix: base,
};

export default nextConfig;
