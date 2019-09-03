const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: process.env.MODE === 'prod' ? 'production' : 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};
