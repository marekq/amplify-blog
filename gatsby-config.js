module.exports = {
  plugins: [
    "gatsby-plugin-minify",
    "@babel/plugin-transform-react-jsx-source",
    {
      resolve: "gatsby-plugin-brotli",
      options: {
        extensions: ["css", "html", "js", "svg", "svg/xml", "xml", "json"],
      },
    },    
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        analyzerMode: "static",
        reportFilename: "report.html"
      },
    },
  ],
}