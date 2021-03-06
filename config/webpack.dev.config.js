const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, '../src');
const OUTPUT_DIR = path.resolve(__dirname, '../dist');
module.exports = env => {
  const { PLATFORM, VERSION, PUBLIC_URL } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: OUTPUT_DIR,
        publicPath: '/',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader'],
          },
          {
            test: /\.css$/,
            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.s(a|c)ss$/,

            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },

          {
            test: /\.(woff2?|ttf|otf|eot|svg)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.csv$/,
            loader: 'csv-loader',
            options: {
              dynamicTyping: true,
              header: true,
              skipEmptyLines: true,
            },
          },
        ],
      },
      plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
          title: 'Sakchyam',
          template: './src/index.html',
          filename: 'index.html',
          inject: true,
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true,
          },
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(VERSION),
          'process.env.PLATFORM': JSON.stringify(PLATFORM),
          'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
        }),
        new CopyWebpackPlugin([{ from: 'src/static/' }]),
        // new DashboardPlugin(),
      ],
      // devServer: {
      //   inline: true,
      //   port: 3000,
      // },
      devtool: PLATFORM === 'production' ? '' : '#eval-source-map',
    },
  ]);
};
