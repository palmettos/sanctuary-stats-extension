'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/, loader: 'source-map-loader'
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devServer: {
        contentBase: path.resolve(__dirname),
        publicPath: '/dist/',
        host: '127.0.0.1',
        port: 8080,
        open: true
    }
};
