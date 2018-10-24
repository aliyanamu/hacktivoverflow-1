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

  .put('/:id', isLogin, editAns)

  .put('/upvote/:id', isLogin, upvoteAns)

  .put('/downvote/:id', isLogin, downvoteAns)

module.exports = router
