import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
		// 将此处路径设置为你当前项目的绝对路径
		root: __dirname,
	},
};

export default nextConfig;
