/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'bn24bnapi.test',
			},
			{
				protocol: 'https',
				hostname: 'abnpibn.bgwebserver.com',
			},
			{
				protocol: 'https',
				hostname: 'bn-cdn.banglanews24.com',
			},
			{
				protocol: 'https',
				hostname: 'reachableads-av.s3.ap-southeast-1.amazonaws.com',
			}
		],
	},
	generateBuildId: async () => {
        return 'enbuild-id-0.1.25';
	},
	async rewrites() {
		return [
			{
				source: '/rss.xml',
				destination: '/api/rss',
			},
			{
				source: '/sitemap.xml',
				destination: '/api/sitemap',
			},
			{
				source: '/daily-sitemap/sitemap-section.xml',
				destination: '/api/daily-sitemap/sitemap-section',
			},
			{
				source: '/daily-sitemap/:path/sitemap.xml',
				destination: '/api/daily-sitemap/:path/sitemap',
			}
		]
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
					{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
				]
			}
		]
	}
}

export default nextConfig;