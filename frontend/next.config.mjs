/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        hostname: "codeandhire-dev.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
