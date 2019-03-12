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
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' },
            { test: /\.scss$/, use: [
                { loader: "style-loader" }, 
                { loader: "css-loader", options: { sourceMap: true } }, 
                { loader: "sass-loader", options: { sourceMap: true } }
            ] },
            { test: /\.css$/, use: [
                { loader: "style-loader" }, 
                { loader: "css-loader", options: { sourceMap: true } }, 
                { loader: "sass-loader", options: { sourceMap: true } }
            ] },
        ]
    }
};
