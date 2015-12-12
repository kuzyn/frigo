var express = require('express');
var router = express.Router();

var usersCounter = 0;
var appTitle = "icebox";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: appTitle, users: usersCounter});
});

module.exports = router;
