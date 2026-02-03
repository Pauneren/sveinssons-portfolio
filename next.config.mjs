/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    basePath: '/sveinssons-portfolio',
    assetPrefix: '/sveinssons-portfolio',
    images: {
        unoptimized: true
    }
};

export default nextConfig;
