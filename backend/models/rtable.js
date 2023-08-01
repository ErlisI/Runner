'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Restaurant);
      this.hasMany(models.Party_Order);
    }
  }
  rTable.init({
    tableNum: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    RestaurantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rTable',
    tableName: 'rTables',
  });
  return rTable;
};