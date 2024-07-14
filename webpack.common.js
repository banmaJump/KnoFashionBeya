const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/static'),
    filename: 'js/bundle.[contenthash].js',
    publicPath: '/static/',  // ここを確認
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',  // パスの設定
          publicPath: '/static/images/',          // 画像ファイルの公開パスを設定
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: '../index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new WebpackAssetsManifest({
      output: 'asset-manifest.json',
      publicPath: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};



// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// // const CopyWebpackPlugin   = require('copy-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'public/static'),
//     filename: 'js/bundle.[contenthash].js',
//     publicPath: '/static/',
//   },
//   module: {
//     rules: [
//       // {
//       //   test: /\.css$/,
//       //   exclude: /prime(vue|icons).+\.css$/,
//       //   use: [MiniCssExtractPlugin.loader, "css-loader"],
//       // },
//       // {
//       //   test: /prime(vue|icons).+\.css$/,
//       //   use: [
//       //     {
//       //       loader: MiniCssExtractPlugin.loader,
//       //       options: { emit: false, esModule: false },
//       //     },
//       //     "css-loader",
//       //   ],
//       // },
//       {
//         test: /\.css$/i,
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           // {
//           //   loader: 'style-loader',
//           // },
//           {
//             loader: 'css-loader',
//           },
//         ],
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//       {
//         test: /\.(gif|png|jpg|svg)$/,
//         type: "asset",
//         generator: {
//           filename: 'images/[name].[hash][ext]', // 画像の出力パスを指定
//         },
//         parser: {
//           dataUrlCondition: {
//             maxSize: 100 * 1024, 
//           },
//         },
//       },
//       {
//         test: /\.node$/,
//         use: 'file-loader',
//       },
//       {
//         test: /\.d\.ts$/,
//         loader: 'ignore-loader',
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//     fallback: {
//       path: require.resolve('path-browserify'),
//       stream: require.resolve('stream-browserify'),
//       crypto: require.resolve('crypto-browserify'),
//       http: require.resolve('stream-http'),
//       https: require.resolve('https-browserify'),
//       zlib: require.resolve('browserify-zlib'),
//       querystring: require.resolve('querystring-es3'),
//       os: require.resolve('os-browserify/browser'),
//       vm: require.resolve('vm-browserify'),
//       tty: require.resolve('tty-browserify'),
//       constants: require.resolve('constants-browserify'),
//       process: require.resolve('process/browser'), 
//       url: require.resolve('url'), 
//       fs: false,
//       child_process: false,
//       worker_threads: false,
//       module: false,
//       inspector: false,
//       pnpapi: false,
//     },
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//        cleanOnceBeforeBuildPatterns: ['**/*'], 
//     }),
//     new HtmlWebpackPlugin({
//       template: './public/template.html',
//       filename: '../index.html',
//       inject: 'body',
//     }),
//     new MiniCssExtractPlugin({
//       filename: 'styles/[name].[contenthash].css',
//     }),
//     // new CopyWebpackPlugin({
//     //   patterns: [
//     //     {
//     //       from: ${__dirname}/src/assets/images/,
//     //       to: ${__dirname}/public/static/images/,
//     //     }
//     //   ]
//     // }),
//     new webpack.ProvidePlugin({
//       $: 'jquery',
//       jQuery: 'jquery',
//     }),
//   ],
//   performance: {
//     hints: 'warning',
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000,
//   },
// };