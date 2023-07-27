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
      this.hasOne(models.FoodCategory);
      this.hasMany(models.Table);
    }
  }
  Restaurant.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rName: DataTypes.STRING,
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