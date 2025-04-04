// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
          pathname: "/a/**",
        },
        {
          protocol: "https",
          hostname: "picsum.photos",
          pathname: "/**",
        },
      ],
    }
  }
  
  export default nextConfig