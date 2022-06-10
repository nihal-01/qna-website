/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'gansons.com',
            'www.theportlandclinic.com',
            'media.istockphoto.com',
            'dergreif-online.de',
            'res.cloudinary.com',
        ],
    },
    env: {
        BASE_URL: 'http://localhost:3000',
        // API_URL: 'http://localhost:3000/api',
        API_URL: 'https://qna-website.vercel.app/api',
    },
};

module.exports = nextConfig;
