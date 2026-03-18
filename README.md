# Atividade-I---Sistema-de-Despesas-Pessoais
Atividade Backend — Sistema de Despesas Pessoais (Node.js) — Objetivo da atividade:  Desenvolver uma API REST em Node.js para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas.

A aplicação não deve utilizar banco de dados. Os dados podem ser armazenados em:

* memória (array)
ou
* arquivo JSON

O foco da atividade é:

* estrutura de backend
* modelagem de dados
* boas práticas de API
* organização de código
* documentação

2. Requisitos técnicos

A aplicação deve ser desenvolvida utilizando:

* Node.js
* Express.js
* Persistência em memória ou JSON
* Estrutura em camadas

Sugestão de estrutura:

```
personal-expenses-api
│
├── src
│   ├── models
│   │   └── expense.js
│   │
│   ├── data
│   │   └── expenses.json
│   │
│   └── app.js
│
├── package.json
└── README.md
```

3. Modelo de Dados

A aplicação deve gerenciar Despesas.

Entidade: *Expense*
Campo |     Tipo |      Descrição
--- | --- | ---
id| string| Identificador único
title| string| Nome da despesa
amount| number| Valor da despesa
category| string| Categoria da despesa
date| date| Data da despesa
description| string| Descrição opcional
createdAt| date| Data de criação

4. MER (Modelo Entidade Relacionamento)

Mesmo sem banco, o sistema deve possuir modelagem conceitual.

    +------------------+
    |     EXPENSE      |
    +------------------+
    | id (PK)          |
    | title            |
    | amount           |
    | category         |
    | date             |
    | description      |
    | createdAt        |
    +------------------+

5. Funcionalidades (Features)

A API deve implementar as seguintes funcionalidades:

5.1. Criar despesa

Cadastrar uma nova despesa.

Endpoint

`POST /expenses`

Body

```
{
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal"
}
```

5.2. Listar despesas

Listar todas as despesas cadastradas.

`GET /expenses`

Extras (opcional):

* filtrar por categoria
* filtrar por data

Exemplo:

`GET /expenses?category=Alimentação`

5.3. Buscar despesa por ID

`GET /expenses/:id`

5.4. Atualizar despesa

`PUT /expenses/:id`

Body:

```
{
  "title": "Supermercado",
  "amount": 200
}
```

5. Remover despesa

`DELETE /expenses/:id`

6. Calcular total de despesas (feature extra)

Endpoint para retornar o total gasto.

`GET /expenses/summary/total`

Resposta:

```
{
  "total": 2450.90
}
```

7. Total por categoria (extra)
`GET /expenses/summary/category`

Resposta:

```
{
  "Alimentação": 800,
  "Transporte": 200,
  "Lazer": 350
}
```

6. Regras de Negócio

* O campo title é obrigatório
* O campo amount deve ser maior que zero
* O campo date não pode ser no futuro
* id deve ser gerado automaticamente
* Caso uma despesa não exista, retornar 404

7. Exemplos de respostas da API

Sucesso

```
{
  "id": "exp_123",
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal",
  "createdAt": "2026-03-11T12:00:00"
}
```

Erro
```
{
  "error": "Expense not found"
}
```

8. Documentação obrigatória

O aluno devem entregar um README.md contendo:

8.1. Descrição do projeto

Explicar:

* objetivo da API
* tecnologias usadas

8.2. Como executar o projeto

Exemplo:

```
npm install
npm start
```

Servidor rodando em:

`http://localhost:3000`

8.3. Rotas da API

Tabela exemplo:

Método|Rota|Descrição
--- | --- | ---
GET|/expenses|Lista despesas
GET|/expenses/:id|Busca despesa
POST|/expenses|Cria despesa
PUT|/expenses/:id|Atualiza despesa
DELETE|/expenses/:id|Remove despesa

8.4. Modelo de dados

Documentar a entidade Expense.

8.5. Exemplos de requisições

Usar:

Postman
ou
curl