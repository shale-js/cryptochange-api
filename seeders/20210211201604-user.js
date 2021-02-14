'use strict';
const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([{
      firstname: 'Admin',
      lastname: '',
      email: 'test@example.com',
      password: 'test@example.com',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
