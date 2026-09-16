/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "northeasternsciencemagazine.github.io",
            },
            {
                protocol: "https",
                hostname: "media.istockphoto.com",
            }
        ],
    },
};

export default nextConfig;
