const express = require('express'),
     router = express.Router(),
     { isLogin } = require('../middlewares/auth'),
     { addAns, editAns, upvoteAns, downvoteAns } = require('../controllers/answers')

/* GET answers listing. */
router.get('/', function(req, res, next) {
  res.send('enter answers list')
})

router
  .post('/:id', isLogin, addAns)

  .patch('/:id', editAns)

module.exports = router
