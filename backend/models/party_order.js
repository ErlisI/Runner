'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party_Order extends Model {
    
    static associate(models) {
      this.belongsTo(models.rTable),
      this.belongsTo(models.Restaurant),
      this.belongsToMany(models.Food, {
        through: "Order_Food",
      });
    }
  }
  Party_Order.init({
    Total: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN,
    rTableId: {
      type: DataTypes.INTEGER,
      references: {
        model: "rtables",
        key: "id",
      },},
      RestaurantId:  {
        type: DataTypes.INTEGER,
        references: {
          model: "restaurants",
          key: "id",
        },},
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Party_Order',
    tableName: 'party_orders'
  });
  return Party_Order;
};