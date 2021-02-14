'use strict';
const { Petro } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Petro.bulkCreate([{
      value: 60,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Petros', null, {});
  }
};
