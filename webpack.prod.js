const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: "production",
    entry: './src/client/index.js',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devtool: "source-map",
    stats: "verbose",
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.jpg$/,
                use: "file-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/html/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
}