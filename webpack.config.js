const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './sjs/wallet.js', // Your entry point file
    output: {
        filename: 'bundle.js', // The output bundle
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Cleans the /dist folder before each build
    },
    mode: 'development', // Use 'production' for final builds
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile modern JS to older JS for compatibility
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Where to serve files from
        },
        port: 3000, // Development server port
        open: true, // Opens the browser on startup
    }
    ,
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Your HTML file to serve
            inject: 'body',
        }),
    ],
};
