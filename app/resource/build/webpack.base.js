const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除打包出的目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取css

const root = process.cwd();
const sourceDir = "/app/resource";

// const vue = {
//   loader: {
//     css: ExtractTextPlugin.extract({
//         fallback: "vue-style-loader", //resolve-url-loader may be chained before sass-loader if necessary
//         use: ["css-loader", "sass-loader"]
//     })
//   }
// };

const config = {
  entry: {
    main: `${sourceDir}/index.js`,
    venders: ["vue", "vue-router", "vuex"]
  },
  output: {
    path: path.resolve(root, "view/static"),
    publicPath: "/",
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "vue$": "vue/dist/vue.js",
      "src": sourceDir
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: [sourceDir]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [sourceDir]
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        }),
        include: [sourceDir]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "file-loader?name=imges/[name].[ext]"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "file-loader?name=file/[name].[ext]"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("view", {
      root: "view"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new HtmlWebpackPlugin({
      template: `${sourceDir}/index.html`,
      title: "Leo",
      filename: "index.html",
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      vue: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: "css-loader"
            }),
            sass: ExtractTextPlugin.extract({
              fallback: "vue-style-loader",
              use: "css-loader!sass-loader"
            })
          }
        }
    }),
    new ExtractTextPlugin({ filename: "app.css", allChunks: true })
  ]
};

module.exports = config;
