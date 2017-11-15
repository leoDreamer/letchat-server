const webpack = require("webpack");
const baseConfig = require("./webpack.base.js");
const merge = require("webpack-merge");

const config = merge(baseConfig, {
    plugins: [
        new webpack.optimize.DedupePlugin(), // 去重交叉依赖
        new webpack.optimize.OccurrenceOrderPlugin(), // 高频使用模块分配短ID
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});

module.exports = config;
