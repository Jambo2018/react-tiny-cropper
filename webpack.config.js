// const path = require("path");
const HWP = require("html-webpack-plugin")

module.exports = {
    entry: __dirname + "/example/index.tsx",
    output: {
        path: __dirname + "/dist",
        filename: "index.js"
    },
    mode: "development",
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HWP({
            template: __dirname + "/example/index.html"
        }),
    ]
}