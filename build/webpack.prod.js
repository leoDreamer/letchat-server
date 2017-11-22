const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = merge(baseConfig, {
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(), // 高频使用模块分配短ID
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
});

module.exports = config;
