import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // Strip "X-Powered-By: Next.js" to prevent fingerprinting
};

export default nextConfig;
