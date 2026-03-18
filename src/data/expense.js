class Expense{
    constructor(){
        this.expenses = []
    }

    getAll(){
        return this.expenses;
    }

    getById(id){
        return this.expenses.find(u => id.id === id);
    }


}