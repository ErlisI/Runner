'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Restaurant);
      this.hasMany(models.Food);
    }
  }
  FoodCategory.init({
    type: DataTypes.STRING,
    rId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FoodCategory',
    tableName: 'foodCategories',
  });
  return FoodCategory;
};