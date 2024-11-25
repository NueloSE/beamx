import type { NextConfig } from "next";
require('dotenv').config();

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  env: {
    brian_ai_api_key: process.env.INFURA_IPFS_ID,
  },
};

export default nextConfig;
