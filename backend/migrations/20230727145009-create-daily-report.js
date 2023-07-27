'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DailyReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RestaurantId:{
        type:Sequelize.INTEGER,
        reference:{
        modle:"restaurants",
        key:"id",
      },onUpdate:"CASCADE",
       onDelete:"SET NULL"
      },
      date: {
        type: Sequelize.DATE
      },
      ecost: {
        type: Sequelize.INTEGER
      },
      scost: {
        type: Sequelize.INTEGER
      },
      net: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DailyReports');
  }
};
