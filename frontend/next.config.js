/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    })
    return config
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "img-cdn.hltv.org",
      "avatars.githubusercontent.com",
    ],
  },
}
