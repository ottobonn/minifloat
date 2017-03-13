let path = require("path");

let CopyWebpackPlugin = require("copy-webpack-plugin");

const buildDir = path.resolve(__dirname, "build");

module.exports = {
  entry: "./main.js",
  output: {
    path: buildDir,
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"]
          }
        }
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "static",
        to: buildDir
      }
    ])
  ]
};
