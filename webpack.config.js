const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'client'),
  devtool: 'source-map',
  entry: {
    app: './root',
    vendor: ['react', 'react-dom', 'react-router', 'react-router-redux',
      'material-ui', 'axios'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/app.bundle.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: (info) => encodeURI(info.resourcePath),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: path.join(__dirname, 'client'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.scss/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
            'postcss-loader'
          ],
        })
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'static/' },
    ], {
      copyUnmodified: true,
    }),
    new ExtractTextPlugin({
      filename: "./styles/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require("postcss-import")({
            addDependencyTo: webpack
          }),
          require('postcss-cssnext'),
        ],
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/vendor.bundle.js'}),
  ],
};

