import path from 'path'
import webpack from 'webpack'

export default {
	entry: [
		'webpack-hot-middleware/client', 
		path.join(__dirname, '/client/index.js')
	],
	module: {
	  rules: [
		{
		  test: /\.(js|jsx)$/,
		  exclude: /node_modules/,
		  use: ['babel-loader']
		}
	  ]
	},
	resolve: {
	  extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
}