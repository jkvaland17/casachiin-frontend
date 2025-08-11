/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "documents.demotcpdigital.com",
      },
      {
        protocol: "https",
        hostname: "devdocuments.CAexams.ac.in",
      },
      {
        protocol: "https",
        hostname: "documents.CAexams.ac.in",
      },
      {
        protocol: "https",
        hostname: "rrpdocuments.CAexams.ac.in",
      },
      {
        protocol: "https",
        hostname: "rrp.CAexams.ac.in",
      },
    ],
  },
};

export default nextConfig;
