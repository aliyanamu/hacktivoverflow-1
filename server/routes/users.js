const express = require('express'),
     router = express.Router(),
     { googleAuth } = require('../middlewares/auth'),
     { list, register, login, googleSignUp, remove } = require('../controllers/users')

/* GET users listing. */
router.get('/x', (req, res, next) => {
  res.send('enter user list')
})

router
  .get('/', list)

  .post('/register', register)

  .post('/login', login)

  .post('/google-signin', googleAuth, googleSignUp)

module.exports = router
