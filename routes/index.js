const express = require('express');
const router = express.Router();
const pgClient = require('../public/javascripts/db').db;
var currentUser;
var userId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.post('/', async function(req, res, next) {
  var userName = req.body.Username;
  var passWord = req.body.Password;
  var result = await pgClient.query(`
    select count(*)
    from users
    where username = '${userName}' and password = '${passWord}'`);

  if(result[0].count == '1'){
    currentUser = userName
    userId = await pgClient.query(`
      select userid
      from users
      where username = '${userName}'`);
    userId = userId[0].userid;
    res.render('userpage', {user: `Logged in as ${currentUser}`});
  }
  else{
    res.render('index', {description: 'Incorrect Password or Username. Try Again.'});
  }
  
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});

router.post('/register', async function(req, res, next) {
  var userName = req.body.Username;
  var passWord = req.body.Password;
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
      res.render('index', { desciption: 'Account Created'});
  }
  else{
    res.render('register', { description: 'That username already exists.'});
  }
});

router.get('/composer', function(req, res, next) {
  res.render('composer', {});
});

router.post('/composer', async function(req, res, next) {
  var name = req.body.name;
  var bio = req.body.bio;
  var result = await pgClient.query(`
    select count(*)
    from composer
    where name = '${name}'`);

  if(result[0].count == '0'){
    var latestId = await pgClient.query(`
      select composerid
      from composer
      order by composerid desc
      limit 1`);
    
    var nextId = latestId[0].composerid + 1;
    await pgClient.query(`
      insert into composer(composerid, biography, name)
      values(${nextId}, '${bio}', '${name}')`);

    res.render('composer', { result: 'Composer Created!'});
  }
  else{
    res.render('composer', {result: 'This Composer already exists!'});
  }
  
});

router.post('/createCollection', async function(req, res, next) {
  var name = req.body.name;
  var dupCheck = await pgClient.query(`
    select count(*)
    from musiccollection m, users u
    where m.userid = u.userid and u.userid = ${userId} and m.name = '${name}'`);

  if(dupCheck[0].count == '0'){
    var latestId = await pgClient.query(`
      select musiccollectionid
      from musiccollection
      order by musiccollectionid desc
      limit 1`);
    var nextId = latestId[0].musiccollectionid + 1;

    await pgClient.query(`
    insert into musiccollection(musiccollectionid, name, userid)
    values(${nextId}, '${name}', ${userId})`)

    res.render('userpage', { user: `Logged in as ${currentUser}`, creationResult: 'success!'});
  }
  else{
    res.render('userpage', { user: `Logged in as ${currentUser}`, creationResult: 'This collection already exists!'});
  }
});



router.get('/userpage', function(req, res, next) {
  res.render('userpage', { user: `Logged in as ${currentUser}`});
});
module.exports = router;
