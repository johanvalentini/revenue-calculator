const path = require('path');

module.exports = {
  entry: './src/easy-widget.js',
  output: {
    filename: 'easy-widget.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};