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
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../assets/stylesheets",
              // hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  devtool: 'source-map'
};