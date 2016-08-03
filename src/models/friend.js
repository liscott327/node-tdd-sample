'use strict';

module.exports = (sequelize, DataTypes) => {
  var friend = sequelize.define('friend', {
    name: DataTypes.STRING,
    facebookid: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return friend;
};
