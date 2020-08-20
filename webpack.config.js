const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: __dirname,
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      
      {
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        },
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../assets/stylesheets",
            }
          },
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/"
            }
          }
        ]
      },
    ]
  },
  devtool: 'source-map'
};