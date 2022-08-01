const { Router } = require('express')
const User = require('../database/schemas/User')

const router = Router()

//get any users profile from _id
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id })
    if (!user) {
      res.status(404)
      res.send('Cant find user with this name')
    } else {
      res.send(user)
      res.status(200)
    }
  } catch (err) {
    res.status(404)
    res.send(err)
  }
})

//get user profile from session ID
router.get('/profile', async (req, res) => {
  const userSID = req.session.passport.user
  try {
    const findUserBySid = await User.findOne({ _id: userSID })
    if (findUserBySid) {
      res.status(200)
      res.send(findUserBySid)
    } else {
      res.status(404)
      res.send('cant find user SID')
    }
  } catch (err) {
    console.log(err)
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
    res.send(updateLinks)
    res.status(200)
  } catch (err) {
    console.log(err)
    res.status(400)
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
    res.send(removeLink)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
