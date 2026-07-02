# Atividade Backend Sistema de Despesas Pessoais

## Objetivo da Atividade

Desenvolver uma API REST em Node.js para gerenciamento de despesas pessoais, permitindo registrar, listar, atualizar e remover despesas, além de fornecer funcionalidades de autenticação de usuários e gerenciamento de categorias.

## Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução JavaScript.
*   **Express**: Framework web para Node.js, utilizado para gerenciar rotas e requisições HTTP.
*   **Sequelize**: ORM (Object-Relational Mapper) para Node.js, utilizado para interagir com o banco de dados relacional.
*   **Nodemon**: Ferramenta para monitorar alterações no código e reiniciar o servidor automaticamente durante o desenvolvimento.
*   **Git**: Sistema de controle de versão.
*   **Postman/Insomnia**: Ferramentas para testar e consumir a API.

## Como Executar

Para configurar e executar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório** (se aplicável).
2.  **Instale as dependências**: Navegue até o diretório raiz do projeto e execute:
    ```bash
    npm install
    ```
3.  **Execute o servidor**: Para iniciar a aplicação em modo de desenvolvimento com Nodemon:
    ```bash
    npm run dev
    ```
    O servidor será iniciado na porta `3000` (ou a porta configurada no `process.env.PORT`).

## Estrutura do Projeto

O projeto segue uma estrutura modular, separando as responsabilidades em `models`, `views` (controllers), `config` e `middleware`.

## Rotas da API

A API é dividida em três módulos principais: **Usuários**, **Despesas** e **Categorias**. As rotas são prefixadas com `/api/v1`.

### Rotas de Usuários (`/api/v1/usuarios`)

| Método | Rota               | Descrição                          | Autenticação |
| :----- | :----------------- | :--------------------------------- | :----------- |
| `POST` | `/login`           | Realiza o login do usuário.        | Não          |
| `POST` | `/`                | Cria um novo usuário.              | Não          |
| `GET`  | `/`                | Retorna os dados do usuário logado.| Sim          |

### Rotas de Despesas (`/api/v1/despesas`)

| Método   | Rota                               | Descrição                                                              | Autenticação |
| :------- | :--------------------------------- | :--------------------------------------------------------------------- | :----------- |
| `GET`    | `/`                                | Lista todas as despesas, com suporte a filtros.                        | Não          |
| `GET`    | `/dashboard/total-expense`         | Retorna o valor total de todas as despesas.                            | Não          |
| `GET`    | `/dashboard/expenses-count`        | Retorna a quantidade total de despesas.                                | Não          |
| `GET`    | `/dashboard/expenses-by-category`  | Retorna o valor total de despesas agrupado por categoria.              | Não          |
| `POST`   | `/`                                | Cria uma nova despesa.                                                 | Não          |
| `PUT`    | `/:id`                             | Atualiza uma despesa existente pelo ID.                                | Não          |
| `DELETE` | `/:id`                             | Remove uma despesa pelo ID.                                            | Não          |

### Rotas de Categorias (`/api/v1/categoria`)

| Método   | Rota               | Descrição                                | Autenticação |
| :------- | :----------------- | :--------------------------------------- | :----------- |
| `GET`    | `/`                | Lista todas as categorias.               | Não          |
| `GET`    | `/:id`             | Busca uma categoria específica pelo ID.  | Não          |
| `POST`   | `/`                | Cria uma nova categoria.                 | Não          |
| `PUT`    | `/:id`             | Atualiza uma categoria existente pelo ID.| Não          |
| `DELETE` | `/:id`             | Remove uma categoria pelo ID.            | Não          |

## Modelo da Entidade `Expense`

O modelo `Expense` representa uma despesa individual e possui os seguintes campos:

| Campo        | Tipo      | Descrição                                                               | Exemplo        |
| :----------- | :-------- | :---------------------------------------------------------------------- | :------------- |
| `id`         | `INTEGER` | Identificador único da despesa. Auto-incrementável e chave primária.    | `476532`       |
| `description`| `STRING`  | Descrição detalhada da despesa.                                         | `Carne moída para o almoço` |
| `amount`     | `DECIMAL` | Valor da despesa. Não pode ser menor que zero.                          | `23.34`        |
| `category`   | `STRING`  | Nome da categoria da despesa.                                           | `Compra do mês`|
| `status`     | `ENUM`    | Status da despesa (`PAGA`, `PENDENTE`, `ATRASADA`).                     | `PAGA`         |
| `date`       | `DATEONLY`| Data em que a despesa ocorreu. Não pode ser uma data futura.            | `2026-03-24`   |
| `createdAt`  | `DATE`    | Data de criação do registro (gerado automaticamente pelo sistema).      | `2026-03-24`   |
| `updatedAt`  | `DATE`    | Data da última atualização do registro (gerado automaticamente pelo sistema). | `2026-03-24`   |

## Exemplos de Requisições

Utilize ferramentas como Postman ou Insomnia para testar os endpoints da API.

### Autenticação

**Login de Usuário**

`POST /api/v1/usuarios/login`

```json
{
    "email": "seu_email@example.com",
    "password": "sua_senha"
}
```

**Criação de Usuário**

`POST /api/v1/usuarios/`

```json
{
    "name": "Nome do Usuário",
    "email": "novo_usuario@example.com",
    "password": "senha_segura"
}
```

**Obter Dados do Usuário (requer token de autenticação no header `Authorization: Bearer <token>`)**

`GET /api/v1/usuarios/`

### Despesas

**Adicionar Despesa**

`POST /api/v1/despesas/`

```json
{
    "title": "Supermercado",
    "amount": 150.50,
    "category": "Alimentação",
    "date": "2026-03-25",
    "description": "Compra semanal",
    "status": "PENDENTE",
    "fkUsuarioId": 1, 
    "fkCategoryId": 1 
}
```

**Listar Todas as Despesas (com filtros)**

`GET /api/v1/despesas`

Exemplos de filtros:

*   **Por Categoria:** `GET /api/v1/despesas?category=Alimentacao`
*   **Por Status:** `GET /api/v1/despesas?status=PAGA`
*   **Combinação de Filtros:** `GET /api/v1/despesas?status=PENDENTE&category=Transporte`

**Obter Despesa por ID**

`GET /api/v1/despesas/:id`

Exemplo: `GET /api/v1/despesas/123`

**Atualizar Despesa**

`PUT /api/v1/despesas/:id`

Exemplo: `PUT /api/v1/despesas/123`

```json
{
    "title": "Nova Título",
    "amount": 160.00,
    "category": "Nova Categoria",
    "date": "2026-03-10",
    "description": "Descrição atualizada",
    "status": "PAGA",
    "fkUsuarioId": 1,
    "fkCategoryId": 2
}
```

**Remover Despesa**

`DELETE /api/v1/despesas/:id`

Exemplo: `DELETE /api/v1/despesas/123`

### Dashboard

**Valor Total das Despesas**

`GET /api/v1/dashboard/total-expense`

**Quantidade Total de Despesas**

`GET /api/v1/dashboard/expenses-count`

**Total por Categoria**

`GET /api/v1/dashboard/expenses-by-category`

### Categorias

**Listar Todas as Categorias**

`GET /api/v1/categoria`

**Obter Categoria por ID**

`GET /api/v1/categoria/:id`

Exemplo: `GET /api/v1/categoria/1`

**Criar Categoria**

`POST /api/v1/categoria`

```json
{
    "name": "Alimentação"
}
```

**Atualizar Categoria**

`PUT /api/v1/categoria/:id`

Exemplo: `PUT /api/v1/categoria/1`

```json
{
    "name": "Alimentação Essencial"
}
```

**Remover Categoria**

`DELETE /api/v1/categoria/:id`

Exemplo: `DELETE /api/v1/categoria/1`

## Observações

*   A autenticação é gerenciada por um `authMiddleware` para rotas específicas.
*   A conexão com o banco de dados é feita via Sequelize, com sincronização automática dos modelos (`sequelize.sync({ alter: true })`).
*   Validações básicas são realizadas nos controllers para garantir a integridade dos dados.