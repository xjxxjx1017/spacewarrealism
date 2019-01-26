'use strict';

const webpack = require('webpack');
const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        vendor: ['pixi', 'p2', 'phaser'],
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
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'ts-loader', exclude: '/node_modules/' },
            { test: /phaser-arcade-physics\.js/, use: ['expose-loader?Phaser'] },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /p2\.js$/, use: ['expose-loader?p2'] }
        ]
    }

};
