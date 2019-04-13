const path = require('path');

const npmLibConfig = {
    entry: {
        'base-converter.js': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name]',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
        ]
    },
};

const demoConfig = {
    entry: {
        'demo.bundle.js': './demo/demo.js',
    },
    output: {
        path: path.resolve(__dirname, 'demo/'),
        filename: '[name]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                ],
            },
        ],
    },
};

module.exports = [npmLibConfig, demoConfig];
