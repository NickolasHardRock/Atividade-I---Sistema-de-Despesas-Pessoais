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
    if(count === 0){
        throw new Error("Não a despesas, para resumir")
    }
        return count;
}

summaryCategory(category){
    result = ExpenseModel.getAll()
    .filter(u => u.category === category)
    .reduce((count,u) => {
        return count + u.amount
    },0)

    const categoria = ExpenseModel.getAll().filter(u => u.category === category)
    if(categoria.length === 0){
        throw new Error("Informa uma categorioa valida")
    }
    
    if(result === 0 ){
        throw new Error("Não a despesas, para resumir")
    }

    return result 
   
}

create(title,amount,category,date,description){
    if(title === ""){
        return new Error("Por favor adicione um titulo");
    }
    if(amount < 0.0){
        return new Error("Por favor adicione um gasto");
    }
    if(category === ""){
        return new Error("Por favor adicione um titulo");
    }
    if(new Date(date) > new Date()){
        return new Error("Por favor adicione a data correta, (Não é possivel adicionar datas anteriores a atual)");
    }

    return ExpenseModel.create(title,amount,category,date,description)

}

update(id,title,amount,category,date,description){
    if(!id){
        return new Error("Por favor adicione um id valido");
    }

    return ExpenseModel.update(id,title,amount,category,date,description)

}

delete(id){
    
    return ExpenseModel.delete(id)

}

}

export default new ExpenseController();
