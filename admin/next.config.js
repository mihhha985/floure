const { loadEnvConfig } = require('@next/env');
const { resolve } = require('path');
loadEnvConfig(resolve(__dirname, '..'));
const apiUrl = new URL(process.env.API_URL || `${process.env.API_PROTOCOL || 'http'}://${process.env.API_HOST || '127.0.0.1'}:${process.env.API_PORT || '8000'}`);
/** @type {import('next').NextConfig} */
module.exports = {
  env: { serverUrl: apiUrl.origin },
  images: { remotePatterns: [{ protocol: apiUrl.protocol.replace(':', ''), hostname: apiUrl.hostname, port: apiUrl.port }] },
};
