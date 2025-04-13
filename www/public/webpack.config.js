const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
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
    devMiddleware: { writeToDisk: true }, // IMPORTANT: webpack 5 need this turned on to enable CopyWebpackPlugin, see https://stackoverflow.com/a/76124968
    compress: true,
    port: 8080,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "./index.html", to: "./" },
        { from: "*.css", to: "./" },
        { from: "*.js", to: "./" },
      ],
    }),
  ],
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
