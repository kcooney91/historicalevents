const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    //entry point where we start bundling.
    entry: "./src/index.js",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {presets:["@babel/env"]},
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    resolve: { extensions: ["*",".js",".jsx"]},

    //Where we put the build
    output: {
        path: path.resolve(__dirname, "build/"),
        publicPath: "/build/",
        filename: "bundle.js",
        clean: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "public", to: ""}
            ]
        })
    ],
}