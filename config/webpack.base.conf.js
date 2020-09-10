const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../public'),
    assets: 'assets/'
}

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: PATHS.src + '/js/index.js',
    output: {
        path: PATHS.dist,
        filename: `js/[name].js`,
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
        rules: [{
            test: /\.(jpe?g|png|svg|gif)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }],
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }, 
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
    ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
        }),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/main.css`,
        }),
        // Сжатие css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}images`,
                    to: `${PATHS.dist}/${PATHS.assets}images`
                },
                {
                    from: `${PATHS.src}/${PATHS.assets}static`,
                    to: `${PATHS.dist}/${PATHS.assets}static`
                },
            ],
        }),
    ],


}