var path = require('path');

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'./react/main.js'
	],
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'app.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel'
		}]
	}
}