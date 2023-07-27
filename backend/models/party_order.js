'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party_Order extends Model {
    
    static associate(models) {
      this.belongsTo(models.Table),
      this.belongsToMany(models.Food, {
        through: "Order_Food",
      });
    }
  }
  Party_Order.init({
    FoodId: DataTypes.INTEGER,
    Total: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN,
    TableId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Party_Order',
    tableName: 'party_orders'
  });
  return Party_Order;
};