const { apiV1Path, distPath } = require('./paths')

const { NODE_ENV = 'development' } = process.env
const envConfig = require(`./environments/${NODE_ENV}`)

const commonConfig = {
  HOST: process.env.HOST || 'localhost',
  API_V1: {
    URL: '/api/v1',
    PATH: apiV1Path
  },
  SERVER_OPTIONS: {
    CORS: {
      credentials: true,
      maxAge: 86400000
    },
    PAYLOAD: {
      limit: '50mb'
    },
    SESSION: {
      SECRET: {
        session: 'Uafnakfai11414jkzmfmnzkap'
      }
    }
  },
  DIST_PATH: distPath
}

module.exports = { ...commonConfig, ...envConfig }
