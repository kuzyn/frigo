var express = require('express');
var router = express.Router();

/* GET doc page */
router.get('/', function(req, res, next) {
  res.render('docs', req.locals);
});

module.exports = router;
