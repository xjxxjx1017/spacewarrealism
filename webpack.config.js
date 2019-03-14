'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        app: [
            path.resolve(__dirname, 'src/app.ts')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
          phaser: path.join(__dirname, '/node_modules/phaser/dist/phaser.js'),
          vue: path.join(__dirname, 'src/vue.js'),
          element_ui: path.join(__dirname, '/node_modules/element-ui/lib/index.js'),
          element_ui_css: path.join(__dirname, '/node_modules/element-ui/lib/theme-chalk/index.css'),
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            ElementUI: 'element-ui'
        })
    ]
};
