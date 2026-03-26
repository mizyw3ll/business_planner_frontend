import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL || "http://business_planner_api:8000", // имя контейнера и порт API
  },
};

export default nextConfig;
