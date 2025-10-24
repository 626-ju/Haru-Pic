import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    clean: true,
  },
  entry: './src/index.js',
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource', // SVG 파일을 일반 파일처럼 처리
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource', // PNG, JPG, GIF 처리
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    new Dotenv(),
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
