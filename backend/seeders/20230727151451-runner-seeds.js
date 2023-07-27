'use strict';

const dailyreport = require('../models/dailyreport');

/** @type {import('sequelize-cli').Migration} */
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
    const DailyReportID=queryInterface.sequelize.query(`SELETE id FROM dayilyreports`);
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
