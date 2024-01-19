/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
  	login: '123rus',
		password: '123rus',
		serverUrl: 'http://localhost:8000',
		token: '123',
		PORT: 8000,
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
