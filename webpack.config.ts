import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';

import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const base: Configuration = {
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'fonts/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: !isDev,
    minimizer: [new CssMinimizerWebpackPlugin()],
  },
  stats: 'errors-only',
  performance: { hints: false },
  devtool: isDev ? 'inline-source-map' : false,
};

const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
};

const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: './src/preload.ts',
  },
};

const renderer: Configuration = {
  ...base,
  target: 'web',
  entry: {
    renderer: './src/renderer.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new MiniCssExtractPlugin(),
  ],
};

export default [main, preload, renderer];
