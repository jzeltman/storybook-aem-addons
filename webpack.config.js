var path = require("path");

module.exports = {
    mode: "production",
    entry: {
        "index" : "./src/index.js",
        "aem-grid/index" : "./src/aem-grid/index",
        "aem-grid/register" : "./src/aem-grid/register/index",
        "aem-style-system/index" : "./src/aem-style-system/index",
        "aem-style-system/register" : "./src/aem-style-system/register/index"
    },
    output: {
        path: path.resolve("lib"),
        filename: "[name].js",
        libraryTarget: "commonjs2"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            }
        ]
    },
    // optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	}
	// }
};
