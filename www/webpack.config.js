const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./index.html", to: "./" },
        { from: "*.css", to: "./" },
        { from: "*.js", to: "./" },
      ],
    }),
  ],
  entry: {
    main: "./bootstrap.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bootstrap.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   }
      // }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "inline-source-map",
};
