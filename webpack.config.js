const HtmlWebPackPlugin = require('html-webpack-plugin');
const fs = require('fs');

module.exports = {
	entry: fs.existsSync("./src/index.ts") ? "./src/index.ts" : "./src/index.js",

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"]
	},

	devServer: {
		before: (app, server) => {
			require('./api/init.js')(app, server);
		}
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'awesome-typescript-loader'
				}
			},
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./public/index.html",
			filename: "./index.html"
		})
	]
};
