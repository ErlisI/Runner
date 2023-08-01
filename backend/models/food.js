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
    FoodCategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'foods'
  });
  return Food;
};