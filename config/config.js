/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
  models: path.normalize(__dirname + '/../app/models'),
  controllers: path.normalize(__dirname + '/../app/controllers'),
  uploads: path.normalize(__dirname + '/../uploads'),
  ignoreAuthPaths: [
    '/auth/login',
    '/proxy.html'
  ]
};

/**
 * Expose
 */

module.exports = {
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
