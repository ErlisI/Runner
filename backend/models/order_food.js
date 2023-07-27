'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Food extends Model {
    static associate(models) {
      this.belongsTo(models.Party_Order);
      this.belongsTo(models.Food)
    }
  }
  Order_Food.init({
    OrderId:{
      type: DataTypes.INTEGER,
      references: {
        model: "party_orders",
        key: "id",
      },
    },
    FoodId:{
      type: DataTypes.INTEGER,
      references: {
        model: "foods",
        key: "id",
      },
    },
    Quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Food',
    tableName: 'order_foods'
  });
  return Order_Food;
};