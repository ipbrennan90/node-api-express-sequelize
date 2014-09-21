
/*!
 * Module dependencies.
 */

module.exports = function (router) {

  var orm = require('orm'),
    fs = require('fs');

  // routes absolute to /page/form
  router.get('/', function (req, res) {
    res.json({});
  });

};