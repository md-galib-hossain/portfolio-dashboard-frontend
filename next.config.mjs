/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol : "https",
                hostname : "**"
            }
        ]
    },
    rules: {
        "react/no-unescaped-entities": "off",
      },
      eslint: {
        ignoreDuringBuilds: false,
      },
}

export default  nextConfig
