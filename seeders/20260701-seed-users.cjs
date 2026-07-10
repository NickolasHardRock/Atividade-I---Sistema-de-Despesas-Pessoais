'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const saltRounds = 10;

    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const nickPassword = await bcrypt.hash('senha123', saltRounds);

    await queryInterface.bulkInsert('users', [
      { name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin', createdAt: now, updatedAt: now },
      { name: 'Nickolas', email: 'nickolas@example.com', password: nickPassword, role: 'user', createdAt: now, updatedAt: now }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['admin@example.com', 'nickolas@example.com']
    }, {});
  }
};
