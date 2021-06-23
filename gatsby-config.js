module.exports = {
  plugins: [
    "@babel/plugin-transform-react-jsx-source",    
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "static",
        reportFilename: "report.html"
      }
    }
  ]
}