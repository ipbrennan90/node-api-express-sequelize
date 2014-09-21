
/*!
 * Module dependencies.
 */

module.exports = function (router) {

  var orm = require('orm'),
    Page = orm.Page;

  router.param('slug', function (req, res, next, slug) {
    if (slug.match(/^(\w+[-\w+]+)$/)) {
      Page.find({where: {slug: slug}})
        .success(function (page) {
          req.page = page;
          next()
        }).error(function (err) {
          next(err)
        })
    } else {
      res.status(400)
    }
  });

  // routes absolute to /page
  router.get('/', function (req, res, next) {
    Page.findAll({
      attributes: ['id', 'parent_id', 'rank', 'level', 'title'],
      order: 'level ASC, rank ASC'
    }).success(function (pages) {
      res.json(pages);
    }).error(function(err){
      next(err)
    })
  });

  router.get('/:slug', function (req, res) {
    res.json(req.page)
  });

};
