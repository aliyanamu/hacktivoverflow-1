const express = require('express'),
     router = express.Router(),
     { isLogin } = require('../middlewares/auth'),
     { addQuest, getAllQuest, getOneQuest, updQuest, delQuest, upvoteQuest, downvoteQuest } = require('../controllers/questions')

/* GET questions listing. */
router.get('/x', function(req, res, next) {
  res.send('enter questions list')
})

router
  .get('/', getAllQuest)

  .get('/:id', getOneQuest)

  .post('/', isLogin, addQuest)

  .patch('/:id', updQuest)

  .delete('/:id', delQuest)

module.exports = router
