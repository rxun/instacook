const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./frontend/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: __dirname + '/frontend/index.js',
  output: {
    filename: 'static/js/main.js',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
    }]
  },
  plugins: [
      htmlPlugin,
      new CompressionPlugin()
  ],
};
