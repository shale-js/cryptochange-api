'use strict';
const { Bolivar } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Bolivar.bulkCreate([{
      value: 100000,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bolivars', null, {});
  }
};
