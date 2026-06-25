import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const expense = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('PENDENTE', 'PAGA')
    },
    fkUsuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    fkCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'category',
            key: 'id'
        }
    }
})

async function getAllExpense() {
    return await expense.findAll();
}

async function getExpenseId(id) {
    return await expense.findByPk(id);
}

async function createExpense(title, amount, category, date, description, fkUsuarioId) {
    return await expense.create({ title, amount, category, date, description, fkUsuarioId });
}

async function updateExpense(id, title, amount, category, date, description, usuario) {
    const expense = await getExpenseId(id);

    if (!expense) {
        throw new Error("Despesa não encontrada")
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;
    expense.description = description;
    expense.fk_usuarioId = usuario;

    await expense.save()
    console.log("Despesa atualizada");
    return expense;
}

async function deleteExpense(id) {
    const expense = await getExpenseId(id);

    if (!expense) {
        throw new Error("Adicione um id");
    }

    await expense.destroy();
    return null;
}

export default expense

export {
    getAllExpense,
    getExpenseId,
    createExpense,
    updateExpense,
    deleteExpense
}


class Expense {
    constructor() {
        this.expenses = []
    }

    getAll() {
        return this.expenses;
    }


    getById(id) {
        return this.expenses.find(u => u.id === id);
    }


    create(title, amount, category, date, description) {

        const newExpens = {

            id: Math.floor(Math.random() * Math.floor(999999)),
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date()
        }

        this.expenses.push(newExpens)
        return newExpens;
    }

    update(id, title, amount, category, date, description) {
        const index = this.expenses.findIndex(u => u.id === id)

        if (index === -1) {
            return null;
        };

        this.expenses[index] = {
            ...this.expenses[index],
            title,
            amount,
            category,
            date,
            description
        }

        return this.expenses[index];
    }

    delete(id) {
        const index = this.expenses.findIndex(u => u.id === id)
        if (index === -1) {
            return null
        }

        this.expenses.splice(index, 1);

        return null

    }
}