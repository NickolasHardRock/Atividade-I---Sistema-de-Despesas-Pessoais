import express from 'express'
import ExpenseView from './src/view/expenseView.js';
import UserView from './src/view/userView.js';
import ExpenseControler from './src/controller/expenseControler.js';
import sequelize from './src/config/db.js';
import {user,expense,initModels } from './src/models/index.js';
import userView from './src/view/userView.js';

const app = express();

app.use(express.json());

const PORT = 3000;


app.get('/', (req, res) => {
  res.send("Olá Mundo!");
})


// Expenses

app.get('/api/v1/despesas/', ExpenseView.getExpense)

app.post('/api/v1/despesas/', ExpenseView.create)

app.put('/api/v1/despesas/:id', ExpenseView.update)

app.delete('/api/v1/despesas/:id', ExpenseView.delete)

// Usuarios

app.get('/api/v1/usuarios/',UserView.getUser)

app.post('/api/v1/usuarios/',UserView.create)

app.put('/api/v1/usuarios/:id',UserView.update)

app.delete('/api/v1/usuarios/:id', UserView.delete)

async function popularBase() {

  // Categoria: Doce
  await ExpenseControler.create("Banoff", 263.33, "Doce", "2026-03-10", "O doce perfeito",null);
  await ExpenseControler.create("Brigadeiro Gourmet", 45.00, "Doce", "2026-03-10", "Clássico brasileiro com chocolate belga",null);
  await ExpenseControler.create("Cheesecake Frutas Vermelhas", 120.00, "Doce", "2026-03-12", "Sobremesa cremosa e refrescante",null);
  await ExpenseControler.create("Torta Holandesa", 98.50, "Doce", "2026-03-10", "Camadas irresistíveis de creme e chocolate",null);
  await ExpenseControler.create("Brownie de Nutella", 75.00, "Doce", "2026-03-10", "Intenso e macio, para os chocólatras",null);

  // Categoria Bebida
  await ExpenseControler.create("Café Expresso", 12.50, "Bebida", "2026-03-11", "Energia para começar o dia",null);
  await ExpenseControler.create("Suco Natural de Laranja", 9.90, "Bebida", "2026-03-12", "Refrescante e cheio de vitamina C",null);
  await ExpenseControler.create("Chá Verde", 15.00, "Bebida", "2026-03-13", "Leve e antioxidante",null);
  await ExpenseControler.create("Smoothie de Morango", 22.00, "Bebida", "2026-03-14", "Cremoso e nutritivo",null);
  await ExpenseControler.create("Cerveja Artesanal IPA", 28.90, "Bebida", "2026-03-15", "Amargor equilibrado e aroma cítrico",null);

  // Categoria Comida
  await ExpenseControler.create("Pizza Margherita", 89.90, "Comida", "2026-03-12", "Clássico italiano",null);
  await ExpenseControler.create("Hambúrguer Artesanal", 45.00, "Comida", "2026-03-13", "Suculento e cheio de sabor",null);
  await ExpenseControler.create("Sushi Combo 20 peças", 120.00, "Comida", "2026-03-14", "Variedade de peixes frescos",null);
  await ExpenseControler.create("Lasanha Bolonhesa", 95.00, "Comida", "2026-03-15", "Receita tradicional italiana",null);
  await ExpenseControler.create("Salada Caesar", 38.00, "Comida", "2026-03-16", "Leve e crocante",null);

  // Categoria Educação
  await ExpenseControler.create("Livro JS Avançado", 120.00, "Educação", "2026-03-15", "Estudo para melhorar no Node",null);
  await ExpenseControler.create("Curso Online React", 250.00, "Educação", "2026-03-16", "Aprendizado prático de front-end",null);
  await ExpenseControler.create("Workshop Docker", 180.00, "Educação", "2026-03-17", "Infraestrutura moderna para devs",null);
  await ExpenseControler.create("Assinatura Plataforma EAD", 99.00, "Educação", "2026-03-18", "Acesso ilimitado a cursos",null);
  await ExpenseControler.create("Mentoria Backend", 400.00, "Educação", "2026-03-19", "Acompanhamento personalizado",null);

  // Categoria Esporte
  await ExpenseControler.create("Tênis Esportivo", 350.00, "Esporte", "2026-03-18", "Para correr com conforto",null);
  await ExpenseControler.create("Bola de Futebol", 120.00, "Esporte", "2026-03-19", "Oficial e resistente",null);
  await ExpenseControler.create("Bicicleta Mountain Bike", 1800.00, "Esporte", "2026-03-20", "Ideal para trilhas",null);
  await ExpenseControler.create("Camisa de Time", 250.00, "Esporte", "2026-03-21", "Uniforme oficial",null);
  await ExpenseControler.create("Kit Musculação", 600.00, "Esporte", "2026-03-22", "Completo para treinos em casa",null);


}


async function main() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({force: true })
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
    await popularBase()
    app.listen(PORT, () => {
      console.log("Servidor foi iniciado na porta:", PORT);
    });
  } catch (error) {
    console.error("Erro ao sincronizar banco:", error)
  }
}

main()

