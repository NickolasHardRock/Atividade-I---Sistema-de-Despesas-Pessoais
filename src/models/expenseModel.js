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
    return await  expense.findAll();
}

async function getExpenseId(id) {
    return await expense.findByPk(id);
}

async function getExpenseBy(where = {}) {
    return await expense.findAll({where});
}

async function createExpense(title, amount,  date, description, status, fkUsuarioId, fkCategoryId) {
    return await expense.create({ title, amount, date, description, status, fkUsuarioId, fkCategoryId });
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
    getExpenseBy,
    createExpense,
    updateExpense,
    deleteExpense
}
