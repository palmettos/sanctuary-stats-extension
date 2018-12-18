const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// defines where the bundle file will live
const bundlePath = path.resolve(__dirname, 'dist/');

module.exports = (_env,argv) => {
    let entryPoints = {
        VideoOverlay: {
            path: './src/VideoOverlay.tsx',
            outputHtml: 'video_overlay.html',
            build: true
        },
        LiveConfig: {
            path: './src/LiveConfig.tsx',
            outputHtml: 'config.html',
            build: true
        },
        Mobile: {
            path: './src/Mobile.tsx',
            outputHtml: 'mobile.html',
            build: true
        }
    };

    let entry = {};

    // edit webpack plugins here!
    let plugins = [
        new webpack.HotModuleReplacementPlugin()
    ];

    for(name in entryPoints) {
        if (entryPoints[name].build) {
            entry[name] = entryPoints[name].path;
            if (argv.mode === 'production') {
                plugins.push(new HtmlWebpackPlugin({
                    inject: true,
                    chunks: [name],
                    template: './template.html',
                    filename: entryPoints[name].outputHtml
                }));
            }
        }
    }

    let config = {
        //entry points for webpack- remove if not used/needed
        entry,
        optimization: {
            minimize: false // neccessary to pass Twitch's review process
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    exclude: /node_modules/
                },
                {
                    enforce: 'pre',
                    test: /\.js$/, loader: 'source-map-loader'
                },
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        output: {
            filename: '[name].bundle.js',
                path: bundlePath
        },
        plugins
    };
    if (argv.mode === 'development') {
        config.devServer = {
            contentBase: path.join(__dirname,'public'),
            host: argv.devrig ? 'localhost.rig.twitch.tv' : 'localhost',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            port: 8080
        };
        if (fs.existsSync(path.resolve(__dirname,'conf/server.key'))) {
            config.devServer.https = {
                key: fs.readFileSync(path.resolve(__dirname,'conf/server.key')),
                cert: fs.readFileSync(path.resolve(__dirname,'conf/server.crt'))
            };
        }
    }

    return config;
}
