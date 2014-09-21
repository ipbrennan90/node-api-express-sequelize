

/*!
 * Module dependencies.
 */

module.exports = function (router) {

  var orm = require('orm'),

    jwt = require('jsonwebtoken');

  // routes absolute to /auth
  router.post('/login', function (req, res, next) {
    var user = req.body.user,
      pass = req.body.pass;
    if (user && pass) {
      if (user == 'demo' && pass == 'demo') {
        var token = jwt.sign({'user': user}, req.pkg.name, {expiresInMinutes: 60});
        res.json({result: 'ok', data: {token: token}})
      } else {
        next(new Error('false credentials provided'))
      }
    } else {
      next(new Error('no credentials provided'))
    }
  })

};
