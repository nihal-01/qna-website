/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'gansons.com',
            'www.theportlandclinic.com',
            'dergreif-online.de',
        ],
    },
};

module.exports = nextConfig;
