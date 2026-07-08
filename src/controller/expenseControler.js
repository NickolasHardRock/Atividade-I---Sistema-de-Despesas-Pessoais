import expense, {
    getAllExpense,
    getExpenseId,
    getExpenseBy,
    createExpense,
    updateExpense,
    deleteExpense
} from "../models/expenseModel.js"
import { getAllCategorys } from "../models/categoryModel.js"

class ExpenseController {

    async getAll() {
        const result = await getAllExpense();
        if (result.length === 0) {
            throw new Error("Não dados para retornar")
        }
        return result
    }


    async getById(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido")
        }
        const result = await getExpenseId(id);

        if (!result) {
            throw new Error("Despesas não encontrada")
        }

        return result
    }

    async getByWhere(where) {

        const expense = await getExpenseBy(where);
        return expense;

    }

    // async getByCategory(category) {

    //     const result = ExpenseModel.getAll().filter(u => u.category === category)
    //     console.log(result)

    //     if (result.length === 0) {
    //         throw new Error("Favor informar categoria válida")
    //     }
    //     if (!category) {
    //         throw new Error("Favor informar categoria válida")
    //     }

    //      return await result
    // }

    // async getByDate(date) {
    //     const result = ExpenseModel.getAll().filter(u => u.date === date)
    //     if (result.length === 0) {
    //         throw new Error("Favor informar data válida")
    //     }

    //     return await result
    // }

    async summary() {
        const expenses = await getAllExpense()
        const total = expenses.reduce((sum, u) => {
            return sum + Number(u.amount)
        }, 0)

        if (total === 0) {
            throw new Error("Não há despesas para resumir")
        }

        return total
    }

    async summaryCount() {
        const expenses = await getAllExpense()

        const count = expenses.length

        if (count === 0) {
            throw new Error("Não há despesas para contar")
        }

        return count
    }

    async summaryCategory() {
        const expenses = await getAllExpense()
        const category = await getAllCategorys()


        const totalsById = expenses.reduce((acc, u) => {
            const id = String(u.fkCategoryId ?? "");
            const amount = Number(u.amount) || 0;
            if (!id) return acc;
            acc[id] = (acc[id] || 0) + amount;
            return acc;
        }, {});


        const categoryMap = category.reduce((m, c) => {
            const cid = String(c.id ?? "");
            const name = c.name ?? "Sem categoria";
            if (cid) m[cid] = name;
            return m;
        }, {});


        const result = Object.keys(totalsById).map(id => ({
            id,
            name: categoryMap[id] ?? "Sem categoria",
            total: totalsById[id]
        }));

        return result;
    }

    async create(title, amount, date, description, status, fkUsuarioId, fkCategoryId) {
        if (!title) {
            throw new Error("Por favor adicione um titulo");
        }
        if (Number(amount) < 0.0) {
            throw new Error("Por favor adicione um gasto");
        }
        if (!date || new Date(date) > new Date()) {
            throw new Error("Por favor adicione a data correta, (Não é possivel adicionar datas anteriores a atual)");
        }
        if (status !== "PAGA" && status !== "PENDENTE") {
            throw new Error("Por favor escolha entre PAGA ou PENDENTE")
        }
        if (!fkUsuarioId) {
            throw new Error("Adicione um usuario");
        }
        if (!fkCategoryId) {
            throw new Error("Adicione uma categoria ")
        }

        const result = await createExpense(title, amount, date, description, status, fkUsuarioId, fkCategoryId);

        return result

    }

    async update(id, title, amount, category, date, description) {
        if (!id) {
            return new Error("Por favor adicione um id valido");
        }
        if (!title) {
            return new Error("Por favor adicione um titulo");
        }
        if (amount < 0.0) {
            return new Error("Por favor adicione um gasto");
        }
        if (category === "") {
            return new Error("Por favor adicione um titulo");
        }
        if (new Date(date) > new Date()) {
            return new Error("Por favor adicione a data correta, (Não é possivel adicionar datas anteriores a atual)");
        }

        const result = await updateExpense(id, title, amount, category, date, description)

        return result

    }

    async delete(id) {
        if (!id) {
            return new Error("Por favor adicione um id valido");
        }

        const result = await deleteExpense(id)


        return result

    }

}

export default new ExpenseController();
