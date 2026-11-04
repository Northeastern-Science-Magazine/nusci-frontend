/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'northeasternsciencemagazine.github.io',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        // presigned URLs for the nusci-media S3 bucket (magazine archive covers)
        protocol: 'https',
        hostname: 'nusci-media.s3.us-east-1.amazonaws.com',
      },
      // local S3 stand-in from the backend's docker-compose.override.yml
      ...(process.env.NODE_ENV === 'development'
        ? [{ protocol: 'http', hostname: 'localhost', port: '9000' }]
        : []),
    ],
  },
};

export default nextConfig;
