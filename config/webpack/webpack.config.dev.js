/* eslint-disable global-require */
const { HotModuleReplacementPlugin, IgnorePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const globImporter = require('node-sass-glob-importer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  assetsDirAllFiles,
  clientDir,
  distDir,
  extensions,
  mainEntryPointPath,
  modules,
  node,
  nodeModulesDir,
  publicPath,
  templatePath
} = require('./paths')

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],

    main: [
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      mainEntryPointPath
    ]
  },

  output: {
    publicPath,

    chunkFilename: '[name].chunk.js',

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    path: distDir,

    pathinfo: true
  },

  optimization: {
    runtimeChunk: true,

    minimize: false
  },

  resolve: {
    extensions,

    modules
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,

        exclude: nodeModulesDir,

        include: clientDir,

        use: {
          loader: 'babel-loader',

          options: {
            babelrc: false,

            retainLines: true,

            cacheDirectory: true,

            cacheCompression: false,

            presets: [
              ['@babel/preset-react', { development: true }],
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['>2%', 'not ie 11']
                  }
                }
              ]
            ],

            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 2
                }
              ],
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-syntax-import-meta',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-json-strings',
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-throw-expressions',
              'react-hot-loader/babel'
            ]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,

        use: [
          'style-loader',
          {
            loader: 'css-loader',

            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',

            options: {
              ident: 'postcss',

              plugins: [
                require('postcss-flexbugs-fixes'),

                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },

                  stage: 3
                })
              ]
            }
          },
          {
            loader: 'sass-loader',

            options: {
              importer: globImporter()
            }
          }
        ]
      },
      {
        test: /\.(jpg|svg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HotModuleReplacementPlugin(),

    new IgnorePlugin(/^\.\/locale$/, /moment$/),

    new CopyWebpackPlugin(
      [
        {
          from: assetsDirAllFiles,
          to: distDir,
          ignore: ['index.html'],
          flatten: true
        }
      ],

      { debug: 'debug' }
    ),

    new HtmlWebpackPlugin({
      template: templatePath,

      inject: true
    })
  ],

  node,

  performance: false,

  devServer: {
    publicPath,

    noInfo: true,

    stats: {
      colors: true,

      hash: false,

      timings: true,

      chunks: false,

      chunkModules: false,

      modules: false
    }
  }
}
