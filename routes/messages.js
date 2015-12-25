var express = require('express');
var _ = require('lodash');
var router = express.Router();

var collectionName = 'messages';

/* GET all messages. */
router.get('/', function(req, res) {
  var db = req.db;
  var name = collectionName;
  var collection = db.get(name);
  collection.find({}, function(err, doc) {
    if (err) throw err;
    res.json(doc);
  });
});

/* GET a message */
/*router.get('/:id', function(req, res) {
  var db = req.db;
  var name = collectionName;
  var collection = db.get(name);
  collection.find(req.params.id, function(e, doc) {
    res.json(doc);
  });
});*/

/* POST a message */
router.post('/', function(req, res) {
  var db = req.db;
  var name = collectionName;
  var collection = db.get(name);
  if (validate(req.body)) {
    var payload = {
      message: req.body.message,
      meta: {
        keyword: req.body.meta.keyword,
        location: req.body.meta.location
      }
    };
    collection.insert(payload, function (err, doc) {
      if (err) throw err;
    });
    res.json(payload);
  }
  res.sendStatus(400);

  // simple validation before posting to db
  function validate(body) {
    if (!_.isUndefined(body) && !_.isEmpty(body)) {
      if (!_.isEmpty(body.message) && !_.isEmpty(body.meta.keyword) && !_.isEmpty(body.meta.location)) {
        console.log('body false' + JSON.stringify(body));
        return true;
      }
    }
    console.log('body false' + JSON.stringify(body));
    return false;
  }

});

/* DELETE a message */
/*router.delete('/:id', function(req, res) {
  var db = req.db;
  var name = collectionName;
  var collection = db.get(name);
  collection.find({}, function(e, doc) {
    res.json(doc);
  });
});*/

module.exports = router;
