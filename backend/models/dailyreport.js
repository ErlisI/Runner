'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DailyReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Restaurant);
    }
  }
  DailyReport.init({
    rId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    eCost: DataTypes.INTEGER,
    sCost: DataTypes.INTEGER,
    netProfit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailyReport',
    tableName: 'dailyReports'
  });
  return DailyReport;
};