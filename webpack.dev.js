
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './example/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'boundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          // {
          //   loader: 'tslint-loader',
          //   options: {
          //     configFile: path.resolve(__dirname, './tslint.json'),
          //   },
          // },
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
  ],
};
