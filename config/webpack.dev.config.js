const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');
module.exports = env => {
  const { PLATFORM, VERSION, API_URL } = env;

  // PLATFORM === "local"
  // ? (PUBLIC_PATH = "http://localhost:8080/dist/")
  // : (PUBLIC_PATH = "http://localhost:3000/dist/");

  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: path.join(__dirname, '..', 'dist'),
      },
      // devServer: {
      //   publicPath: PUBLIC_PATH
      // },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
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
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.woff(2)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            use: ['url-loader?limit=10000'],
          },
          {
            test: /\.svg(2)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            use: ['url-loader?limit=10000'],
          },
          {
            test: /\.(ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
            use: ['file-loader'],
          },
          // {
          //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          //   use: ["file-loader"]
          // }
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'example',
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
          'process.env.API_URL': JSON.stringify(API_URL),
        }),
        new CopyWebpackPlugin([{ from: 'src' }]),
      ],
    },
  ]);
};
