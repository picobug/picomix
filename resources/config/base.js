const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin")
const base = {
	devServer: {
		contentBase: path.resolve(__dirname, "../../public"),
		historyApiFallback: true,
		open: true,
		compress: true
	},
	module: {
		rules: [
			{
				test: /\.ejs$/,
				loader: "ejs-loader",
				query: {
					includePaths: [path.resolve(__dirname, "./resources/templates/")]
				}
			},
			{
				test: /\.(coffee|cjsx)$/,
				exclude: /node_modules/,
				loader: "coffee-loader",
				options: {
					transpile: {
						presets: [
							"react",
							[
								"env",
								{
									modules: false,
									targets: {
										browsers: ["last 2 versions", "ie > 8"],
										uglify: true
									}
								}
							]
						],
						plugins: ["transform-object-rest-spread"]
					}
				}
			}
		]
	},
	plugins: [
		new SWPrecacheWebpackPlugin({
			cacheId: "keepomix",
			filename: "sw.js",
			maximumFileSizeToCacheInBytes: 4194304,
			minify: true,
			staticFileGlobsIgnorePatterns: [/public\/.*\.html/],
			runtimeCaching: [
				{
					handler: "cacheFirst",
					urlPattern: /fonts\/.*$/
				}
			]
		}),
		new HTMLPlugin({
			title: "Picobug Development",
			template: path.resolve(__dirname, "../templates/default.ejs"),
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			inject: false,
			appMountIds: ["ts", "js", "coffee"],
			serviceWorker: false // "/sw.js"
		})
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "../assets"),
			store: path.resolve(__dirname, "../store"),
			libs: path.resolve(__dirname, "../lib")
		},
		extensions: [".coffee", ".cjsx"]
	}
}

module.exports = base
