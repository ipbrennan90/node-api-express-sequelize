
/**
 * Module dependencies.
 */

var fs = require('fs');
var config = require('config');
var express = require('express');

/**
 * Expose
 */

module.exports = function (app) {

  // Bootstrap controllers-routes/api
  // page.js transforms => to /page
  // page-form.js transforms => to /page/form
  fs.readdirSync(config.controllers).forEach(function (file) {
    var router = express.Router();
    require(config.controllers + '/' + file)(router);
    file = '/' + file.replace(/\.js/, '').replace(/\-/, '/');
    console.log(file);
    app.use(file, router);
  });

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    var status = 500;
    if (err.status && err.status === parseInt(err.status)) {
      status = err.status
    }
    res.status(status).json({result: 'error', data: err});
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
