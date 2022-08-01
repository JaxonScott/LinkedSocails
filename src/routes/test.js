const { Router } = require('express')

const router = Router()

router.use((req, res, next) => {
  console.log('Inside text auth check ')
  console.log(req.user)
  if (req.user) next()
  else res.send(401)
})

router.get('/', (req, res) => {
  res.send('ROUTER LOL HOKY SHIT ')
})

router.get('/shopping/cart', (req, res) => {
  const { cart } = req.session
  if (!cart) {
    res.send('no cart session')
  } else {
    res.send(cart)
  }
})

router.post('/shopping/cart/item', (req, res) => {
  const { item, quantity } = req.body
  const cartItem = { item, quantity }
  const { cart } = req.session
  if (cart) {
    req.session.cart.items.push(cartItem)
  } else {
    req.session.cart = {
      items: [cartItem],
    }
  }
  res.send(201)
})

module.exports = router
