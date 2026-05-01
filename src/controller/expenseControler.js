import ExpenseModel from "../models/expenseModel.js";

class ExpenseController{
    
  getAll(){
    return ExpenseModel.getAll();
    }


getById(id){
    if(!id || isNaN(id) || id == ''){
        throw new Error("Favor informar id válido")
    }
    return ExpenseModel.getById(id)
}

getByCategory(category){

    const result = ExpenseModel.getAll().filter(u => u.category === category)
    console.log(result)
    
    if(result.length === 0){
        throw new Error("Favor informar categoria válida")
    }
    if(result.includes("''")){
        throw new Error("Favor informar categoria válida")
    }
    return result
}

getByDate(date){
    const result = ExpenseModel.getAll().filter(u => u.date === date) 
    if(result.length === 0){
        throw new Error("Favor informar data válida")
    }
    return result
}

summary(){
    let count = 0;
    ExpenseModel.getAll().forEach(u => {
            count = count + u.amount
        })
        return count;
}

summaryCategory(category){
    return ExpenseModel.getAll()
    .filter(u => u.category === category)
    .reduce((count,u) => {
        return count + u.amount
    },0)
   
}

create(title,amount,category,date,description){
    if(title === ""){
        return null;
    }

    if(amount < 0.0){
        return null
    }
    if(new Date(date) > new Date()){
        return null
    }

    return ExpenseModel.create(title,amount,category,date,description)

}

update(id,title,amount,category,date,description){

    return ExpenseModel.update(id,title,amount,category,date,description)

}

delete(id){
    
    return ExpenseModel.delete(id)

}

}

export default new ExpenseController();
