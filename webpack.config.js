
const path = require('path'); 

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    },
  },
};
