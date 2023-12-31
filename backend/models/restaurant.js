'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.DailyReport);
      this.hasMany(models.FoodCategory);
      this.hasMany(models.rTable);
      this.hasMany(models.Party_Order);
    }
  }
  Restaurant.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rName: {type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurants',
  });
  return Restaurant;
};