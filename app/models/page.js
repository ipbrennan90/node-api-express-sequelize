
/*!
 * Module dependencies
 */

module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define('Page', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      references: Page,
      referencesKey: 'id'
    },
    level: {
      type: DataTypes.INTEGER
    },
    rank: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [/^(\w+[-\w+]+)$/],
          msg: 'Slug contain only letters, numbers and short dashes "-"'
        },
        isUnique: function(value, next) {
          Page.find({
            where: {slug: value},
            attributes: ['id']
          })
            .done(function(error, page) {
              if (error)
                return next(error);
              return !page;
            });
        }
      },
      allowNull: true
    },
    content: DataTypes.TEXT
  }, {
    tableName: 'pages', // this will define the table's name
    timestamps: true,
    underscored: true, // make updated_at instead of updatedAt
    classMethods: {
      associate: function(models) {
      }
    }
  });

  sequelize
    .sync()
    .complete(function(err) {
      if (!!err) {
        console.log('An error occurred while creating the table:', err)
      } else {
        console.log('table pages created')
      }
    });

  return Page;
};
