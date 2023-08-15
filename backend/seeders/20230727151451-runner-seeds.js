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
      "rtables",
      [
        {
          tableNum: 1,
          RestaurantId: restaurantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableNum: 2,
          RestaurantId: restaurantId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tableNum: 3,
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
        {
          name: "Beer",
          price: 20,
          FoodCategoryId: foodCategoryId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const rtables = await queryInterface.sequelize.query(`SELECT id FROM rtables`);
    const rtablesId = rtables[0][0].id;

    const foods = await queryInterface.sequelize.query(`SELECT id FROM foods`);
    const foodsId1 = foods[0][0].id;
    const foodsId2 = foods[0][1].id;


    await queryInterface.bulkInsert(
      'party_orders',
      [
        {
          Total: 100,
          rTableId: rtablesId,
          RestaurantId: restaurantId,
          open: true,
          date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const party_orders = await queryInterface.sequelize.query(`SELECT id FROM party_orders`);
    const party_orders_Id = party_orders[0][0].id;

    await queryInterface.bulkInsert(
      'order_foods',
      [
        {
          FoodId: foodsId1,
          PartyOrderId: party_orders_Id,
          Quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          FoodId: foodsId2,
          PartyOrderId: party_orders_Id,
          Quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_foods', null, {});
    await queryInterface.bulkDelete('party_orders', null, {});
    await queryInterface.bulkDelete("foods", null, {});
    await queryInterface.bulkDelete("foodcategories", null, {});
    await queryInterface.bulkDelete("rtables", null, {});
    await queryInterface.bulkDelete("restaurants", null, {});
  }
};
