var express = require('express');
var router = express.Router();
const db = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Music Encyclopedia'});
});

router.post('/', async function(req, res, next) {
  var userName = req.body.Username;
  var passWord = req.body.Password;
  pgClient = db.db;
  var result = await pgClient.query(`
    select count(*)
    from users
    where username = '${userName}' and password = '${passWord}'`);

  if(result[0].count == '0'){
    res.render('index', {title: 'Music Encyclopedia' ,description: 'Incorrect Username or Password.'});
  }
  else{
    res.render('index', {description: 'Failure'});
  }
  
});

module.exports = router;
