'use strict';

const webpack = require('webpack');
const path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
var vue = path.join(__dirname, 'src/vue.js');

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
          phaser: phaser,
          vue: vue,
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
        ]
    }

};
