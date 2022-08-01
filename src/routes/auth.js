const { Router } = require('express')
const passport = require('passport')
const session = require('express-session')
const { hashPassword, comparePassword } = require('../utils/helpers')
const User = require('../database/schemas/User')

const router = Router()

//login user
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(
    'logged in ' + req.sessionID + 'user id' + req.session.passport.user
  )
  res.send(200)
})

//register new user
router.post('/register', async (req, res) => {
  const { email, username } = req.body
  const userDB = await User.findOne({ $or: [{ email }, { username }] })
  if (userDB) {
    res.status(400).send({ msg: 'User already exist' })
  } else {
    const password = hashPassword(req.body.password)
    console.log(password)
    const newUser = await User.create({
      username: req.body.username,
      password,
      email,
    })
    res.send(201)
  }
})

//logout user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    req.session.destroy()
    res
      .clearCookie('connect.sid', { path: '/', domain: 'localhost' })
      .status(200)
      .send('Ok.')
    if (err) {
      return next(err)
    }
  })
})

router.use((req, res, next) => {
  console.log('inside check')
  if (req.user) next()
  else res.send(401)
})

router.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

module.exports = router
