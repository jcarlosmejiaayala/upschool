const { webpackConfigPath } = require('./paths')
module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 8080,
  WEBPACK_BUNDLE: `${webpackConfigPath}/webpack.config.prod.js`,
  MONGO_CONFIG: {
    URI: '',
    OPTIONS: {
      keepAlive: true,
      reconnectTries: 30,
      socketTimeoutMS: 0,
      useNewUrlParser: true
    }
  }
}
