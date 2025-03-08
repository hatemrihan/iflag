/** @type {import('next').NextConfig} */
const nextConfig = {
//   webpack: (config) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//     };
//     return config;
//   },
// };
output:'export',
images: {
  domains: ['vercel.com'],
  unoptimized: true,
},
typescript:{ignoreBuildErrors:true},
eslint:{ignoreDuringBuilds:true},
}


module.exports = nextConfig; 