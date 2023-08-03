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
          rName: 'name',
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
      "rTables",
      [
        {
          tableNum: 1,
          RestaurantId: restaurantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "foodcategories",
      [
        {
          type: "Appetizer",
          RestaurantId: restaurantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
    const foodcategories = await queryInterface.sequelize.query(`SELECT id FROM foodcategories`);
    const foodCategoryId = foodcategories[0][0].id;
    
    await queryInterface.bulkInsert(
      "foods",
      [
        {
          name: "Pizza",
          price: 20,
          FoodCategoryId: foodCategoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("foods", null, {});
    await queryInterface.bulkDelete("foodcategories", null, {});
    await queryInterface.bulkDelete("rTables", null, {});
    await queryInterface.bulkDelete("restaurants", null, {});
  }
};
