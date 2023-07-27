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
      // define association here
      this.hasMany(models.PartyFood);
      this.belongsTo(models.Restaurant);
    }
  }
  DailyReport.init({
    date: DataTypes.DATE,
    ecost: DataTypes.INTEGER,
    scost: DataTypes.INTEGER,
    net: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DailyReport',
    tableName: 'daily_report',
  });
  return DailyReport;
};