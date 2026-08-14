import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpiles Three.js ESM modules cleanly in Next.js
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "us-east-1-shared-usea1-02.graphassets.com",
      },
    ],
  },

  // Note: If GSAP tweens or R3F uniforms freeze/fail to update,
  // leave reactCompiler disabled (or false) since they rely on mutable refs.
  // reactCompiler: true,
};

export default nextConfig;