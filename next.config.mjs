/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    experimental: {
        missingSuspenseWithCSRBailout: false,
      }
};
export default nextConfig;
