'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      this.belongsTo(models.FoodCategory),
      this.belongsToMany(models.Party_Order, {
        through: "Order_Food",
      });
    }
  }
  Food.init({
    CategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods'
  });
  return Food;
};