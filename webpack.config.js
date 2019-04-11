const path = require('path');

module.exports = {
    entry: {
        'base-converter.js': './src/index.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.test\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-jest',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ]
    },
};

