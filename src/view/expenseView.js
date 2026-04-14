import expenseController from "../controller/expenseControler.js"

class expenseView{
    
    
    getAll(req,res){
        res.send(expenseController.getAll())
    }

    getById(req,res){
        const expense = expenseController.getById(Number(req.params.id))

        if(!expense){
            res.status(400).send('Despesa não encontrado!')
        }else{
            res.send(expense)
        }
    }

    getByCategory(req,res){
        const expenseCategory = expenseController.getByCategory(req.params.category)
        
        if(!expenseCategory){
            res.status(400).send('Despesa não encontrada!')
        }else{
            res.send(expenseCategory)
        }    
    }

    getByDate(req,res){
        const expenseDate = expenseController.getByDate(req.body.date)

        if(!expenseDate){
            res.status(400).send('Despesa não encontrada!')
        }else{
            res.send(expenseDate)
        }    

    }

    sumary(req,res){
        res.send(expenseController.sumary())
    }


    sumaryCategory(req,res){
        const expenseSummaryCategory = expenseController.sumaryCategory(req.body.category)
        
        if(!expenseSummaryCategory){
            res.status(400).send('Despesa não encontrada!')
        }else{
            res.send(expenseSummaryCategory)
        }
    }


    create(req,res){
        const {title,amount,category,date,description} = req.body
        const newExpens = expenseController.create(title,amount,category,date,description)
        res.send(newExpens)
    }

    update(req,res){
        const id = req.params.id
        const {title,amount,category,date,description} = req.body

        const expenseUpdate = expenseController.update(id,title,amount,category,date,description)

        if(!expenseUpdate){
            res.status(400).send('Despesa não encontrada!')
        }else{
            res.send(expenseUpdate)
        }
    }

    delete(req,res){

        const expenseDelete = expenseController.delete(Number(req.params.id))

        if(!expenseDelete){
            res.status(400).send('Despesa não encontra!')
        }else{
            res.send(expenseDelete)
        }

    }

}

export default expenseView()