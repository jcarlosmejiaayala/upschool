const { resolve, join } = require('path')

const rootPath = resolve(__dirname, '../../')
const webpackConfigPath = join(rootPath, '/config/webpack')
const distPath = join(rootPath, '/dist')
const apiV1Path = join(rootPath, 'server/api/v1')

module.exports = {
  apiV1Path,
  distPath,
  rootPath,
  webpackConfigPath
}
