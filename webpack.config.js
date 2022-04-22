
const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    index:'./example/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'example'),
    filename: 'example.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.ts','tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'tslint-loader',
            options: {
              configFile: path.resolve(__dirname, './tslint.json'),
            },
          },
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
        test: /\.(css)$/i,
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
    // new MiniCssExtractPlugin({
    //   filename: 'image-gallery.css',
    // }),
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/example/index.html' }],
    },
  },
};
