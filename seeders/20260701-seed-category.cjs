'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('category', [
      { name: 'Alimentação', description: 'Compras e restaurantes', createdAt: now, updatedAt: now },
      { name: 'Transporte', description: 'Ônibus, combustível, apps', createdAt: now, updatedAt: now },
      { name: 'Lazer', description: 'Cinema, passeios', createdAt: now, updatedAt: now }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', {
      name: ['Alimentação', 'Transporte', 'Lazer']
    }, {});
  }
};
