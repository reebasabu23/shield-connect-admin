import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: "sass-embedded",
    includePaths: [path.join(process.cwd(), "public/assets/scss")],
  },
};

export default nextConfig;
