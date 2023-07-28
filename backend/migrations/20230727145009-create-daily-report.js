'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daily_reports',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RestaurantId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
        model:"restaurants",
        key:"id",
      },onUpdate:"CASCADE",
       onDelete:"CASCADE",
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
    await queryInterface.dropTable('daily_reports');
  }
};