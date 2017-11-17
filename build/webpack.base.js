const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除打包出的目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取css

const sourceDir = path.resolve(__dirname, "../resource");

const config = {
  entry: {
    main: `${sourceDir}/index.js`,
    vendor: ["vue", "vue-router", "vuex"]
  },
  output: {
    path: path.resolve(sourceDir, "../view/static"),
    publicPath: "/",
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "vue$": "vue/dist/vue.common.js",
      "src": sourceDir,
      "assets": path.resolve(sourceDir, "assets")
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: ["node_modules"]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!sass-loader"
        })
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
    new CleanWebpackPlugin(path.resolve(sourceDir, "../view"), {
      root: path.resolve(sourceDir, "../../")
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new HtmlWebpackPlugin({
      template: `${sourceDir}/index.html`,
      title: "Leo",
      filename: `${path.resolve(sourceDir, "../view")}/index.html`,
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
    new ExtractTextPlugin({ filename: "css/[name].[contenthash].css", allChunks: true })
  ]
};

module.exports = config;
