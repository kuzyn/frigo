var express = require('express');
var router = express.Router();

var properties = {
  title: "icecache",
  users: 0
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', properties);
});

module.exports = router;
