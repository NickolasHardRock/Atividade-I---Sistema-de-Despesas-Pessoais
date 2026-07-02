'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const [users] = await queryInterface.sequelize.query(
      `SELECT id, email FROM users WHERE email IN ('admin@example.com','nickolas@example.com');`
    );

    const [categories] = await queryInterface.sequelize.query(
      `SELECT id, name FROM category WHERE name IN ('Alimentação','Transporte','Lazer');`
    );

    const getUserId = (email) => users.find(u => u.email === email)?.id;
    const getCategoryId = (name) => categories.find(c => c.name === name)?.id;

    const expenses = [
      { title: 'Almoço', amount: 45.50, date: new Date('2026-06-01'), description: 'Almoço com cliente', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Alimentação'), createdAt: now, updatedAt: now },
      { title: 'Combustível', amount: 120.00, date: new Date('2026-06-03'), description: 'Abastecimento carro', status: 'PENDENTE', fkUsuarioId: getUserId('admin@example.com'), fkCategoryId: getCategoryId('Transporte'), createdAt: now, updatedAt: now },
      { title: 'Supermercado', amount: 230.75, date: new Date('2026-06-05'), description: 'Compras semanais', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Alimentação'), createdAt: now, updatedAt: now },
      { title: 'Uber', amount: 32.40, date: new Date('2026-06-06'), description: 'Corrida para reunião', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Transporte'), createdAt: now, updatedAt: now },
      { title: 'Cinema', amount: 28.00, date: new Date('2026-06-07'), description: 'Filme com amigos', status: 'PAGA', fkUsuarioId: getUserId('admin@example.com'), fkCategoryId: getCategoryId('Lazer'), createdAt: now, updatedAt: now },
      { title: 'Café', amount: 12.50, date: new Date('2026-06-08'), description: 'Café da manhã', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Alimentação'), createdAt: now, updatedAt: now },
      { title: 'Manutenção carro', amount: 450.00, date: new Date('2026-06-10'), description: 'Troca de óleo e filtros', status: 'PENDENTE', fkUsuarioId: getUserId('admin@example.com'), fkCategoryId: getCategoryId('Transporte'), createdAt: now, updatedAt: now },
      { title: 'Show', amount: 180.00, date: new Date('2026-06-12'), description: 'Ingresso show local', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Lazer'), createdAt: now, updatedAt: now },
      { title: 'Almoço executivo', amount: 78.90, date: new Date('2026-06-14'), description: 'Almoço de negócios', status: 'PENDENTE', fkUsuarioId: getUserId('admin@example.com'), fkCategoryId: getCategoryId('Alimentação'), createdAt: now, updatedAt: now },
      { title: 'Estacionamento', amount: 15.00, date: new Date('2026-06-15'), description: 'Estacionamento centro', status: 'PAGA', fkUsuarioId: getUserId('nickolas@example.com'), fkCategoryId: getCategoryId('Transporte'), createdAt: now, updatedAt: now },
      { title: 'Assinatura streaming', amount: 29.90, date: new Date('2026-06-16'), description: 'Plano mensal', status: 'PAGA', fkUsuarioId: getUserId('admin@example.com'), fkCategoryId: getCategoryId('Lazer'), createdAt: now, updatedAt: now }
    ];

    // Filtra apenas se as FKs foram encontradas (evita inserir com null)
    const validExpenses = expenses.filter(e => e.fkUsuarioId && e.fkCategoryId);

    if (validExpenses.length > 0) {
      await queryInterface.bulkInsert('expenses', validExpenses, {});
    } else {
      console.warn('Nenhuma despesa válida para inserir: verifique se users e category foram seedados.');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('expenses', {
      title: ['Almoço', 'Combustível', 'Supermercado', 'Uber', 'Cinema', 'Café', 'Manutenção carro', 'Show', 'Almoço executivo', 'Estacionamento', 'Assinatura streaming']
    }, {});
  }
};
