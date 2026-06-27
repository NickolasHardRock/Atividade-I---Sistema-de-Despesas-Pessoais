import express from 'express'
// import UserView from './src/view/userView.js';
// import ExpenseControler from './src/controller/expenseControler.js';
// import UserController from './src/controller/userController.js';
import expenseView from './src/view/expenseView.js';
import { sequelize } from './src/config/db.js';
import './src/models/index.js';

const app = express();

// app.use(router)

app.use(express.json());

const PORT = 3000;


app.get('/', (req, res) => {
  res.send("Olá Mundo!");
})

// Expenses

app.get('/api/v1/despesas', await expenseView.getExpense)

app.post('/api/v1/despesas/', await expenseView.createExpense)

app.put('/api/v1/despesas/:id', await expenseView.updateExpense)

app.delete('/api/v1/despesas/:id', await expenseView.deleteExpense)

app.get('/api/v1/usuarios')


// // Usuarios

// app.get('/api/v1/usuarios/',UserView.getUser)

// app.post('/api/v1/usuarios/',UserView.create)

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

