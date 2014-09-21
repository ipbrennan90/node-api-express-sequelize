
/**
 * Module dependencies.
 */

var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var winston = require('winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressJwt = require('express-jwt');
var cors = require('cors');

var config = require('config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {

  app.use(function(req, res, next){
    req.pkg = pkg;
    next()
  });
  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  app.use(express.static(config.root + '/public'));
  // You could serve uploads by another app

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(methodOverride());

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(session({
    secret: pkg.name,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // hours <- mins <- secs <- msecs
    }
  }));

  // JsonWebToken for basic authentication
  // reads 'Authentication' Header in format 'Bearer <token>'
  app.use(expressJwt({secret: pkg.name})
    .unless({path: config.ignoreAuthPaths}));

  // enable cross-origin requests
  app.use(cors(function (req, callback) {
    callback(null, {
      origin: true,
      credentials: true
    })
  }));

};
