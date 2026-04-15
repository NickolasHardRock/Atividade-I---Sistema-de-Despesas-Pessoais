import ExpenseModel from "../models/expenseModel.js";

class ExpenseController{
    
  getAll(){
    return ExpenseModel.getAll();
    }


getById(id){
    return ExpenseModel.getById(id)
}

getByCategory(category){
    return ExpenseModel.getAll().filter(u => u.category === category)
}

getByDate(date){
    return ExpenseModel.getAll().filter(u => u.date === date)
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
