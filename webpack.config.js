const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =(env,options)=> {
    const mode = options.mode;
    return{
        mode:mode,
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].[hash].bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css/,
                    use: [
                        mode === 'production'? MiniCssExtractPlugin.loader: 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins:[
            new MiniCssExtractPlugin({
            filename: '[name].[hash].bundle.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        ]
    }
}