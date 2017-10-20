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

const plugins = []
const modules = []

!isTest && initDefaultScript()
isProd && initProdScript()
isTest && initTestScript()

module.exports = {
    entry : isTest ? void 0 : {
        app: './src/app/app-c/app.js'
    },

    output : isTest ? {} : {
        path: __dirname + '/dist',
        publicPath: isProd ? '/' : 'http://localhost:4300/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
    },

    module : {
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
            },
            ...modules
        ]
    },

    plugins : [
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
        }),
        ...plugins
    ],

    devtool : devTool,

    devServer : {
        contentBase: './src/public',
        stats: 'errors-only'
    },

    resolve : {
        //alias: {
        //    Services : path.resolve(__dirname, '.src/app/services/'),
        //},
        modules: ["node_modules"]
    }
};

function initDefaultScript(){
    plugins.push(
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({filename: 'css/[name].css', disable: !isProd, allChunks: true})
    )
}

function initTestScript(){
    modules.rules.push({
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

function initProdScript(){
    plugins.push(
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    )
}
