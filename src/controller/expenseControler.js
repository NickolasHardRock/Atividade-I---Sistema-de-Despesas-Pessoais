import expenseModel from "../models/expenseModel";

class expenseController{
    
  getAll(){
    return expenseModel.getAll();
}


getById(id){
    return expenseModel.getById(id)
}

getByCategory(category){
    return expenseModel.getAll().filter(u => u.category === category)
}

getByDate(date){
    return expenseModel.getAll().filter(u => u.date === date)
}

summary(){
    let count = 0;
    expenseModel.getAll().forEach(u => {
            count = count + u.amount
        })
        return count;
}

summaryCategory(category){
    return this.expenseModel
    .filter(u => u.category === category)
    .reduce((count, u) =>{
        return count + u.amount;
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

    return expenseModel.create(title,amount,category,date,description)

}

update(id,title,amount,category,date,description){

    return expenseModel.update(id,title,amount,category,date,description)

}

delete(id){
    
    return expenseModel.delete(id)

}

}

export default expenseController();
