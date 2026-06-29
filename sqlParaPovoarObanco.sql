

SELECT * FROM despesasdb.expenses;

select * from despesasdb.category;

select * from despesasdb.users;

drop table despesasdb.expenses;
drop table despesasdb.users;
drop table despesasdb.category;

DELETE FROM despesasdb.users
WHERE id = 9;

-- Inserir uma categoria
INSERT INTO despesasdb.category ( name, description,createdAt,updatedAt)
VALUES ('Alimentação', 'Despesas com comida e restaurantes',NOW(),NOW());

-- Inserir um usuário
INSERT INTO despesasdb.users (name, email,password,role,createdAt,updatedAt)
VALUES ( 'Nickolas', 'nickolas@example.com','qualquercoisa123','admin',NOW(),NOW());

-- Inserir um usuário
INSERT INTO despesasdb.users (name, email,password,role,createdAt,updatedAt)
VALUES ( 'Mestre dos Magos', 'Abra@quadabra.com','ClaraBaradaNickito','MASTER',NOW(),NOW());


INSERT INTO despesasdb.expenses (title, amount,  date, description, status, fkUsuarioId, fkCategoryId, createdAt, updatedAt)
VALUES 
('Jantar', 120.50, '2026-06-25', 'Jantar com amigos', 'PAGA', 1, 1, NOW(), NOW()),
('Supermercado', 350.00, '2026-06-20', 'Compras do mês', 'PAGA', 1, 1, NOW(), NOW()),
('Cinema', 45.00, '2026-06-18', 'Sessão de filme', 'PENDENTE', 1, 1, NOW(), NOW()),
('Gasolina', 200.00, '2026-06-15', 'Abastecimento do carro', 'PAGA', 1, 1, NOW(), NOW()),
('Farmácia', 120.00, '2026-06-12', 'Remédios e vitaminas', 'PAGA', 1, 1, NOW(), NOW()),
('Academia', 90.00, '2026-06-10', 'Mensalidade academia', 'PENDENTE', 1, 1, NOW(), NOW()),
('Restaurante', 150.00, '2026-06-08', 'Almoço em família', 'PAGA', 1, 1, NOW(), NOW()),
('Internet', 120.00, '2026-06-05', 'Mensalidade internet', 'PAGA', 1, 1, NOW(), NOW()),
('Energia elétrica', 180.00, '2026-06-03', 'Conta de luz', 'PENDENTE', 1, 1, NOW(), NOW()),
('Água', 95.00, '2026-06-02', 'Conta de água', 'PAGA', 1, 1, NOW(), NOW()),
('Roupa', 250.00, '2026-06-01', 'Camisa e calça novas', 'PAGA', 1, 1, NOW(), NOW());