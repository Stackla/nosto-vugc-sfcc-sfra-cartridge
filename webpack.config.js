'use strict';

var path = require('path');
var jsFiles = require('sgmf-scripts').createJsPath();
var argv = require('yargs').argv;
var staticDirectory = './cartridges/int_stackla/cartridge/static';

module.exports = [
    {
        mode: 'production',
        name: 'js',
        entry: jsFiles,
        devtool: 'source-map',
        output: {
            path: path.resolve(path.resolve(staticDirectory)),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /bootstrap(.)*\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env'],
                            plugins: ['@babel/plugin-proposal-object-rest-spread'],
                            cacheDirectory: true
                        }
                    }
                }
            ]
        }
    }
];
