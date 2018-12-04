const { webpackConfigPath } = require('../paths')

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  WEBPACK_BUNDLE: `${webpackConfigPath}/webpack.config.dev.js`,
  MONGO_CONFIG: {
    URI: 'mongodb://localhost:27017/upschool',
    OPTIONS: {
      keepAlive: true,
      reconnectTries: 30,
      socketTimeoutMS: 0,
      useNewUrlParser: true
    }
  }
}
