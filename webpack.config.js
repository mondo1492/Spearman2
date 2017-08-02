const path = require('path');

module.exports = {
  entry: './src/spearman.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
