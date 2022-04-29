var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Music Encyclopedia'});
  //res.render('register', { title: 'WORKING'});
});

module.exports = router;
