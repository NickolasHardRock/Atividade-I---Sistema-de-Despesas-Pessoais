import express from 'express'
import UserView from './src/view/userView.js';
import expenseView from './src/view/expenseView.js';
import categoriaView from './src/view/categoriaView.js';
import authMiddleware from './src/middleware/auth.js'
import { sequelize } from './src/config/db.js';
import cors from 'cors'
import './src/models/index.js';

const app = express();

app.use(cors)

app.use(express.json());



const PORT = 3000;


app.get('/', (req, res) => {
  res.send("Olá Mundo!");
})

// Usuarios

app.post('/api/v1/usuarios/login',UserView.login)

app.post('/api/v1/usuarios/',UserView.createUser)

app.get('/api/v1/usuarios/',authMiddleware,UserView.getUser)



// Expenses

app.get('/api/v1/despesas',  expenseView.getExpense)

app.get('/api/v1/dashboard/total-expense', expenseView.getValorTotal)

app.get('/api/v1/dashboard/expenses-count', expenseView.getQuantidadeTotal)

app.get('/api/v1/dashboard/expenses-by-category', expenseView.getTotalPorCategoria)

app.post('/api/v1/despesas/',  expenseView.createExpense)

app.put('/api/v1/despesas/:id',  expenseView.updateExpense)

app.delete('/api/v1/despesas/:id',  expenseView.deleteExpense)

// Categoria

app.get('/api/v1/categoria', categoriaView.getCategory)

app.get('/api/v1/categoria/:id', categoriaView.getCategory)

app.post('/api/v1/categoria',categoriaView.createCategory)

app.put('/api/v1/categoria/:id',categoriaView.updateCategory)

app.delete('/api/v1/categoria/:id',categoriaView.deleteCategory)




// app.put('/api/v1/usuarios/:id',UserView.update)

// app.delete('/api/v1/usuarios/:id', UserView.delete)

// async function popularBaseUsuarios() {
//   await UserController.create("Nickolas", "Nickolas@muitoLouco.com","senha123senha")
// }


async function main() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({alter: true })
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
    // await popularBaseUsuarios()
    //await popularBaseDespesas()
    app.listen(PORT, () => {
      console.log("Servidor foi iniciado na porta:", PORT);
    });
  } catch (error) {
    console.error("Erro ao sincronizar banco:", error)
  }
}

main()

