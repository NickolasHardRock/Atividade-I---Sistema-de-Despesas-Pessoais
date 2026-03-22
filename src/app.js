const express = require('express');

const app = express();

const Despesas = require('./data/expense.js');


app.use(express.json());

const PORT = 3000;

// Categoria: Doce
Despesas.create("Banoff", 263.33, "Doce", "2026-03-10", "O doce perfeito");
Despesas.create("Brigadeiro Gourmet", 45.00, "Doce", "2026-03-10", "Clássico brasileiro com chocolate belga");
Despesas.create("Cheesecake Frutas Vermelhas", 120.00, "Doce", "2026-03-12", "Sobremesa cremosa e refrescante");
Despesas.create("Torta Holandesa", 98.50, "Doce", "2026-03-10", "Camadas irresistíveis de creme e chocolate");
Despesas.create("Brownie de Nutella", 75.00, "Doce", "2026-03-10", "Intenso e macio, para os chocólatras");

// Categoria Bebida
Despesas.create("Café Expresso", 12.50, "Bebida", "2026-03-11", "Energia para começar o dia");
Despesas.create("Suco Natural de Laranja", 9.90, "Bebida", "2026-03-12", "Refrescante e cheio de vitamina C");
Despesas.create("Chá Verde", 15.00, "Bebida", "2026-03-13", "Leve e antioxidante");
Despesas.create("Smoothie de Morango", 22.00, "Bebida", "2026-03-14", "Cremoso e nutritivo");
Despesas.create("Cerveja Artesanal IPA", 28.90, "Bebida", "2026-03-15", "Amargor equilibrado e aroma cítrico");

// Categoria Comida
Despesas.create("Pizza Margherita", 89.90, "Comida", "2026-03-12", "Clássico italiano");
Despesas.create("Hambúrguer Artesanal", 45.00, "Comida", "2026-03-13", "Suculento e cheio de sabor");
Despesas.create("Sushi Combo 20 peças", 120.00, "Comida", "2026-03-14", "Variedade de peixes frescos");
Despesas.create("Lasanha Bolonhesa", 95.00, "Comida", "2026-03-15", "Receita tradicional italiana");
Despesas.create("Salada Caesar", 38.00, "Comida", "2026-03-16", "Leve e crocante");

// Categoria Educação
Despesas.create("Livro JS Avançado", 120.00, "Educação", "2026-03-15", "Estudo para melhorar no Node");
Despesas.create("Curso Online React", 250.00, "Educação", "2026-03-16", "Aprendizado prático de front-end");
Despesas.create("Workshop Docker", 180.00, "Educação", "2026-03-17", "Infraestrutura moderna para devs");
Despesas.create("Assinatura Plataforma EAD", 99.00, "Educação", "2026-03-18", "Acesso ilimitado a cursos");
Despesas.create("Mentoria Backend", 400.00, "Educação", "2026-03-19", "Acompanhamento personalizado");

// Categoria Esporte
Despesas.create("Tênis Esportivo", 350.00, "Esporte", "2026-03-18", "Para correr com conforto");
Despesas.create("Bola de Futebol", 120.00, "Esporte", "2026-03-19", "Oficial e resistente");
Despesas.create("Bicicleta Mountain Bike", 1800.00, "Esporte", "2026-03-20", "Ideal para trilhas");
Despesas.create("Camisa de Time", 250.00, "Esporte", "2026-03-21", "Uniforme oficial");
Despesas.create("Kit Musculação", 600.00, "Esporte", "2026-03-22", "Completo para treinos em casa");


app.get('/',(req,res)=>{
    res.send("Olá Mundo!");
})

app.get('/expenses',(req,res) =>{
    const expense = Despesas.getAll();
    res.status(200).json(expense);

})

app.get('/expense/id/:id',(req,res)=>{ // gets que procuram por objeto especifico precisam de rotas diferentes para não entrar em conflito
    const expenseId = Despesas.getById(Number(req.params.id));
    res.status(200).json(expenseId);
})

app.get('/expense/category/:category',(req,res)=>{
    const expenseCategory = Despesas.getByCategory(req.params.category);
    res.status(200).json(expenseCategory);
})

app.get('/expense/date/:date',(req,res)=>{
    const expenseDate = Despesas.getByDate(req.params.date);
    res.status(200).json(expenseDate);
})

app.post('/expense',(req,res) =>{
    const {title,amount,category,date,description} = req.body;
    const newExpens = Despesas.create(title,amount,category,date,description);
    res.status(201).json(newExpens);
})

app.put('/expense/update/:id',(req,res)=>{
    const {title,amount,category,date,description} = req.body;
    
    const updateExpens = Despesas.update(Number(req.params.id),title,amount,category,date,description)
    console.log(updateExpens)
    res.status(202).json(updateExpens);
})

app.delete('/expense/delete/:id',(req,res)=>{
    Despesas.delete(Number(req.params.id));
    res.status(204).json();
})



app.listen(PORT,() => {
    console.log("Servidor foi iniciado na porta:", PORT);
});