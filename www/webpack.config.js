const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "./index.html", to: "./" }],
    }),
  ],
  entry: {
    main: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8080,
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
  devtool: "inline-source-map",
};
