

SELECT * FROM despesasdb.expenses;

select * from despesasdb.category;

select * from despesasdb.users;

SELECT id, email FROM despesasdb.users WHERE email IN ('admin@example.com','nickolas@example.com');


drop table despesasdb.expenses;
drop table despesasdb.users;
drop table despesasdb.category;

DELETE FROM despesasdb.users
WHERE id = 9;

-- Inserir uma categoria
INSERT INTO despesasdb.category ( name, description,createdAt,updatedAt)
VALUES ('Alimentação', 'Despesas com comida e restaurantes',NOW(),NOW()),
('Transporte', 'Despesas com combustível, ônibus, metrô e manutenção de veículos', NOW(), NOW()),
 ('Lazer', 'Despesas com entretenimento, viagens e hobbies', NOW(), NOW());


-- Inserir um usuário
INSERT INTO despesasdb.users (name, email,password,role,createdAt,updatedAt)
VALUES ( 'Nickolas', 'nickolas@example.com','qualquercoisa123','admin',NOW(),NOW()),
( 'Mestre dos Magos', 'Abra@quadabra.com','ClaraBaradaNickito','MASTER',NOW(),NOW());

INSERT INTO despesasdb.expenses 
(title, amount, date, description, status, fkUsuarioId, fkCategoryId, createdAt, updatedAt)
VALUES
('Pizza delivery', 80.00, '2026-06-15', 'Jantar em casa', 'PAGA', 1, 1, '2026-06-16', '2026-06-16'),
('Mercado local', 200.00, '2026-06-18', 'Compras semanais', 'PENDENTE', 2, 1, '2026-06-19', '2026-06-19'),
('Táxi aeroporto', 150.00, '2026-06-12', 'Corrida até o aeroporto', 'PAGA', 1, 2, '2026-06-13', '2026-06-13'),
('Manutenção moto', 300.00, '2026-06-20', 'Troca de pneus e revisão', 'PENDENTE', 2, 2, '2026-06-21', '2026-06-21'),
('Viagem praia', 1200.00, '2026-06-05', 'Final de semana em Florianópolis', 'PAGA', 1, 3, '2026-06-06', '2026-06-06'),
('Show de rock', 350.00, '2026-06-22', 'Ingressos para show', 'PENDENTE', 2, 3, '2026-06-23', '2026-06-23');
