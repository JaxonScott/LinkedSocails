const { Router } = require('express')
const multer = require('multer')
const User = require('../database/schemas/User')

const router = Router()

//get any users profile from _id
router.get('/profile/:id', async (req, res) => {
  const user = await User.findOne({ username: req.params.id })
  if (!user) {
    res.status(404).json({ msg: 'No user found with this id' })
  } else {
    res.send(user).status(200)
  }
})

//get user profile from SID
router.get('/profile', async (req, res) => {
  try {
    const userSID = req.session.passport.user
    const findUserBySID = await User.findOne({ _id: userSID })
    res.send(findUserBySID).status(200)
  } catch (err) {
    res.status(404).json({ msg: 'missing session id' })
  }
})
//change username
router.patch('/profile/username', async (req, res) => {
  try {
    const userSID = req.session.passport.user
    const { username } = req.body
    const userDB = await User.findOne({ username })
    if (userDB) {
      res.status(400).json({ msg: 'username already taken' })
    } else {
      const changeUsername = await User.findOneAndUpdate(userSID, {
        username: username,
      })
      res.status(200).json({ msg: 'username changed!' })
    }
  } catch (err) {
    res.status(400).json({ error: err })
  }
})
//add single link to user profile
router.patch('/profile/addlink', async (req, res) => {
  const userID = req.session.passport.user
  const newLinks = req.body.links
  try {
    const updateLinks = await User.findByIdAndUpdate(userID, {
      $addToSet: { links: newLinks },
    })
    res.send(updateLinks).status(200)
  } catch (err) {
    res.status(500).json({ msg: 'unable to update links' })
  }
})

//remove a single specified link from profile
router.patch('/profile/removelink', async (req, res) => {
  const userID = req.session.passport.user
  const link = req.body.links
  try {
    const removeLink = await User.findByIdAndUpdate(userID, {
      $pull: { links: link },
    })
    res.send(removeLink).status(200)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports = router
