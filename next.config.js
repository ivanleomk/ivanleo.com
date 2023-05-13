const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "abs.twimg.com" },
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
});
