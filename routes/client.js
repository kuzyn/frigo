var express = require('express');
var http = require('http');
var router = express.Router();

/* GET page */
router.get('/', function(req, res, next) {
  res.render('client', req.locals);
});

module.exports = router;
