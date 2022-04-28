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

  if(result[0].count == '1'){
    res.render('index', {title: 'Signed In!', description: `Logged in as ${userName}`});
  }
  else{
    res.render('index', {description: 'Incorrect Password or Username. Try Again.'});
  }
  
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Please create an username and password.'});
});

router.post('/register', async function(req, res, next) {
  var userName = req.body.Username;
  var passWord = req.body.Password;
  pgClient = db.db;
  var result = await pgClient.query(`
    select count(*)
    from users
    where username = '${userName}'`);

  if(result[0].count == '0'){
    var latestId = await pgClient.query(`
      select userid
      from users
      order by userid desc
      limit 1`);
    
    var nextId = latestId[0].userid + 1;
    await pgClient.query(`
      insert into users(userid, username, password)
      values(${nextId}, '${userName}', '${passWord}')`);
      res.render('index', { title: 'Account Created'});
  }
  else{
    res.render('register', { title: 'That username already exists.'});
  }
});

module.exports = router;
