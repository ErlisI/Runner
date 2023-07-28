'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Restaurant);
      this.hasMany(models.Party_Order);
      
    }
  }
  Table.init({
    tablenumber: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Table',
    tableName:  'tables',
  });
  return Table;
};

/*
'use strict';

const dailyreport = require('../models/dailyreport');

@type {import('sequelize-cli').Migration}
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dailyreports",
      [{
        date:1-1-2001,
        ecost: 3000,
        scost:2000,
        net:1000,
      createdAt:new Date(),
      updatedAt:new Date(),
      
      },],{}
    );
    const DailyReportID=queryInterface.sequelize.query(`SELETE id FROM dayily_report`);
    await queryInterface.bulkInsert("tables",
    [{
      tablenumber:5,
      createdAt:new Date(),
      updatedAt:new Date(),
    },],)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("dailyreports",null,{});
    await queryInterface.bulkDelete("tables",null,{})

  }
};
*/