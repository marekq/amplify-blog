module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "static",
        reportFilename: "report.html"
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          { domain: 'https://feed.marek.rocks', crossOrigin: true }
        ]
      },
    },
  ],
}