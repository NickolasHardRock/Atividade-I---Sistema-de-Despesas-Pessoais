const express = require('express');

const app = express();

const despasas = require('./models/expense.json');

app.get('/',(req,res)=>{
    res.
})

const PORT = 3000;

app.listen(PORT,() => {
    console.log("Servidor foi iniciado na porta:", PORT);
});



