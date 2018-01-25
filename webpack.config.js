const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

const plugins =
[
    new HtmlWebpackPlugin
    (
        {
            title: "Project-Boilerplate",
            filename: "index.html",
            template: "template.html"
        }
    ),
    new BrowserSyncPlugin
    (
        {
            host: '192.168.2.47',
            port: 3000,
            proxy: 'http://localhost:9000'
        }
    )
];

const devStyleLoaders = [
  {
    loader: 'style-loader',
  },
  {
    loader: 'css-loader',
  },
  {
    loader: 'sass-loader',
  },
];

module.exports =
{
    entry: path.resolve(__dirname, "src/app.js"),
    output:
    {
        filename: "js/app.bundle.js",
        path: path.resolve(__dirname, "dist/")
    },
    watch: true,
    watchOptions:
    {
      poll: 1000,
      aggregateTimeout: 100
    },

    module:
    {
        rules:
        [
            {
              test: /\.scss$/,
              include: path.resolve(__dirname, 'src/scss'),
              use: devStyleLoaders,
            },
            {
                test: /\*.js$/,
                exclude: /(node_modules|bower_components)/,
                use:
                [
                    {
                        loader: "babel",
                        options:
                        {
                            presets: ["env"]
                        }
                    }
                ]
            }
        ]
    },
    devServer:
    {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      public: "192.168.2.47:3000"
    },
    plugins
}