import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Radix Accordion package to avoid ESM/CJS or modern syntax issues
  transpilePackages: ["@radix-ui/react-accordion"],
};

export default nextConfig;
