import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
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
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
