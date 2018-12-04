const { resolve } = require('path')

const rootPath = resolve(__dirname, '..', '..')
const nodeModulesDir = resolve(rootPath, 'node_modules')
const clientDir = resolve(rootPath, 'client')
const distDir = resolve(rootPath, 'dist')
const assetsDir = resolve(rootPath, 'assets')
const mainEntryPointPath = resolve(clientDir, 'index.js')
const publicPath = '/'
const extensions = ['.js', '.jsx', '.json']
const modules = [clientDir, nodeModulesDir]
const assetsDirAllFiles = `${assetsDir}/**`
const distHtmlEntry = `${distDir}/index.html`
const templatePath = `${assetsDir}/index.html`
// node modules that should be empty and not available in browser
const node = {
  dgram: 'empty',
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
  child_process: 'empty'
}

module.exports = {
  rootPath,
  nodeModulesDir,
  clientDir,
  distDir,
  mainEntryPointPath,
  publicPath,
  extensions,
  assetsDir,
  assetsDirAllFiles,
  templatePath,
  distHtmlEntry,
  modules,
  node
}
