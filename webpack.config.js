const path = require('path');

module.exports = {

	mode: 'development',
	entry: {
		index: path.resolve(__dirname, './public/src/index.ts'), 
		chat: path.resolve(__dirname, './public/src/chat.ts')
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './public/dist'),
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader', loader: "ts-loader" }
			},
			{
				test: /\.(css|scss$)/,
				use: [ { loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' } ]
			},
			{
			     test: /\.(png|jpg|svg)$/,
			     loader: 'url-loader'
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
}