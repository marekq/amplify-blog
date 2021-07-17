module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "static",
        reportFilename: "report.html"
      }
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: [
          { domain: 'https://marek.rocks', crossOrigin: true },
          { domain: 'https://ux25dr2sk5aypkzbvsgysa2ev4.appsync-api.eu-west-1.amazonaws.com', crossOrigin: true }
        ],
      },
    },
  ]
}