/**
 * As our first step, we'll pull in the user's webpack.mix.js
 * file. Based on what the user requests in that file,
 * a generic config object will be constructed for us.
 */

require("laravel-mix/src/index")
require(Mix.paths.mix())

/**
 * Just in case the user needs to hook into this point
 * in the build process, we'll make an announcement.
 */

Mix.dispatch("init", Mix)

/**
 * Now that we know which build tasks are required by the
 * user, we can dynamically create a configuration object
 * for Webpack. And that's all there is to it. Simple!
 */

let WebpackConfig = require("laravel-mix/src/builder/WebpackConfig")
const config = new WebpackConfig().build()

config.module.rules.forEach((item, i) => {
	if ("loaders" in item && typeof item.loaders == "object") {
		let exitst = 0
		let postcss = true
		item.loaders.forEach((loader, ix) => {
			if (loader === "css-loader") {
				exitst = ix
				config.module.rules[i].loaders[ix] = {
					loader: "css-loader",
					options: {
						modules: true,
						minimize: true,
						localIdentName: "[local]--[hash:base64:5]",
						options: { importLoaders: 1 }
					}
				}
			}
			if (loader === "postcss-loader") {
				postcss = false
			}
		})
		if (exitst && postcss) {
			item.loaders.splice(exitst + 1, 0, "postcss-loader")
		}
	}
})
module.exports = config
