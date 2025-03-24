const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'script.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ],
  // },
  devtool: 'inline-source-map'
};
