const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env, argv) => {
  const envConfig = argv.mode === 'development' ? require('./webpack.dev.js') : require('./webpack.prod.js');
  return merge(common, envConfig);
};

// const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');

// module.exports = (env, argv) => {
//   const envConfig = argv.mode === 'development' ? require('./webpack.dev.js') : require('./webpack.prod.js');
//   return merge(common, envConfig);
// };
