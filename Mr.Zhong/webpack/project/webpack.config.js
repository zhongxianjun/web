const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	devServer: {
		contentBase: './dist'
	},
	devtool:'inline-source-map',
	plugins:[
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: '输出管理666',
			filename: 'index.html',
			template: './src/index.html',
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			title: '输出管理666',
			filename: 'movie.html',
			template: './src/movie.html',
			inject: 'body',
			chunks: ['print']
		})
	],
	output:{
		filename:'[name].bundle.js',
		path: path.resolve(__dirname,'dist'),
	},
	module: {
	    rules: [
	        {
	        	test: /\.css$/,
	        	use: [
	          		'style-loader',
	          		'css-loader'
	        	]
	      	},
	      	{
	      		test: /\.scss$/,
	      		use:[
	      			'style-loader',
	      			'css-loader',
	      			'sass-loader'
	      		]
	      	},
	      	{
	      		test: /\.(png|jpg|svg|gif)$/,
	      		use: [
	      			'file-loader'
	      		]
	      	}
	    ]
	}
};