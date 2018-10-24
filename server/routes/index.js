const express = require('express'),
      router = express.Router(),
      { isSelf } = require("../middlewares/auth")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('You are connected to Hackover')
})

router
    .get('/self', isSelf)

module.exports = router;
