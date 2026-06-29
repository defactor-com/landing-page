import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root (multiple lockfiles exist on this machine).
  turbopack: { root: path.resolve(".") },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
