'use strict';
var webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        filename: './build/ngexplorerVuejsClient.js',
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'}
        ]
    }
}
