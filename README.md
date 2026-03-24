# Atividade Backend Sistema de Despesas Pessoais
## Objetivo da atividade:  
 Desenvolver uma API REST em Node.js para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas.

## Tecnologias Usadas: 

Node.js - Como ambiente de desenvolvimento
Express - Para gerenciar as rotas
Nodemon - Para atualizações constantes
git - Para versionamento
Postmant - Para consumir a api

## Como Executar 

```
npm i
npm run dev
```
Executar "npm i" para instalar as dependencias do projeto.
Executar "npm run dev" para rodar o projeto com o nodemon.

## Rotas

Método|Rota|Descrição
--- | --- | ---
GET|/expenses|Lista despesas
GET|/expenses/id/:id|Busca despesa
GET|/expenses/category/:category|Busca todas as despesa da categoria
GET|/expenses/date/:date|Busca todas as despesa da data
GET|/expenses/summary|Busca o valor total de todas as depesas
GET|/expenses/summary/category/:category|Busca o valor total de todas as depesas da categoria
POST|/expenses|Cria despesa
PUT|/expenses/update/:id|Atualiza despesa
DELETE|/expenses/:id|Remove despesa

## Modelo da Entidade Expense

Expense

id : identificador da expense em inteiro no maximo 6 caracteres

exemplo : 476532

title : Nome da expense em string, todas as expense devem ter um nome

exemplo : Carne moída

amount : Valor da expense em decimal, não pode ser menor que zero

exemplo : 23.34

category : Nome da categoria da expense em string

exemplo : Compra do mês

date : Data que o usuario coloca na expense, não pode ser uma data futura e é uma string

exemplo : 26-03-24
            
description : Uma descrição da expense e uma string

exemplo : Carne moída para o almoço 

createdAt : Data que o sistema coloca no expense e uma string
exemplo : 26-03-24

# Requisições
Aqui foi usado o Postman para usar as requições

### POST - Adicionar Despesa

```
http://localhost:3000/expenses
```
﻿
### Body raw (json)
```
{
    "title":"Supermercado",
    "amount": 150.50,
    "category":"Alimentação",
    "date": "2026-03-25",
    "description": "Compra semanal"
}
```
### GET - Ver Todas as Despesas
```
http://localhost:3000/expenses/
```

### GET - Ver Aquela Despesa
```
http://localhost:3000/expenses/id/1774221170515
```
﻿### GET - Ver por Categorias
```
http://localhost:3000/expenses/category/Esporte
```
### ﻿GET - Ver por Data
```
http://localhost:3000/expense/date/2026-03-20
```

### GET - Summary
```
http://localhost:3000/expense/sumary
```
﻿
### GET - Sumary Category
```
http://localhost:3000/expense/sumary/category/Esporte
```

### PUT - Atualizando Despesa
```
http://localhost:3000/expense/update/1774221241930
```

### Body raw (json)
```
{
    "title":"peido",
    "amount": 150.50,
    "category":"Alimentação",
    "date": "2026-03-10",
    "description": "Compra semanal"
}
```
### DELETE -Deletar Despesa
```
http://localhost:3000/expense/delete/177445
```
