
import ExpenseController from "../controller/expenseControler.js"

class ExpenseView {

    //  getExpense(req,res){
    //     try {
    //         const expense =  ExpenseController.getAll();
    //         console.log("Chegou aqui 1")
    //         return res.status(200).json(expense);
    //     } catch (error) {
    //         console.log("Chegou aqui 2")
    //         return res.status(500).json({messagem: 'Erro ao buscar despesas' + error.message})
    //     }
    // }


    async getExpense(req, res) {
        const { id, amount, category, date, description, summary } = req.query
    
        try {
            if (id) {
                const result = await ExpenseController.getById(Number(id))
                return res.status(200).json({
                    message: "Despesas por ID",
                    data: result,
                    links: [
                        {
                            rel: "self",
                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?id=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?category=?"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?summary=true"
                        },
                        {

                            method: "GET",
                            href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
                        }
                    ]
                })
            }
            const result = await ExpenseController.getAll()
            return await res.status(200).json({
                message: "Todas as Despesas",
                data: result,
                links: [
                    {
                        rel: "self",
                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesass/"
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?id=?"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?category=?"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?date=YYYY-MM-DD"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?summary=true"
                    },
                    {

                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/?category=?&summary=true"
                    }
                ]

            })


        } catch (error) {
            if (id) {
                return res.status(404).json({ error: error.message });
            }

            return res.status(400).json({ error: error.message })
        }
    }

    async createExpense(req, res) {
        try {
            const { title, amount, date, description, status, user, category } = req.body
            console.log(req.body)
            const newExpens = await ExpenseController.create(title, amount, date, description, status, user, category);
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
        catch (error) {
            return res.status(400).json({ error: error.message + " chegou aqui" })
        }
    }

    async updateExpense(req, res) {
        try {
            const id = Number(req.params.id)
            console.log(id)
            const { title, amount, date, description, user, category } = req.body
            console.log(req.body)
            const expenseUpdate = await ExpenseController.update(id, title, amount, category, date, description)
            res.status(201).json({
                message: "Despasa Atualizada",
                data: expenseUpdate,
                links: [
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
            })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    deleteExpense(req, res) {
        try {
            const expenseDelete = ExpenseController.delete(Number(req.params.id))
            res.status(204).json({
                message: "Despasa Deletada",
                data: expenseDelete,
                links: [
                    {
                        rel: "self",
                        method: "DELETE",
                        href: "http://localhost:3000/api/v1/despesas/"
                    },
                    {
                        method: "POST",
                        href: "http://localhost:3000/api/v1/despesas/"
                    },
                    {
                        method: "PUT",
                        href: "http://localhost:3000/api/v1/despesas/?id=?"
                    },
                    {
                        method: "GET",
                        href: "http://localhost:3000/api/v1/despesas/"
                    }
                ]
            })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

}

export default new ExpenseView()