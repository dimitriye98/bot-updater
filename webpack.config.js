const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
	{
		mode: 'development',
		entry: './src/main.ts',
		target: 'electron-main',
		node: {
			__dirname: false
		},
		module: {
			rules: [{
				test: /\.ts$/,
				include: /src/,
				use: [{loader: 'ts-loader'}]
			}]
		},
		output: {
			path: __dirname + '/dist',
			filename: 'main.js'
		}
	},
	{
		mode: 'development',
		entry: './src/preload.ts',
		target: 'electron-main',
		node: {
			__dirname: false
		},
		module: {
			rules: [{
				test: /\.ts$/,
				include: /src/,
				use: [{loader: 'ts-loader'}]
			}]
		},
		output: {
			path: __dirname + '/dist',
			filename: 'preload.js'
		}
	},
	{
		mode: 'development',
		entry: './src/minimize.ts',
		target: 'electron-renderer',
		devtool: 'source-map',
		node: {
			__dirname: false
		},
		module: { rules: [{
				test: /\.ts(x?)$/,
				include: /src/,
				use: [{ loader: 'ts-loader' }]
			}] },
		output: {
			path: __dirname + '/dist',
			filename: 'minimize.js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html'
			})
		]
	}
];
