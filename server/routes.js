/* eslint-disable global-require */
const routes = ({ express, apiPath }) => {
  const router = express.Router()

  router.use('/login', require(`${apiPath}/login`)({ express }))

  return router
}

module.exports = routes
