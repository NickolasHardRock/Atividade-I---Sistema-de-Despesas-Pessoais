import ExpenseModel from "../models/expenseModel.js";

class ExpenseController {

    getAll() {
        const result = ExpenseModel.getAll();
        if(result.length === 0){
            throw new Error("Não dados para retornar")
        }
        
        const resposta =
        {
            ...result,
            links:[
                {
                    rel:"self",
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesass/"
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta
    }


    getById(id) {
        if (!id || isNaN(id) || id == '') {
            throw new Error("Favor informar id válido")
        }
        const result = ExpenseModel.getById(id);

        if(!result){
            throw new Error("Despesas não encontrada")
        }

        const resposta = {
            ...result,
            data:[
                {
                    rel: "self",
                    method: "GET",
                    href:`http://localhost:3000/api/v1/Despesas/?id=`+id
                },
                {
                    rel:"update",
                    method: "PUT",
                    href: `http://localhost:3000/api/v1/Despesas/`+id
                },
                {
                    rel:"delete",
                    method: "DELETE",
                    href: `http://localhost:3000/api/v1/Despesas/`+id
                }
            ],
            links:[
                {
                    rel:"self",
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesass/"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta
    }

    getByCategory(category) {

        const result = ExpenseModel.getAll().filter(u => u.category === category)
        console.log(result)

        if (result.length === 0) {
            throw new Error("Favor informar categoria válida")
        }
        if (!category) {
            throw new Error("Favor informar categoria válida")
        }

        const resposta = {
            ...result,
            data:[
                {
                    rel: "self",
                    method: "GET",
                    href:`http://localhost:3000/api/v1/Despesa/?category`+category
                }
            ],
            links:[
                {
                    rel:"self",
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta
    }

    getByDate(date) {
        const result = ExpenseModel.getAll().filter(u => u.date === date)
        if (result.length === 0) {
            throw new Error("Favor informar data válida")
        }

        const resposta = {
            ...result,
            data:[
                {
                    rel: "self",
                    method: "GET",
                    href:`http://localhost:3000/api/v1/Despesas/?category`+date
                }
            ],
            links:[
                {
                    rel:"self",
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta
    }

    summary() {
        
        const count = ExpenseModel.getAll().reduce((count ,u) => {
            return count + u.amount
        },0)

        if (count === 0) {
            throw new Error("Não a despesas, para resumir")
        }

        const resposta = {
            ...count,
            data:[
                {
                    rel: "self",
                    method: "GET",
                    href:`http://localhost:3000/api/v1/Despesas/?summary=true`
                }
            ],
            links:[
                {

                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {
                    
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta;
    }

    summaryCategory(category) {
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

        const resposta = {
            ...count,
            data:[
                {
                    rel: "self",
                    method: "GET",
                    href:`http://localhost:3000/api/v1/Despesas/?category=`+category+`&summary=true`
                }
            ],
            links:[
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {   
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {   
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?"
                },
                {   
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?date=YYYY-MM-DD"
                },
                {   
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?summary=true"
                },
                {   
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?category=?&summary=true"
                }
            ]
        }

        return resposta

    }

    create(title, amount, category, date, description) {
        if (title === "") {
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

        const result = ExpenseModel.create(title, amount, category, date, description)

        const id = result.id

        const resposta = {
            ...result,
            message: "Usuario criado",
            data:[
                 {
                    rel:"self",
                    method:"POST",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    method:"PUT",
                    href:"http://localhost:3000/api/v1/Despesas/?id="+id
                },
                {
                    
                    method:"DELETE",
                    href:"http://localhost:3000/api/v1/Despesas/?id="+id
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id="+id
                }
            ]
        }

        return resposta

    }

    update(id, title, amount, category, date, description) {
        if (!id) {
            return new Error("Por favor adicione um id valido");
        }
        if (title === "") {
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

        const result = ExpenseModel.update(id, title, amount, category, date, description)

        const resposta = {
            ...result,
            message: "Usuario criado",
            data:[
                {
                    rel:"self",
                    method:"POST",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    method:"DELETE",
                    href:"http://localhost:3000/api/v1/Despesas/?id="+id
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/?id="+id
                }
            ]
        }


        return resposta 

    }

    delete(id) {
        if (!id) {
            return new Error("Por favor adicione um id valido");
        }

        const result = ExpenseModel.delete(id)
        
        const resposta = 
        {
            ...result,
            message:"Despesa deletada"+id,
            links:[
                {
                    rel:"self",
                    method:"DELETE",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    method:"POST",
                    href:"http://localhost:3000/api/v1/Despesas/"
                },
                {
                    method:"PUT",
                    href:"http://localhost:3000/api/v1/Despesas/?id=?"
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/Despesas/"
                }
            ]
        }

        return ExpenseModel.delete(id)

    }

}

export default new ExpenseController();
