const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const baseConfig = require('./webpack.dev.config');

const prodConfiguration = env => {
  return merge([
    {
      optimization: {
        minimizer: [new TerserPlugin()],
      },

      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' }),
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0,
        }),
      ],
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), prodConfiguration(env));
};
