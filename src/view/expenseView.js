
import ExpenseController from "../controller/expenseControler.js"

class ExpenseView {


    getExpense(req, res) {
        const { id, category, date, summary } = req.query
        console.log(req.query)
        try {
            if (id) {
                return res.status(200).send(ExpenseController.getById(id))
            }
            if (category && summary) {
                
                return res.status(200).send(ExpenseController.summaryCategory(category))
            }
            if (category) {

                return res.status(200).send(ExpenseController.getByCategory(category))
            }
            if (date) {
                return res.status(200).send(ExpenseController.getByDate(date))
            }
            if (summary) {
                return res.status(200).send(ExpenseController.summary())
            }
            
                return res.status(200).send(ExpenseController.getAll())
            
            

        } catch (error) {
            
            return res.status(404).json({error: error.message})
        }
    }


    // getAll(req,res){
    //     console.log("Chegou aqui1")
    //     res.send(ExpenseController.getAll())
    // }

    // getById(req,res){
    //     console.log("Chegou aqui2")
    //     const id = Number(req.query.id)
    //     res.send(ExpenseController.getById(id))
    // }

    // getByCategory(req,res){
    //     console.log("Chegou aqui3")
    //     const expenseCategory = ExpenseController.getByCategory(req.query.category)

    //     if(!expenseCategory){
    //         res.status(400).send('Despesa não encontrada!')
    //     }else{
    //         res.send(expenseCategory)
    //     }    
    // }

    // getByDate(req,res){
    //     const expenseDate = ExpenseController.getByDate(req.params.date)

    //     if(!expenseDate){
    //         res.status(400).send('Despesa não encontrada!')
    //     }else{
    //         res.send(expenseDate)
    //     }    

    // }

    // summary(req,res){
    //     try {
    //         res.send(ExpenseController.summary())   
    //     } catch (error) {
    //         res.json({message:error.message})        
    //     }
    // }


    // summaryCategory(req,res){
    //     const expenseSummaryCategory = ExpenseController.summaryCategory(req.params.category)

    //     if(!expenseSummaryCategory){
    //         res.status(400).send('Despesa não encontrada!')
    //     }else{
    //         res.send(expenseSummaryCategory)
    //     }
    // }


    create(req, res) {
        const { title, amount, category, date, description } = req.body
        const newExpens = ExpenseController.create(title, amount, category, date, description)
        res.send(newExpens)
    }

    update(req, res) {
        try {
            const id = Number(req.params.id)
            const { title, amount, category, date, description } = req.body
            console.log(req.body)
            const expenseUpdate = ExpenseController.update(id, title, amount, category, date, description)
            res.status(200).json(expenseUpdate)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }


        console.log("chegou aqui")



    }

    delete(req, res) {

        const expenseDelete = ExpenseController.delete(Number(req.params.id))

        res.send(expenseDelete)


    }

}

export default new ExpenseView()