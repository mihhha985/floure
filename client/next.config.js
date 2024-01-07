/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}`,
  },
	images: {
		remotePatterns: [
			{
				hostname: process.env.API_HOST,
			},
		],
	}
}

module.exports = nextConfig
