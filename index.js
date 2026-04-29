import express from 'express'
import ExpenseView from './src/view/expenseView.js';
import ExpenseControler from './src/controller/expenseControler.js';
const app = express();

app.use(express.json());

const PORT = 3000;



// Categoria: Doce
 ExpenseControler.create("Banoff", 263.33, "Doce", "2026-03-10", "O doce perfeito");
  ExpenseControler.create("Brigadeiro Gourmet", 45.00, "Doce", "2026-03-10", "Clássico brasileiro com chocolate belga");
  ExpenseControler.create("Cheesecake Frutas Vermelhas", 120.00, "Doce", "2026-03-12", "Sobremesa cremosa e refrescante");
  ExpenseControler.create("Torta Holandesa", 98.50, "Doce", "2026-03-10", "Camadas irresistíveis de creme e chocolate");
  ExpenseControler.create("Brownie de Nutella", 75.00, "Doce", "2026-03-10", "Intenso e macio, para os chocólatras");

// Categoria Bebida
  ExpenseControler.create("Café Expresso", 12.50, "Bebida", "2026-03-11", "Energia para começar o dia");
  ExpenseControler.create("Suco Natural de Laranja", 9.90, "Bebida", "2026-03-12", "Refrescante e cheio de vitamina C");
  ExpenseControler.create("Chá Verde", 15.00, "Bebida", "2026-03-13", "Leve e antioxidante");
  ExpenseControler.create("Smoothie de Morango", 22.00, "Bebida", "2026-03-14", "Cremoso e nutritivo");
  ExpenseControler.create("Cerveja Artesanal IPA", 28.90, "Bebida", "2026-03-15", "Amargor equilibrado e aroma cítrico");

// Categoria Comida
  ExpenseControler.create("Pizza Margherita", 89.90, "Comida", "2026-03-12", "Clássico italiano");
  ExpenseControler.create("Hambúrguer Artesanal", 45.00, "Comida", "2026-03-13", "Suculento e cheio de sabor");
  ExpenseControler.create("Sushi Combo 20 peças", 120.00, "Comida", "2026-03-14", "Variedade de peixes frescos");
  ExpenseControler.create("Lasanha Bolonhesa", 95.00, "Comida", "2026-03-15", "Receita tradicional italiana");
  ExpenseControler.create("Salada Caesar", 38.00, "Comida", "2026-03-16", "Leve e crocante");

// Categoria Educação
  ExpenseControler.create("Livro JS Avançado", 120.00, "Educação", "2026-03-15", "Estudo para melhorar no Node");
  ExpenseControler.create("Curso Online React", 250.00, "Educação", "2026-03-16", "Aprendizado prático de front-end");
  ExpenseControler.create("Workshop Docker", 180.00, "Educação", "2026-03-17", "Infraestrutura moderna para devs");
  ExpenseControler.create("Assinatura Plataforma EAD", 99.00, "Educação", "2026-03-18", "Acesso ilimitado a cursos");
  ExpenseControler.create("Mentoria Backend", 400.00, "Educação", "2026-03-19", "Acompanhamento personalizado");

// Categoria Esporte
  ExpenseControler.create("Tênis Esportivo", 350.00, "Esporte", "2026-03-18", "Para correr com conforto");
  ExpenseControler.create("Bola de Futebol", 120.00, "Esporte", "2026-03-19", "Oficial e resistente");
  ExpenseControler.create("Bicicleta Mountain Bike", 1800.00, "Esporte", "2026-03-20", "Ideal para trilhas");
  ExpenseControler.create("Camisa de Time", 250.00, "Esporte", "2026-03-21", "Uniforme oficial");
  ExpenseControler.create("Kit Musculação", 600.00, "Esporte", "2026-03-22", "Completo para treinos em casa");

  console.log(ExpenseControler.getAll());
  console.log(ExpenseControler.getByCategory(883772))

app.get('/',(req,res)=>{
    res.send("Olá Mundo!");
})

app.get('/Despesas',ExpenseView.getAll) // funciona

app.get('/Despesas/:id',ExpenseView.getById) // funciona

app.get('/Despesas/category/:category',ExpenseView.getByCategory) // funciona

app.get('/Despesas/date/:date',ExpenseView.getByDate) // funciona

app.get('/Despesas/summary',ExpenseView.summary) // funciona

app.get('/Despesas/summary/category/:category',ExpenseView.summaryCategory) // funciona

app.post('/Despesas/Adicionar',ExpenseView.create) // funciona

app.put('/Despesas/update/id/:id',ExpenseView.update)

app.delete('/Despesas/delete/id/:id',ExpenseView.delete) // funciona


app.listen(PORT,() => {
    console.log("Servidor foi iniciado na porta:", PORT);
});