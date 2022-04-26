
const path = require('path');

module.exports = {
  entry: {
    index: './src/Cropper.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  mode: "production",
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
};
