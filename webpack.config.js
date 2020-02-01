const path = require('path')
module.exports = {
  entry: `./client/src/index.js`,
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ]
  }
};