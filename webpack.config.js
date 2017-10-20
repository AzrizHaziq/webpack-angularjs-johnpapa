'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';
const devTool = isProd ? 'source-map' : 'inline-source-map'

module.exports = function makeWebpackConfig() {
    const config = {};

    config.entry = isTest ? void 0 : {
        app: './src/app/app-core/app.js'
    };

    config.output = isTest ? {} : {
        path: __dirname + '/dist',
        publicPath: isProd ? '/' : 'http://localhost:4300/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    };

    config.devtool = devTool;

    config.module = {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader', query: {sourceMap: true} },
                        { loader: 'postcss-loader'}
                    ],
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    };

    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/i,
            options: {
                postcss: {
                    plugins: [autoprefixer]
                }
            }
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(isProd),
            VERSION: JSON.stringify("5fa3b9"),
            APP: JSON.stringify({ ENV })
        })
    ];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './src/public/index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
        )
    }

    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin(),
            new CopyWebpackPlugin([{
                from: __dirname + '/src/public'
            }])
        )
    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    config.resolve = {
        modules : ['node_modules', './src/app/']
    }

    return config;
}();
