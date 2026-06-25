
import ExpenseController from "../controller/expenseControler.js"

class ExpenseView {

    async getExpense(req,res){
        try {
            const expense = await ExpenseController.getAll();
        } catch (error) {
            return res.status(500).json({messagem: 'Erro ao buscar despesas' + error.message})
        }
    }
    // getExpense(req, res) {
    //     const { id, category, date, summary } = req.query
    //     console.log(req.query)
       
    //     try {
    //         if (id) {
    //             return res.status(200).json(ExpenseController.getById(Number(id)), {
    //                 data: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: `http://localhost:3000/api/v1/despesas/?id=` + id
    //                     }
    //                 ],
    //                 links: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                     }
    //                 ]
    //             })
    //         }
    //         if (category && summary === 'true') {

    //             return res.status(200).json(ExpenseController.summaryCategory(category), {
    //                 data: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: `http://localhost:3000/api/v1/despesas/?category=` + category + `&summary=true`
    //                     }
    //                 ],
    //                 links: [
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/"
    //                     },
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                     },
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                     },
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                     },
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                     },
    //                     {
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                     }
    //                 ]
    //             })
    //         }
    //         if (category) {

    //             return res.status(200).json(ExpenseController.getByCategory(category),
    //                 {
    //                     data: [
    //                         {
    //                             rel: "self",
    //                             method: "GET",
    //                             href: `http://localhost:3000/api/v1/Despesa/?category` + category
    //                         }
    //                     ],
    //                     links: [
    //                         {
    //                             rel: "self",
    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/"
    //                         },
    //                         {

    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                         },
    //                         {

    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                         },
    //                         {

    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                         },
    //                         {

    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                         },
    //                         {

    //                             method: "GET",
    //                             href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                         }
    //                     ]
    //                 }
    //             )
    //         }
    //         if (date) {
    //             return res.status(200).json(ExpenseController.getByDate(date), {
    //                 data: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: `http://localhost:3000/api/v1/despesas/?category` + date
    //                     }
    //                 ],
    //                 links: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                     }
    //                 ]
    //             })
    //         }
    //         if (summary === 'true') {
    //             return res.status(200).json(ExpenseController.summary(), {
    //                 data: [
    //                     {
    //                         rel: "self",
    //                         method: "GET",
    //                         href: `http://localhost:3000/api/v1/despesas/?summary=true`
    //                     }
    //                 ],
    //                 links: [
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                     },
    //                     {

    //                         method: "GET",
    //                         href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                     }
    //                 ]
    //             })
    //         }

    //         return res.status(200).json(ExpenseController.getAll(), {
    //             links: [
    //                 {
    //                     rel: "self",
    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesass/"
    //                 },
    //                 {
    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesas/?id=?"
    //                 },
    //                 {

    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesas/?category=?"
    //                 },
    //                 {

    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
    //                 },
    //                 {

    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesas/?summary=true"
    //                 },
    //                 {

    //                     method: "GET",
    //                     href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
    //                 }
    //             ]

    //         })


    //     } catch (error) {
    //         if (id) {
               
    //             return res.status(404).json({ error: error.message })
    //         }
    //         if (category && summary === 'true') {
               
    //             return res.status(404).json({ error: error.message })
    //         }
    //         if (category) {
               
    //             return res.status(404).json({ error: error.message })
    //         }
    //         if (date) {
               
    //             return res.status(404).json({ error: error.message })
    //         }
    //         if (summary === 'true') {
               
    //             return res.status(404).json({ error: error.message })
    //         }
           
    //         return res.status(400).json({ error: error.message })
    //     }
    // }

   async create(req, res) {
        try {
            const { title, amount, category, date, description, usuario } = req.body
            const newExpens = await ExpenseController.create(title, amount, category, date, description, usuario)
            res.status(201).json({
                message: "Despasa criada",
                data: newExpens,
                links: [
                    {
                        rel: "self",
                        method: "POST",
                        href: "http://localhost:3000/api/v1/despesas/"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/despesas/?id=" 
                    },
                    {

                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/despesas/?id=" 
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?id=" 
                    }
                ]
            })

        }
catch(error) {
        return res.status(400).json({ error: error.message })
    }
}

update(req, res) {
    try {
        const id = Number(req.params.id)
        const { title, amount, category, date, description } = req.body
        console.log(req.body)
        const expenseUpdate = ExpenseController.update(id, title, amount, category, date, description)
        res.status(200).json(expenseUpdate), {
            message: "Despesa atualizada",
            data: [
                {
                    rel: "self",
                    method: "POST",
                    href: "http://localhost:3000/api/v1/despesas/"
                },
                {
                    method: "DELETE",
                    href: "http://localhost:3000/api/v1/despesas/?id=" + id
                },
                {
                    method: "GET",
                    href: "http://localhost:3000/api/v1/despesas/?id=" + id
                }
            ]
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

delete (req, res) {
    try {
        const expenseDelete = ExpenseController.delete(Number(req.params.id))
        res.status(204).json(expenseDelete),{
            message:"Despesa deletada "+id,
            links:[
                {
                    rel:"self",
                    method:"DELETE",
                    href:"http://localhost:3000/api/v1/despesas/"
                },
                {
                    method:"POST",
                    href:"http://localhost:3000/api/v1/despesas/"
                },
                {
                    method:"PUT",
                    href:"http://localhost:3000/api/v1/despesas/?id=?"
                },
                {
                    method:"GET",
                    href:"http://localhost:3000/api/v1/despesas/"
                }
            ]
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

}

export default new ExpenseView()