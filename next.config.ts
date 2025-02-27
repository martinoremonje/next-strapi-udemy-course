import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  images: { 
    domains: ["res.cloudinary.com"]
  }
};

export default nextConfig;
