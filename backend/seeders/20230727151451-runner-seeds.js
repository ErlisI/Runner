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
          updatedAt: new Date()
        },
      ],
      {}
    );
    const restaurants = await queryInterface.sequelize.query(`SELECT id FROM restaurants`);

    const rId = restaurants[0][0].id;

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null, {});
  }
};
