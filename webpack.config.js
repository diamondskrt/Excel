const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (_, argv) => {
  const isDev = argv.mode === 'development';

  const devPlugins = [
    new ESLintPlugin(),
  ];

  const plugins = [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].bundle.css' : '[name].[contenthash].bundle.css',
    }),
  ];

  if (isDev) {
    plugins.concat(devPlugins);
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './main.js',
    },
    output: {
      filename: isDev ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.js'],
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      watchFiles: ['src/**/*'],
      open: isDev,
      port: 9000,
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
