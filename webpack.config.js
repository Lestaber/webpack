/* eslint-disable indent */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'js/main.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'image',
          name: "[name].[ext]"
        },
      },
      {
        test: /\.(mp3|ogg|ac3|m4a|caf)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'sound',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [' ** / * '],
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    port: 5000
  }
};
