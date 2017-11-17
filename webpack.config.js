module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                configFile: 'eslint-config-airbnb'
            }
        }]
    }
};