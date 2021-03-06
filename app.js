var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// API routes
var docs = require('./routes/docs');
var messages = require('./routes/messages');

// Client route
var client = require('./routes/client');

// Databases
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/frigo');

// Boom
var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Local app config
app.locals.title = 'frigo';
app.locals.email = 'hello@samuelcousin.com';
app.locals.url = 'http://localhost:4000';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

// pass our db to our routes
app.use(function(req, res, next){
  req.db = db;
  next();
});


// API endpoints
app.use('/api/docs', docs);
app.use('/api/messages', messages);

// App landing
app.use('/', client);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
