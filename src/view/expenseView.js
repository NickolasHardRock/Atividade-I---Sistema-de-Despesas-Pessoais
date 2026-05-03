
import ExpenseController from "../controller/expenseControler.js"

class ExpenseView {


    getExpense(req, res) {
        const { id, category, date, summary } = req.query
        console.log(req.query)
        try {
            if (id) {
                return res.status(200).json(ExpenseController.getById(id))
            }
            if (category && summary === 'true') {

                return res.status(200).json(ExpenseController.summaryCategory(category))
            }
            if (category) {

                return res.status(200).json(ExpenseController.getByCategory(category))
            }
            if (date) {
                return res.status(200).json(ExpenseController.getByDate(date))
            }
            if (summary === 'true') {
                return res.status(200).json(ExpenseController.summary())
            }

            return res.status(200).json(ExpenseController.getAll())


        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    create(req, res) {
        try {
            const { title, amount, category, date, description } = req.body
            const newExpens = ExpenseController.create(title, amount, category, date, description)
            res.status(201).json(newExpens)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    update(req, res) {
        try {
            const id = Number(req.params.id)
            const { title, amount, category, date, description } = req.body
            console.log(req.body)
            const expenseUpdate = ExpenseController.update(id, title, amount, category, date, description)
            res.status(204).json(expenseUpdate)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    delete(req, res) {
        try{
            const expenseDelete = ExpenseController.delete(Number(req.params.id))
            res.status(204).json(expenseDelete)
        }catch(error){
            return res.status(404).json({error: error.message })
        }
    }

}

export default new ExpenseView()