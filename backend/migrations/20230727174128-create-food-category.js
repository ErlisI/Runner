'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foodCategories', {
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
      type: {
        type: Sequelize.STRING
      },
      rId: {
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
    await queryInterface.dropTable('foodCategories');
  }
};