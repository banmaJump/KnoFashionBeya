const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          ecma: 5,
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxSize: 200000, 
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    // new CleanWebpackPlugin({
    //  cleanOnceBeforeBuildPatterns: ['**/*'], 
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});

// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
// const TerserWebpackPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');

// module.exports = merge(common, {
//   mode: 'production',
//   devtool: 'source-map',
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserWebpackPlugin({
//         terserOptions: {
//           ecma: 5,
//           compress: {
//             drop_console: true,
//           },
//           output: {
//             comments: false,
//           },
//         },
//       }),
//     ],
//     splitChunks: {
//       chunks: 'all',
//       maxSize: 200000, // 200 KB
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all',
//         },
//         default: {
//           minChunks: 2,
//           priority: -20,
//           reuseExistingChunk: true,
//         },
//       },
//     },
//   },
//   performance: {
//     hints: 'warning',
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000,
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//     fallback: {
//       process: require.resolve('process/browser'),
//     },
//   },
//   plugins: [
//     new CleanWebpackPlugin(), 
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('production'),
//       'process.browser': JSON.stringify(true),
//       'process': JSON.stringify({
//         env: {
//           NODE_ENV: 'production'
//         }
//       }),
//     }),
//   ],
// });
