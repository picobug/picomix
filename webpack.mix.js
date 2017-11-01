let mix = require("laravel-mix")
let path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

mix
	.webpackConfig({
		devServer: {
			contentBase: path.resolve(__dirname, "public"),
			historyApiFallback: true,
			open: true,
			compress: true
		},
		module: {
			rules: [
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
											browsers: ["> 2%"],
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
			new HTMLPlugin({
				template: "./resources/index.template.html",
				minify: {
					collapseWhitespace: true,
					removeComments: true
				}
			})
		],
		resolve: {
			alias: {
				assets: path.resolve(__dirname, "./resources/assets")
			}
		}
	})
	.setPublicPath("public")

mix.js("./resources/assets/coffee/index.coffee", "./public/js/editor-coffee.js")
mix.js("./resources/assets/js/index.js", "./public/js/editor-js.js")
mix.ts("./resources/assets/ts/index.tsx", "./public/js/editor-ts.js")
mix.extract(["react", "react-dom", "./resources/assets/sw.ts"])
if (mix.isProduction) {
	mix.version()
}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.ts(src, output); <-- Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.dev');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
