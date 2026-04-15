class Expense{
    constructor(){
        this.expenses = []
    }

    getAll(){
        return this.expenses;
    }

    getById(id){
        return this.expenses.find(u => u.id === id );
    }

    create(title,amount,category,date,description){
        const newExpens = {
            id: Math.floor(Math.random() * Math.floor(999999)),
            title,
            amount,
            category,
            date,
            description,
            createdAt: new Date()
        }

        this.expenses.push(newExpens)
        return newExpens;
    }

    update(id,title,amount,category,date,description){
        const index = this.expenses.findIndex(u => u.id === id)

        if (index === -1) {
            return null;
        };

        this.expenses[index] = {
            ...this.expenses[index], // Copia todas as propriedades do objeto na posição index
            title,
            amount,
            category,
            date,
            description
        }

        return this.expenses[index];
    }

    delete(id){
        const index = this.expenses.findIndex(u => u.id === id)
        if(index === -1){
            return null
        }

        this.expenses.splice(index,1);

        return null

    }
}

export default new Expense();