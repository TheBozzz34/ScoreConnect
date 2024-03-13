import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { withNextVideo } from "next-video/process";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: { instrumentationHook: true },
  images: {
    domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
  },
};

const config = withPlugins([
  [withBundleAnalyzer({ enabled: env.ANALYZE })],
  [withNextVideo(nextConfig, {
    provider: 'amazon-s3',
    providerConfig: {
      'amazon-s3': { 
        endpoint: 'https://s3.us-east-2.amazonaws.com', 
      },
      bucket: 'next-videos-j8ndjk0vixy',
    }
  })]
]);

export default config;
