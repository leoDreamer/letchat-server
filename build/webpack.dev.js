const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 生成html
const baseConfig = require("./webpack.base.js");
const assert = require("assert");
const glob = require("glob");
const merge = require("webpack-merge");

const sourceDir = "resource";
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


const htmls = sourceMap("html");

const config = merge(baseConfig, {
  plugins: Object.keys(htmls).map(function (key) {
    return new HtmlWebpackPlugin({
      filename: path.resolve(root,  staticPath, `${key.split("/")[0]}.html`),
      template: path.resolve(root, htmls[key]),
      inject: true,
      chunks: ["vendors", key]
    });
  })
});

module.exports = config;
