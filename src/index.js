const express = require('express')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

//routes
const textRoute = require('./routes/test')
const authRoute = require('./routes/auth')
const profileRoute = require('./routes/profiles')
require('./strategies/local')
require('./database')

const app = express()
const PORT = 3001
app.use(cors({ origin: true, credentials: true }))

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(
  session({
    secret: 'SKjdfklJKSSDVOPLSDKPASD',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
    }),
    cookie: { httpOnly: false },
  })
)

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/text', textRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', profileRoute)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => console.log(`running on PORT: ${PORT}`))
