const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prod = process.env.NODE_ENV === 'production'
const dev = !prod
const fileExt = (ext) => prod ? `bundle.[hash].${ext}` : `bundle.${ext}`

const JSloaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (dev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: fileExt('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: dev ? 'inline-source-map' : false,
  devServer: {
    port: 3000,
    hot: false
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: prod,
        removeComments: prod,
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: path.resolve(__dirname, 'dist/img'),
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: fileExt('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: JSloaders()
      }
    ],
  },
}