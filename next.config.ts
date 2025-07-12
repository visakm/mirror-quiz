import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  transpilePackages: ["@mirror-map/ui"],
  webpack: (config, { dev, isServer }) => {
    // Webpack config for twin.macro packages
    if (
      !config.module.rules.some(
        (rule: any) => rule.test && rule.test.toString().includes("twin")
      )
    ) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "packages/ui-components")],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["next/babel"],
              plugins: ["twin.macro", "styled-components"],
            },
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;
