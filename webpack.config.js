var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
        entry: APP_DIR + '/index.jsx',
        output: {
                path: BUILD_DIR,
                filename: 'bundle.js'
        },
        devServer: {
                public: 'reactapp.cloud:443',
                host: '0.0.0.0',
                port: 443,
                contentBase: 'src/client/',
                compress: true,
        },
        module : {
                rules: [
                        {
                                test : /\.jsx?/,
                                include : APP_DIR,
                                loader : 'babel-loader'
                        }
                ]
        },
        mode: 'development'
};

module.exports = config;

