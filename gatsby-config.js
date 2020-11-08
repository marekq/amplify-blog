module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "server",
        defaultSizes: "gzip",
        devMode: true
      },
    },
  ],
}