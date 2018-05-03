var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	entry: [APP_DIR + '/index.jsx', 'webpack-hot-middleware/client'],
        output: {
                path: BUILD_DIR,
                filename: 'bundle.js'
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
        mode: 'development',
        devtool: "#cheap-module-source-map",
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		// Use NoErrorsPlugin for webpack 1.x
		new webpack.NoEmitOnErrorsPlugin()
	]
};

module.exports = config;

