module.exports = {
  plugins: [
    `gatsby-plugin-preact`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "server",
        defaultSizes: "gzip",
        devMode: true,
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          { domain: 'https://marek.rocks', crossOrigin: true },
          { domain: 'https://www.marek.rocks', crossOrigin: true },
          { domain: 'https://feed.marek.rocks', crossOrigin: true }
        ],
      },
    },
  ],
}