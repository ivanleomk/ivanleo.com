const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
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
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
});
