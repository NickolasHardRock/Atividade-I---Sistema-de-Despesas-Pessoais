import expense,{getAllExpense,
    getExpenseId,
    createExpense,
    updateExpense,
    deleteExpense} from "../models/expenseModel.js"

class ExpenseController {

   async getAll() {
        const result = await getAllExpense();
        if(result.length === 0){
            throw new Error("Não dados para retornar")
        }
        return  result
    }


    async getById(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido")
        }
        const  result = await getExpenseId(id);

        if(!result){
            throw new Error("Despesas não encontrada")
        }

        return  result
    }

    async getByCategory(category) {

        const result = ExpenseModel.getAll().filter(u => u.category === category)
        console.log(result)

        if (result.length === 0) {
            throw new Error("Favor informar categoria válida")
        }
        if (!category) {
            throw new Error("Favor informar categoria válida")
        }

         return await result
    }

    async getByDate(date) {
        const result = ExpenseModel.getAll().filter(u => u.date === date)
        if (result.length === 0) {
            throw new Error("Favor informar data válida")
        }

        return await result
    }

    async summary() {
        
        const count = ExpenseModel.getAll().reduce((count ,u) => {
            return count + u.amount
        },0)

        if (count === 0) {
            throw new Error("Não a despesas, para resumir")
        }

        return await count;
    }

    async summaryCategory(category) {
        result = ExpenseModel.getAll()
            .filter(u => u.category === category)
            .reduce((count, u) => {
                return count + u.amount
            }, 0)

        const categoria = ExpenseModel.getAll().filter(u => u.category === category)
        if (categoria.length === 0) {
            throw new Error("Informa uma categorioa valida")
        }

        if (result === 0) {
            throw new Error("Não a despesas, para resumir")
        }

        return await result

    }

    async create(title, amount, date, description, status, fkUsuarioId, fkCategoryId) {
        if (!title) {
            return new Error("Por favor adicione um titulo");
        }
        if (amount < 0.0) {
            return new Error("Por favor adicione um gasto");
        }
        if (new Date(date) > new Date()) {
            return new Error("Por favor adicione a data correta, (Não é possivel adicionar datas anteriores a atual)");
        }
        if(!status == "PAGA" || !status =="PENDENTE"){
            return new Error("Por favor escolha entre PAGA ou PENDENTE")
        }
        if(!fkUsuarioId){
            return new Error("Adicione um usuario");
        }
        if(!fkCategoryId){
            return new Error("Adicione uma categoria ")
        }

        const  result =  await createExpense(title, amount,  date, description, status, fkUsuarioId, fkCategoryId)
        console.log(result);

        return  result

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
        

        return  result

    }

}

export default new ExpenseController();
