const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    ],
    historyApiFallback: true,
    port: 3001,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});



// const path = require('path');
// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
// const webpack = require('webpack');

// module.exports = merge(common, {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   devServer: {
//     static: [
//     {
//       directory: path.join(__dirname, 'public'),
//     },
//     ],
//     compress: true,
//     port: 3001,
//     historyApiFallback: true,
//     proxy: [
//       {
//         context: ['/api'],
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         logLevel: 'debug',
//       },
//     ],
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('development'),
//         'process.browser': JSON.stringify(true),
//         'process': JSON.stringify({
//           env: {
//             NODE_ENV: 'development'
//           }
//         }),
//       }),
//   ],
//   module: {
//     // 省略
//     options: {
//       sourceMap: sourceMapStatus
//     }
//   }
// });
