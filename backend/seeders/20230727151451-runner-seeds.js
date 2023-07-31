"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "restaurants",
      [
        {
          username: "erlis",
          email: "erlis@erlis.com",
          password: await bcrypt.hash("password", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const restaurants = await queryInterface.sequelize.query(`SELECT id FROM restaurants`);
    const restaurantId = restaurants[0][0].id;

    await queryInterface.bulkInsert(
      "foodCategories",
      [
        {
          type: "Appetizer",
          rId: restaurantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "foods",
      [
        {
          name: "Pizza",
          price: 20,
          CategoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null, {});
  }
};
