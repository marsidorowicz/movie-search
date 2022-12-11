/**
 * @format
 * @type {import('next').NextConfig}
 */

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/t/p/original/**',
			},
		],
	},
}
