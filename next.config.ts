/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   remotePatterns: [
    { protocol: 'https', hostname: 'i.pravatar.cc' },
    { protocol: 'https', hostname: 'unsplash.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'res.cloudinary.com' },
    { protocol: 'https', hostname: 'www.freepik.com' },
    { protocol: 'https', hostname: 'stock.adobe.com' },
    { protocol: 'https', hostname: 'api.dicebear.com'}
  ],
  },
};

module.exports = nextConfig;
