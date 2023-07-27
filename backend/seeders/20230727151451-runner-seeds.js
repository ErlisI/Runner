'use strict';

const dailyreport = require('../models/dailyreport');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "daily_report",
      [{
        date:1-1-2001,
        ecost: 3000,
        scost:2000,
        net:1000,
      createdAt:new Date(),
      updatedAt:new Date(),
      },],{}
    );
    const DailyReportID=const queryInterface.sequelize.query(`SELETE id FROM dayily_report`);
  },

  async down (queryInterface, Sequelize) {
    
  }
};
