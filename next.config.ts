import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  typedRoutes: false,
  transpilePackages: ["shiki"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // legacy S3 regional endpoints like s3-us-west-2.amazonaws.com
      {
        protocol: "https",
        hostname: "s3-*.amazonaws.com",
        pathname: "**",
      },
      // virtual-hosted–style buckets: bucket.s3.amazonaws.com
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        pathname: "**",
      },
      // regional virtual-hosted–style buckets: bucket.s3.us-west-2.amazonaws.com
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
      {
        protocol: "https",
        hostname: "unavatar.io",
        pathname: "/**",
      },
    ],
  },
  turbopack: {},
};

export default withPWA(nextConfig);
