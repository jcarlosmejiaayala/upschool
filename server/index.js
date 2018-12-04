#!usr/bin/env node

/* eslint-disable global-require */
const { extname } = require('path')
const compression = require('compression')
const connectMongo = require('connect-mongo')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const crypto = require('crypto')
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const multer = require('multer')
const passport = require('passport')
const session = require('express-session')
const validator = require('express-validator')

const {
  API_V1,
  DIST_PATH,
  ENV,
  HOST,
  MONGO_CONFIG,
  PORT,
  SERVER_OPTIONS,
  WEBPACK_BUNDLE
} = require('./config')
const MongoStore = connectMongo(session)
const webpackConfig = require(WEBPACK_BUNDLE)
const IS_DEV = ENV === 'development'

const server = express()
const storage = multer.diskStorage({
  destination: 'uploads/',

  filename(req, file, cb) {
    crypto.pseudoRandomBytes(
      16,
      (err, raw) =>
        err
          ? cb(err)
          : cb(null, `${raw.toString('hex')}${extname(file.originalname)}`)
    )
  }
})

mongoose.connect(
  MONGO_CONFIG.URI,
  MONGO_CONFIG.OPTIONS
)

// middlewares setup
server.use(compression({ level: 9 }))
server.use(cors(SERVER_OPTIONS.CORS))
server.use(helmet())
server.use(express.json(SERVER_OPTIONS.PAYLOAD))
server.use(express.urlencoded({ ...SERVER_OPTIONS.PAYLOAD, extended: false }))
server.use(multer({ storage }).single('file'))
server.use(validator())
server.use(cookieParser())
server.use(
  session({
    secret: SERVER_OPTIONS.SESSION.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)
server.use(passport.initialize())
server.use(morgan('dev'))

// serve routes
server.use(
  API_V1.URL,
  require('./routes')({
    apiPath: API_V1.PATH,
    express
  })
)

if (IS_DEV) {
  const compiler = require('webpack')(webpackConfig)

  server.use(
    require('webpack-dev-middleware')(compiler, compiler.options.devServer)
  )

  server.use(require('webpack-hot-middleware')(compiler))
} else {
  server.use(express.static(DIST_PATH))

  server.get('*', (req, res) => {
    res.sendFile(`${DIST_PATH}/index.html`)
  })
}

server.listen(PORT, HOST, () => {
  console.log(
    `Server listening on \x1b[42m\x1b[1mhttp://${HOST}:${PORT}\x1b[0m in \x1b[41m${ENV}\x1b[0m 🌎...`
  )
})

process.on('uncaughtException', err => {
  console.error({ err }, 'Uncaught Exception')
  process.exit(1)
})

module.exports = server
