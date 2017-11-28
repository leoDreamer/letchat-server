const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清除打包出的目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取css
const assert = require("assert");
const glob = require("glob");
const merge = require("webpack-merge");

const sourceDir = "resource";
const view = "dist/view";
const staticPath = "dist/static";
const root = process.cwd();

function sourceMap (suffix) {
  const maps = {};
  glob.sync(`${sourceDir}/pages/**/*.${suffix}`).forEach(function (url) {
    const ret = url.match(`${sourceDir}\/pages\/(.*).${suffix}$`);
    assert(ret);

    maps[ret[1]] = path.resolve(root, ret[0]);
  });

  return maps;
};

const entry = sourceMap("js");
const htmls = sourceMap("html");

let config = {
  entry: Object.assign({}, entry, {
    vendors: ["vue", "vue-router", "vuex", "axios", "vue-axios", "babel-polyfill"]
  }),
  output: {
    path: path.resolve(root, staticPath),
    publicPath: "/",
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".vue", ".scss"],
    alias: {
      vue$: "vue/dist/vue.common.js",
      assets: path.resolve(root, sourceDir, "assets"),
      components: path.resolve(root, sourceDir, "components"),
      root
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
        loader: "babel-loader"
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
          use: "css-loader?importLoaders=2!postcss-loader!sass-loader"
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
    new CleanWebpackPlugin(path.resolve(root, "dist"), {
      root
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      chunks: Object.keys(entry),
      minChunks: entry.length
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

config = merge(config, {
  plugins: Object.keys(htmls).map(function (key) {
    return new HtmlWebpackPlugin({
      filename: path.resolve(root,  view, `${key.split("/")[0]}.html`),
      template: path.resolve(root, htmls[key]),
      inject: true,
      chunks: ["vendors", key]
    });
  })
});

module.exports = config;
