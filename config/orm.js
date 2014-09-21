var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var _ = Sequelize.Utils._;
var sequelize = null;
var config = require('./config');
var db = {};

sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  dialect: config.db.type, //could be mongo, mysql, maria see
  syncOnAssociation: true,
  define: {
    underscored: true,
    freezeTableName: false,
    syncOnAssociation: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false
  },
  pool: {
    maxConnections: 5,
    maxIdleTime: 30
  }
});

fs.readdirSync(config.models).forEach(function (file) {
  var model = sequelize.import(path.join(config.models, file));
  db[model.name] = model
});

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

/*sequelize
  .sync({force:true})
  .complete(function(err) {
    if (!!err) {
      console.log('An error occurred while creating the table:', err)
    } else {
      console.log('DB synced')
    }
  });*/

module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);