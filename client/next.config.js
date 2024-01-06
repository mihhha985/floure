/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://localhost:8000',
  },
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
			},
		],
	}
}

module.exports = nextConfig
