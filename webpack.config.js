'use strict';
var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        filename: './build/bundle.js',
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'}
        ]
    }
}
